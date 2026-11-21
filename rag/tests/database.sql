-- Run against a disposable database after applying the RAG migration.
begin;
set local role service_role;
do $$
declare
  first_vector jsonb := to_jsonb(array[1] || array_fill(0, array[1535]));
  second_vector jsonb := to_jsonb(array[0, 1] || array_fill(0, array[1534]));
  first_chunk jsonb;
  second_chunk jsonb;
  test_user uuid := '00000000-0000-4000-8000-000000000001';
begin
  if public.rag_reserve_question(test_user) <> 'empty' then
    raise exception 'Empty corpus should short circuit';
  end if;
  first_chunk := jsonb_build_object(
    'part', 0, 'filename', 'fixture.md', 'page', 2, 'topic', 'ohm',
    'heading', 'Ohm törvénye', 'version', 'test', 'source_hash', repeat('a', 64),
    'content', 'I = U/R', 'embedding', first_vector
  );
  second_chunk := first_chunk || jsonb_build_object('part', 1, 'page', 5, 'embedding', second_vector);
  perform public.rag_replace_document('fixture', jsonb_build_array(first_chunk, second_chunk));
  perform public.rag_replace_document('fixture', jsonb_build_array(first_chunk, second_chunk));
  if (select count(*) from public.rag_chunks) <> 2 then raise exception 'Duplicate chunks'; end if;
  if (select array_agg(page) from public.rag_match(first_vector::text::extensions.vector))
      is distinct from array[2] then raise exception 'Unexpected search ranking or threshold'; end if;
  perform public.rag_replace_document('fixture', jsonb_build_array(first_chunk || '{"page":3}'));
  if (select array_agg(page) from public.rag_chunks) is distinct from array[3] then
    raise exception 'Stale page or chunk';
  end if;
  for attempt in 1..20 loop
    if public.rag_reserve_question(test_user) <> 'ok' then raise exception 'Quota granted too few requests'; end if;
  end loop;
  if public.rag_reserve_question(test_user) <> 'limited' then raise exception 'Quota not enforced'; end if;
  perform public.rag_replace_document('fixture', '[]');
  if exists (select from public.rag_chunks) then raise exception 'Delete left chunks'; end if;
end;
$$;
reset role;

do $$
declare
  audience text;
begin
  foreach audience in array array['anon', 'authenticated'] loop
    if has_table_privilege(audience, 'public.rag_chunks', 'SELECT')
      or has_function_privilege(audience, 'public.rag_match(extensions.vector)', 'EXECUTE')
      or has_function_privilege(audience, 'public.rag_replace_document(text,jsonb)', 'EXECUTE')
      or has_function_privilege(audience, 'public.rag_reserve_question(uuid)', 'EXECUTE') then
      raise exception 'Unexpected RAG privileges for %', audience;
    end if;
  end loop;
end;
$$;
rollback;
