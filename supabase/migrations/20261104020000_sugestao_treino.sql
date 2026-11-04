-- =====================================================================
-- Sugestão de treino A/B/C (só exercícios da galeria de animações).
-- Uma linha por paciente; os treinos ficam em JSON:
-- [{"letra":"A","foco":"...","itens":[{"id":"gal:...","nome":"...","video":"galeria/...mp4","series":3,"reps":"12","observacao":"..."}]}]
-- =====================================================================
create table public.paciente_treinos (
  paciente_id uuid primary key references public.pacientes (id) on delete cascade,
  treinos jsonb not null default '[]'::jsonb,
  observacao text,
  atualizado_em timestamptz not null default now()
);
create trigger paciente_treinos_atualizado before update on public.paciente_treinos
  for each row execute function public.tocar_atualizado_em();

alter table public.paciente_treinos enable row level security;
alter table public.paciente_treinos force row level security;
revoke all on public.paciente_treinos from anon;
create policy paciente_treinos_admin on public.paciente_treinos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- O link do paciente passa a receber o treino.
create or replace function public.paciente_dados(p_token text, p_chave text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_avaliacao public.avaliacoes%rowtype;
  v_res jsonb;
begin
  v_id := public._paciente_por_acesso(p_token, p_chave);
  if v_id is null then
    return jsonb_build_object('ok', false, 'erro', 'acesso_invalido');
  end if;

  select * into v_avaliacao from public.avaliacoes
   where paciente_id = v_id order by data desc, criado_em desc limit 1;

  select jsonb_build_object(
    'ok', true,
    'paciente', jsonb_build_object(
      'nome', p.nome,
      'primeiro_nome', split_part(trim(p.nome), ' ', 1)
    ),
    'avaliacao', case when v_avaliacao.id is null then null else jsonb_build_object(
      'data', v_avaliacao.data,
      'itens', coalesce((
        select jsonb_agg(jsonb_build_object(
                 'chave', c.chave,
                 'rotulo', coalesce(c.rotulo_paciente, c.rotulo),
                 'tipo', c.tipo,
                 'detalhe_rotulo', c.detalhe_rotulo,
                 'valor', v_avaliacao.respostas -> c.chave
               ) order by c.ordem)
          from public.avaliacao_campos c
         where c.ativo and c.visivel_paciente
           and v_avaliacao.respostas ? c.chave
      ), '[]'::jsonb)
    ) end,
    'sessoes', coalesce((
      select jsonb_agg(jsonb_build_object(
               'data', s.data,
               'dor_antes', s.dor_antes,
               'dor_depois', s.dor_depois,
               'segmentos', s.segmentos
             ) order by s.data, s.criado_em)
        from public.sessoes s where s.paciente_id = v_id
    ), '[]'::jsonb),
    'exercicios', coalesce((
      select jsonb_agg(jsonb_build_object(
               'nome', e.nome,
               'video_path', e.video_path,
               'instrucoes', e.instrucoes,
               'series', pe.series,
               'reps', pe.reps,
               'observacao', pe.observacao
             ) order by pe.ordem, e.nome)
        from public.paciente_exercicios pe
        join public.exercicios e on e.id = pe.exercicio_id
       where pe.paciente_id = v_id
    ), '[]'::jsonb),
    'treino', (
      select jsonb_build_object('treinos', t.treinos, 'observacao', t.observacao)
        from public.paciente_treinos t
       where t.paciente_id = v_id and jsonb_array_length(t.treinos) > 0
    )
  ) into v_res
  from public.pacientes p where p.id = v_id;

  return v_res;
end;
$$;
