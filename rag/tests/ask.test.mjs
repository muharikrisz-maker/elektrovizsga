import test from "node:test";
import assert from "node:assert/strict";
import { createHandler } from "../../supabase/functions/rag/ask.mjs";

const samples = [
  ["Hogyan számolom az áramerősséget Ohm törvényével?", "ohm", "Az áramerősség kiszámítható a feszültség és az ellenállás hányadosaként: I = U/R."],
  ["Mitől függ a vezeték feszültségesése?", "wires", "Ohmos vezeték esetén a feszültségesés az áram és a vezeték ellenállásának szorzata."],
  ["Mit jelent a rövidzárlat?", "short", "Rövidzárlatnál kis impedanciájú kapcsolat alakul ki eltérő potenciálú pontok között."],
  ["Mennyi az egyenáramú teljesítmény?", "energy", "Egyenáramú körben a villamos teljesítmény P = U·I."],
  ["Milyen képlet kapcsolja össze a kondenzátor töltését és feszültségét?", "capacitors", "A kondenzátor töltése Q = C·U, ahol C a kapacitás."],
  ["Mi a meddőkompenzáció célja?", "3power", "Induktív terhelésnél a kapacitív meddő teljesítmény csökkentheti a hálózatból felvett meddő teljesítményt."],
  ["Hogyan hat a hőmérséklet a vezeték ellenállására?", "temperature", "A fémvezető ellenállása a vizsgált hőmérséklettartományban közelítőleg R = R₀[1 + α(T − T₀)]."],
];

test("A végpont csak visszaellenőrzött idézetet és adatbázisból származó oldalt ad", async t => {
  const origin = "https://example.test";
  const handler = createHandler({ url: "https://supabase.test", anon: "anon", service: "service", key: "ai", origins: [origin] });
  let mode = "valid";
  let question = "";
  let page = 0;
  let topic = "";
  let quote = "";
  let calls = [];
  t.mock.method(globalThis, "fetch", async (url, request) => {
    const route = new URL(url).pathname;
    calls.push(route);
    if (route === "/auth/v1/user") {
      return request.headers.Authorization === "Bearer expired"
        ? new Response(null, { status: 401 }) : Response.json({ id: "user" });
    }
    if (route.endsWith("rag_reserve_question")) return Response.json(mode === "quota" ? "limited" : "ok");
    if (route.endsWith("embeddings")) {
      assert.equal(JSON.parse(request.body).input, question);
      return Response.json({ data: [{ embedding: [1] }] });
    }
    if (route.endsWith("rag_match")) {
      return Response.json(mode === "no_match" ? [] : [{
        document_id: "fixture", filename: "teszt.md", page, topic, version: "teszt",
        source_hash: "a".repeat(64), content: quote,
      }]);
    }
    if (route.endsWith("completions")) {
      const steps = mode === "invented_reference" ? [{ source: 99, quote }]
        : mode === "invented_text" ? [{ source: 1, quote: "Ilyen állítás nincs a forrásban." }]
        : mode === "uncertain" ? []
        : [{ source: 1, quote, page: 99, filename: "kitalalt.pdf" }];
      return Response.json({ choices: [{ finish_reason: "stop", message: { content: JSON.stringify({ steps }) } }] });
    }
    assert.fail(route);
  });
  const post = (token = "Bearer test", site = origin, body = JSON.stringify({ question })) =>
    handler(new Request("https://example.test/functions/v1/rag/ask", {
      method: "POST", headers: { Origin: site, Authorization: token }, body,
    }));

  assert.equal((await post("")).status, 401);
  assert.equal((await post("Bearer expired")).status, 401);
  assert.equal((await post("Bearer test", "https://other.test")).status, 403);
  assert.equal((await post("Bearer test", origin, "null")).status, 400);
  assert.equal((await post("Bearer test", origin, "x".repeat(9000))).status, 413);
  for ([question, topic, quote] of samples) {
    page++;
    const response = await post();
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), origin);
    const result = await response.json();
    assert.equal(result.status, "answered", question);
    assert.equal(result.steps[0].text, quote);
    assert.equal(result.steps[0].source.page, page);
    assert.equal(result.steps[0].source.filename, "teszt.md");
    assert.deepEqual(result.topics, [topic]);
  }
  for (mode of ["no_match", "uncertain", "invented_reference", "invented_text"]) {
    calls = [];
    const result = await (await post()).json();
    assert.equal(result.status, "no_source", mode);
    assert.equal(result.steps, undefined);
    if (mode === "no_match") assert.ok(!calls.includes("/v1/chat/completions"));
  }
  mode = "quota";
  calls = [];
  assert.equal((await post()).status, 429);
  assert.equal(calls.length, 2);
});
