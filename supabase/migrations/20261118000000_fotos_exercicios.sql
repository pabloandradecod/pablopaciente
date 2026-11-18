-- =====================================================================
-- Fotos dos exercícios do Dr. Pablo.
-- - exercicios.fotos: lista de fotos (início e fim do movimento, ou foto com anotações).
--   Caminhos "fotos-exercicios/..." ficam no próprio site; os demais, no bucket "exercicios".
-- - O bucket "exercicios" passa a aceitar imagens (fotos enviadas pelo painel).
-- - paciente_dados devolve as fotos de cada exercício prescrito.
-- =====================================================================
alter table public.exercicios add column if not exists fotos text[] not null default '{}';

update storage.buckets
   set allowed_mime_types = array['video/mp4', 'video/webm', 'video/quicktime', 'video/3gpp', 'video/x-m4v', 'image/jpeg', 'image/png', 'image/webp']
 where id = 'exercicios';

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
    )
  ) into v_res
  from public.pacientes p where p.id = v_id;

  return v_res;
end;
$$;
