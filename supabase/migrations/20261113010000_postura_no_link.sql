-- =====================================================================
-- Análise postural no link do paciente.
-- - relatorios_ia.visivel_paciente: o Dr. Pablo escolhe se a análise aparece no link.
-- - paciente_dados passa a devolver a análise (sem os caminhos das fotos).
-- - paciente_fotos: devolve os caminhos das fotos só para quem tem token + chave válidos.
--   É chamada apenas pela Edge Function "paciente-fotos" (service_role), que gera links temporários.
-- =====================================================================
alter table public.relatorios_ia add column if not exists visivel_paciente boolean not null default false;

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
    )
  ) into v_res
  from public.pacientes p where p.id = v_id;

  return v_res;
end;
$$;

create or replace function public.paciente_fotos(p_token text, p_chave text)
returns text[]
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_caminhos text[];
begin
  v_id := public._paciente_por_acesso(p_token, p_chave);
  if v_id is null then
    return null;
  end if;
  select array(select f ->> 'caminho' from jsonb_array_elements(r.fotos) f) into v_caminhos
    from public.relatorios_ia r
   where r.paciente_id = v_id and r.visivel_paciente and r.resposta ? 'postura'
   order by r.criado_em desc limit 1;
  return coalesce(v_caminhos, array[]::text[]);
end;
$$;
revoke all on function public.paciente_fotos(text, text) from public, anon, authenticated;
grant execute on function public.paciente_fotos(text, text) to service_role;
