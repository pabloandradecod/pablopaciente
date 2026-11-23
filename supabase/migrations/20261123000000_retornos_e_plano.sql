-- =====================================================================
-- Retornos e plano de tratamento.
-- - pacientes.plano_*: plano combinado (número de sessões, frequência, objetivo).
-- - checkins: "como está sua dor?" respondido pelo paciente no link, entre as sessões.
-- - contatos: registro de quando o Dr. Pablo chamou o paciente pela lista "Retornos".
-- - exercicios.crise_ordem: exercícios da rotina de dias de crise (ordem de exibição).
-- - paciente_checkin: o paciente registra o check-in (no máximo 1 por dia; o segundo substitui).
-- - paciente_dados devolve plano, check-ins, se há check-in pendente e a rotina de crise.
-- =====================================================================
alter table public.pacientes
  add column if not exists plano_sessoes smallint check (plano_sessoes between 1 and 60),
  add column if not exists plano_frequencia text,
  add column if not exists plano_objetivo text;

alter table public.exercicios add column if not exists crise_ordem smallint;

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  dor smallint not null check (dor between 0 and 10),
  exercicios text not null check (exercicios in ('todos', 'alguns', 'nenhum')),
  criado_em timestamptz not null default now()
);
create index if not exists checkins_paciente_idx on public.checkins (paciente_id, criado_em desc);
alter table public.checkins enable row level security;
alter table public.checkins force row level security;
revoke all on public.checkins from anon;
create policy checkins_admin on public.checkins
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.contatos (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  motivo text not null,
  criado_em timestamptz not null default now()
);
create index if not exists contatos_paciente_idx on public.contatos (paciente_id, criado_em desc);
alter table public.contatos enable row level security;
alter table public.contatos force row level security;
revoke all on public.contatos from anon;
create policy contatos_admin on public.contatos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.paciente_checkin(p_token text, p_chave text, p_dor int, p_exercicios text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_hoje uuid;
begin
  v_id := public._paciente_por_acesso(p_token, p_chave);
  if v_id is null then
    return jsonb_build_object('ok', false, 'erro', 'acesso_invalido');
  end if;
  if p_dor is null or p_dor < 0 or p_dor > 10 or p_exercicios not in ('todos', 'alguns', 'nenhum') then
    return jsonb_build_object('ok', false, 'erro', 'resposta_invalida');
  end if;
  select id into v_hoje from public.checkins
   where paciente_id = v_id and criado_em > now() - interval '20 hours'
   order by criado_em desc limit 1;
  if v_hoje is not null then
    update public.checkins set dor = p_dor, exercicios = p_exercicios, criado_em = now() where id = v_hoje;
  else
    insert into public.checkins (paciente_id, dor, exercicios) values (v_id, p_dor, p_exercicios);
  end if;
  return jsonb_build_object('ok', true);
end;
$$;
grant execute on function public.paciente_checkin(text, text, int, text) to anon, authenticated;

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
  v_ultima date;
begin
  v_id := public._paciente_por_acesso(p_token, p_chave);
  if v_id is null then
    return jsonb_build_object('ok', false, 'erro', 'acesso_invalido');
  end if;

  select max(data) into v_ultima from public.sessoes where paciente_id = v_id;

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
               'fotos', e.fotos,
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
    ),
    -- Análise postural mais recente liberada para o paciente (as fotos vêm pela função paciente-fotos).
    'postura', (
      select jsonb_build_object(
               'data', r.criado_em,
               'postura', r.resposta -> 'postura',
               'marcacoes', coalesce(r.resposta -> 'marcacoes', '[]'::jsonb),
               'vistas', coalesce((select jsonb_agg(f -> 'vista') from jsonb_array_elements(r.fotos) f), '[]'::jsonb)
             )
        from public.relatorios_ia r
       where r.paciente_id = v_id and r.visivel_paciente and r.resposta ? 'postura'
       order by r.criado_em desc limit 1
    ),
    -- Plano de tratamento combinado com o Dr. Pablo.
    'plano', case when p.plano_sessoes is null then null else jsonb_build_object(
      'sessoes', p.plano_sessoes, 'frequencia', p.plano_frequencia, 'objetivo', p.plano_objetivo
    ) end,
    -- Check-ins de dor feitos pelo link (os mais recentes).
    'checkins', coalesce((
      select jsonb_agg(jsonb_build_object('data', c.criado_em, 'dor', c.dor, 'exercicios', c.exercicios) order by c.criado_em)
        from (select * from public.checkins where paciente_id = v_id order by criado_em desc limit 8) c
    ), '[]'::jsonb),
    -- Pergunta "como está sua dor?" a partir de 5 dias depois da última sessão, no máximo 1 vez por semana.
    'checkin_pendente', (
      v_ultima is not null and current_date - v_ultima >= 5
      and not exists (select 1 from public.checkins c where c.paciente_id = v_id and c.criado_em > now() - interval '6 days')
    ),
    -- Rotina para dias de crise (aparece quando o paciente pede retorno e passa na triagem).
    'crise', coalesce((
      select jsonb_agg(jsonb_build_object('nome', e.nome, 'instrucoes', e.instrucoes, 'fotos', e.fotos, 'video_path', e.video_path,
                                          'series', e.series_padrao, 'reps', e.reps_padrao) order by e.crise_ordem, e.nome)
        from public.exercicios e where e.ativo and e.crise_ordem is not null
    ), '[]'::jsonb)
  ) into v_res
  from public.pacientes p where p.id = v_id;

  return v_res;
end;
$$;
