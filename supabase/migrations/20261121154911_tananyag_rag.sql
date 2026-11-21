begin;

create schema if not exists extensions;
create extension if not exists vector with schema extensions;
grant usage on schema extensions to service_role;

create table public.rag_chunks (
  document_id text not null check (document_id ~ '^[a-z0-9][a-z0-9_-]{0,79}$'),
  part integer not null check (part >= 0),
  filename text not null,
  page integer not null check (page > 0),
  topic text not null,
  heading text not null,
  version text not null,
  source_hash text not null check (source_hash ~ '^[0-9a-f]{64}$'),
  content text not null check (length(content) > 0),
  embedding extensions.vector(1536) not null,
  primary key (document_id, part)
);

create index rag_chunks_embedding_idx on public.rag_chunks
  using hnsw (embedding extensions.vector_cosine_ops);

create table public.rag_usage (
  day date not null,
  actor text not null,
  used integer not null,
  primary key (day, actor)
);

alter table public.rag_chunks enable row level security;
alter table public.rag_usage enable row level security;
revoke all on public.rag_chunks, public.rag_usage from public, anon, authenticated;
grant select, insert, update, delete on public.rag_chunks, public.rag_usage to service_role;

create function public.rag_replace_document(p_document text, p_chunks jsonb)
returns void
language plpgsql security invoker set search_path = ''
as $$
begin
  if p_document is null or p_document !~ '^[a-z0-9][a-z0-9_-]{0,79}$'
    or jsonb_typeof(p_chunks) is distinct from 'array' then
    raise exception 'Invalid document or chunks';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('rag-document:' || p_document, 0));

  insert into public.rag_chunks as existing
    (document_id, part, filename, page, topic, heading, version, source_hash, content, embedding)
  select p_document, part, filename, page, topic, heading, version, source_hash,
    content, embedding::text::extensions.vector(1536)
  from jsonb_to_recordset(p_chunks) as chunk(
    part integer, filename text, page integer, topic text, heading text,
    version text, source_hash text, content text, embedding jsonb
  )
  on conflict (document_id, part) do update set
    filename = excluded.filename, page = excluded.page, topic = excluded.topic,
    heading = excluded.heading, version = excluded.version, source_hash = excluded.source_hash,
    content = excluded.content, embedding = excluded.embedding
  where existing is distinct from excluded;

  delete from public.rag_chunks as chunk where chunk.document_id = p_document
    and not exists (select 1 from jsonb_to_recordset(p_chunks) as incoming(part integer)
                    where incoming.part = chunk.part);
end;
$$;

create function public.rag_match(p_query extensions.vector)
returns table (
  document_id text, filename text, page integer, topic text, heading text,
  version text, source_hash text, content text
)
language sql stable security invoker set search_path = ''
as $$
  select c.document_id, c.filename, c.page, c.topic, c.heading, c.version, c.source_hash, c.content
  from public.rag_chunks c
  where (c.embedding operator(extensions.<=>) p_query) <= 0.55
  order by c.embedding operator(extensions.<=>) p_query
  limit 5;
$$;

create function public.rag_reserve_question(p_user uuid)
returns text
language plpgsql security invoker set search_path = ''
as $$
declare
  today date := (statement_timestamp() at time zone 'UTC')::date;
begin
  if not exists (select 1 from public.rag_chunks) then return 'empty'; end if;
  perform pg_advisory_xact_lock(hashtextextended('rag-daily-quota', 0));
  if exists (select 1 from public.rag_usage where day = today
             and ((actor = 'global' and used >= 300) or (actor = p_user::text and used >= 20))) then
    return 'limited';
  end if;
  delete from public.rag_usage where day < today;
  insert into public.rag_usage as quota (day, actor, used)
  values (today, 'global', 1), (today, p_user::text, 1)
  on conflict (day, actor) do update set used = quota.used + 1;
  return 'ok';
end;
$$;

revoke all on function public.rag_replace_document(text, jsonb),
  public.rag_match(extensions.vector), public.rag_reserve_question(uuid)
  from public, anon, authenticated;
grant execute on function public.rag_replace_document(text, jsonb),
  public.rag_match(extensions.vector), public.rag_reserve_question(uuid) to service_role;

commit;
