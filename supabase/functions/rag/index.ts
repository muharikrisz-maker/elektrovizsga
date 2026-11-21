import { createHandler } from "./ask.mjs";

Deno.serve(createHandler({
  url: Deno.env.get("SUPABASE_URL")?.replace(/\/$/, ""),
  anon: Deno.env.get("SUPABASE_ANON_KEY"),
  service: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  key: Deno.env.get("RAG_OPENAI_API_KEY"),
  origins: (Deno.env.get("RAG_ALLOWED_ORIGINS") ?? "https://muharikrisz-maker.github.io")
    .split(",").map(origin => origin.trim()),
}));
