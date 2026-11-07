import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

// Keys live only in Supabase Edge Function secrets, NEVER in GitHub Pages.
const allowedOrigin = "https://muharikrisz-maker.github.io";
function cors(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}
function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(req), "Content-Type": "application/json; charset=utf-8" },
  });
}
const INSTRUCTIONS = `Te vagy az ElektroVizsga személyre szabott, magyarul tanító erősáramú elektrotechnika-tanára.
Cél: fogalmi megértés, nem tesztválaszok bemagolása. A tanuló előzetes eredményeihez igazítsd a szintet.
Az első pilot témája Ohm törvénye, ellenállásos hálózatok és alapvető teljesítményszámítás.
Kezdj rövid helyzetfelméréssel, ha nincs adat; konkrét példákat, képletlevezetést és hétköznapi alkalmazást mutass.
Egyszerre csak egy érdemi ellenőrző kérdést tegyél fel. Elsősorban nyitott választ, indoklást és saját számítást kérj; ne adj A–B–C–D opciókat.
Ha hibázik, előbb rövid, nem árulkodó rávezető kérdést adj, csak utána mutasd meg a lépéseket.
Ne ismételd meg szó szerint a korábbi példákat. A megoldott és a segítséggel megoldott feladatot különböztesd meg.
Számításoknál mindig ellenőrizd az egységeket és a képletet. Ha valamiben bizonytalan vagy, jelezd.
Veszélyes villamos munkára ne adj kockázatos, feszültség alatti szerelést ösztönző útmutatót; hangsúlyozd a szakképzett felügyeletet.
Válaszolj tömören, érthetően, legfeljebb 180 szóban, majd csak szükség esetén tegyél fel egy kérdést.
Nem vagy hivatalos vizsgáztató, és szabványkövetelményt ne találj ki.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
  if (req.method !== "POST") return json(req, { error: "Csak POST kérés engedélyezett." }, 405);
  if (req.headers.get("Origin") && req.headers.get("Origin") !== allowedOrigin) {
    return json(req, { error: "Ez a webhely nem engedélyezett." }, 403);
  }
  const jwt = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!jwt) return json(req, { error: "Jelentkezz be az ElektroVizsgába." }, 401);
  const url = Deno.env.get("SUPABASE_URL");
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anon) return json(req, { error: "A tanár szerveroldali beállítása hiányzik." }, 503);
  const sb = createClient(url, anon, {
    global: { headers: { Authorization: "Bearer " + jwt } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: identity, error: authError } = await sb.auth.getUser(jwt);
  if (authError || !identity?.user) return json(req, { error: "A bejelentkezés lejárt. Lépj be újra." }, 401);
  let body: { message?: unknown; topic?: unknown };
  try { body = await req.json(); } catch { return json(req, { error: "Hibás kérés." }, 400); }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 1500) return json(req, { error: "Írj legfeljebb 1500 karakteres kérdést." }, 400);
  const topic = "Ohm-törvény";
  const [historyResult, resultsResult] = await Promise.all([
    sb.from("teacher_messages").select("role,content,created_at").eq("user_id", identity.user.id)
      .order("created_at", { ascending: false }).limit(14),
    sb.from("generated_questions").select("is_correct,answered_at,question")
      .eq("user_id", identity.user.id).not("answered_at", "is", null)
      .order("answered_at", { ascending: false }).limit(30),
  ]);
  if (historyResult.error || resultsResult.error) return json(req, { error: "A korábbi eredményeket nem sikerült betölteni." }, 500);
  const history = (historyResult.data ?? []).reverse();
  const recent = (resultsResult.data ?? []).map((r: Record<string, unknown>) => ({
    correct: r.is_correct, skill: (r.question as Record<string, unknown> | null)?.signature?.toString().split("|")[0] ?? "",
  }));
  const answered = recent.length, correct = recent.filter((r) => r.correct === true).length;
  // Avoid rapid accidental duplicate calls.
  const latest = history.at(-1);
  if (latest?.role === "user" && latest.content === message)
    return json(req, { error: "Az előző üzenet feldolgozása még tart vagy már elküldted." }, 409);

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiKey) return json(req, { error: "Az AI-tanár még nincs aktiválva: hiányzik a szerveroldali OpenAI API-kulcs." }, 503);
  const input = [
    { role: "developer", content: INSTRUCTIONS },
    { role: "developer", content: "Korábbi nyitott számítások: " + answered + ", helyes: " + correct + ". Utolsó eredmények: " + JSON.stringify(recent.slice(0, 12)) },
    ...history.map((x) => ({ role: x.role, content: x.content })),
    { role: "user", content: message },
  ];
  let ai: Response;
  try {
    ai = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: "Bearer " + openaiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: Deno.env.get("OPENAI_MODEL") || "gpt-4.1-mini",
        input,
        max_output_tokens: 750,
        store: false,
      }),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    return json(req, { error: "Az AI-szolgáltatás jelenleg nem érhető el. Próbáld újra." }, 503);
  }
  if (!ai.ok) {
    console.error("OpenAI request failed", ai.status);
    return json(req, { error: "Az AI-szolgáltatás hibát jelzett (" + ai.status + ")." }, 502);
  }
  const output = await ai.json();
  const answer = (output.output ?? [])
    .flatMap((o: { content?: Array<{type?: string;text?: string}> }) => o.content ?? [])
    .filter((c: {type?: string}) => c.type === "output_text")
    .map((c: {text?: string}) => c.text ?? "").join("\n").trim();
  if (!answer) return json(req, { error: "Az AI-tanár most nem adott értelmezhető választ." }, 502);
  const { error: saveError } = await sb.from("teacher_messages").insert([
    { user_id: identity.user.id, role: "user", content: message, topic },
    { user_id: identity.user.id, role: "assistant", content: answer.slice(0, 12000), topic },
  ]);
  if (saveError) return json(req, { error: "A beszélgetést nem sikerült elmenteni." }, 500);
  return json(req, { answer, topic, answered, correct });
});
