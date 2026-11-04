-- =====================================================================
-- Seed de demonstração: 2 pacientes FICTÍCIOS e 5 exercícios (sem vídeo).
-- Rode depois da migração. Antes de usar com pacientes reais, apague os
-- fictícios no painel (ou rode o bloco "LIMPEZA" no fim deste arquivo).
--
-- Links de teste (local):
--   Maria: http://localhost:5173/p#demo-maria-7f3c9a1e5b2d4f6a8c0e1b3d5f7a9c2e   nascimento 12/04/1978
--   João:  http://localhost:5173/p#demo-joao-4b8d2f6a0c4e8a2c6e0a4c8e2a6c0e4a8   nascimento 25/09/1990
-- =====================================================================

-- Exercícios -----------------------------------------------------------
insert into public.exercicios (id, nome, instrucoes, series_padrao, reps_padrao, video_path) values
  ('a0000000-0000-4000-8000-000000000001', 'Ponte de glúteo',
   'Deite de barriga para cima, joelhos dobrados e pés apoiados. Contraia o abdômen e suba o quadril até alinhar com joelhos e ombros. Segure 2 segundos e desça devagar.',
   3, '12', 'galeria/membros-inferiores/ponte-de-gluteo.mp4'),
  ('a0000000-0000-4000-8000-000000000002', 'Gato e camelo',
   'Em quatro apoios, mãos abaixo dos ombros e joelhos abaixo do quadril. Arredonde as costas olhando para o umbigo e depois afunde levemente a coluna olhando para frente. Movimento lento, sem forçar.',
   2, '10', null),
  ('a0000000-0000-4000-8000-000000000003', 'Perdigueiro',
   'Em quatro apoios, estenda o braço direito e a perna esquerda ao mesmo tempo, mantendo o quadril parado. Segure 3 segundos, volte e troque o lado.',
   3, '8 de cada lado', null),
  ('a0000000-0000-4000-8000-000000000004', 'Prancha frontal nos joelhos',
   'Apoie antebraços e joelhos no chão. Alinhe cabeça, tronco e quadril. Contraia o abdômen e respire normalmente durante todo o tempo.',
   3, '20 s', 'galeria/abdomen-core/prancha.mp4'),
  ('a0000000-0000-4000-8000-000000000005', 'Alongamento do piriforme',
   'Deitado de barriga para cima, cruze o tornozelo sobre o joelho oposto e puxe a coxa de baixo em direção ao peito até sentir alongar o glúteo. Mantenha sem dor.',
   2, '30 s de cada lado', null)
on conflict (id) do nothing;

-- Pacientes -----------------------------------------------------------
insert into public.pacientes
  (id, nome, data_nascimento, whatsapp, primeira_consulta, consentimento_aceito, consentimento_em, consentimento_versao)
values
  ('b0000000-0000-4000-8000-000000000001', 'Maria Aparecida Souza', '1978-04-12', '35999990001', '2026-09-08', true, '2026-09-08 09:10-03', '2026-11-03-rascunho'),
  ('b0000000-0000-4000-8000-000000000002', 'João Carlos Ribeiro',   '1990-09-25', '35999990002', '2026-10-20', true, '2026-10-20 17:30-03', '2026-11-03-rascunho')
on conflict (id) do nothing;

-- Avaliações ----------------------------------------------------------
insert into public.avaliacoes (paciente_id, data, respostas) values
  ('b0000000-0000-4000-8000-000000000001', '2026-09-08', jsonb_build_object(
     'queixa_principal', '["Dor lombar"]'::jsonb,
     'lado_dor', 'Centro',
     'tempo_queixa', 'Mais de 6 meses',
     'como_comecou', 'Aos poucos',
     'episodios', 'Acontece com frequência',
     'dor_inicial', 7,
     'impacto', 'Moderado',
     'o_que_piora', '["Ficar sentado", "Fim do dia", "Lavar louça"]'::jsonb,
     'o_que_melhora', '["Caminhar", "Deitar de lado"]'::jsonb,
     'atividade', 'Sedentário',
     'irradiacao', jsonb_build_object('resposta', 'nao', 'detalhe', '', 'opcoes', '[]'::jsonb),
     'observacoes', 'Trabalha como costureira, 8 h sentada.')),
  ('b0000000-0000-4000-8000-000000000002', '2026-10-20', jsonb_build_object(
     'queixa_principal', '["Lombar travada", "Dor que desce para a perna"]'::jsonb,
     'lado_dor', 'Esquerdo',
     'tempo_queixa', 'Menos de 1 semana',
     'como_comecou', 'Depois de pegar peso',
     'episodios', 'Primeira vez',
     'dor_inicial', 8,
     'impacto', 'Muito',
     'o_que_piora', '["Abaixar ou pegar peso", "Levantar da cama", "Tossir ou espirrar"]'::jsonb,
     'o_que_melhora', '["Deitar de lado"]'::jsonb,
     'atividade', '1 a 2 vezes por semana',
     'irradiacao', jsonb_build_object('resposta', 'sim', 'detalhe', '', 'opcoes', '["Coxa (atrás)", "Lado esquerdo"]'::jsonb),
     'observacoes', 'Sem sinais de alerta na triagem.'));

-- Sessões -------------------------------------------------------------
insert into public.sessoes (paciente_id, data, dor_antes, dor_depois, segmentos) values
  ('b0000000-0000-4000-8000-000000000001', '2026-09-08', 7, 5, array['L4','L5','SACRO']),
  ('b0000000-0000-4000-8000-000000000001', '2026-09-15', 6, 4, array['L4','L5','ILIACO_D']),
  ('b0000000-0000-4000-8000-000000000001', '2026-09-29', 5, 3, array['T12','L1','L5','ILIACO_D']),
  ('b0000000-0000-4000-8000-000000000001', '2026-10-13', 4, 2, array['L4','L5']),
  ('b0000000-0000-4000-8000-000000000001', '2026-10-27', 3, 2, array['L5','SACRO']),
  ('b0000000-0000-4000-8000-000000000002', '2026-10-20', 8, 6, array['L3','L4','L5','ILIACO_E']),
  ('b0000000-0000-4000-8000-000000000002', '2026-10-24', 6, 4, array['L4','L5','ILIACO_E']),
  ('b0000000-0000-4000-8000-000000000002', '2026-10-31', 4, 3, array['T11','T12','L5']);

-- Exercícios prescritos ----------------------------------------------
insert into public.paciente_exercicios (paciente_id, exercicio_id, series, reps, ordem) values
  ('b0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000001', 3, '12', 1),
  ('b0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000003', 3, '8 de cada lado', 2),
  ('b0000000-0000-4000-8000-000000000001', 'a0000000-0000-4000-8000-000000000004', 3, '20 s', 3),
  ('b0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000002', 2, '10', 1),
  ('b0000000-0000-4000-8000-000000000002', 'a0000000-0000-4000-8000-000000000005', 2, '30 s de cada lado', 2)
on conflict do nothing;

-- Tokens de teste (o banco guarda só o hash) --------------------------
insert into public.paciente_tokens (paciente_id, token_hash) values
  ('b0000000-0000-4000-8000-000000000001', public.hash_token('demo-maria-7f3c9a1e5b2d4f6a8c0e1b3d5f7a9c2e')),
  ('b0000000-0000-4000-8000-000000000002', public.hash_token('demo-joao-4b8d2f6a0c4e8a2c6e0a4c8e2a6c0e4a8'))
on conflict do nothing;

-- Um pedido na Fila SOS para visualizar a tela --------------------------
insert into public.sos_pedidos (paciente_id, triagem, status, criado_em) values
  ('b0000000-0000-4000-8000-000000000002',
   '{"dormencia_virilha": false, "perda_forca": false, "alteracao_urina_fezes": false}', 'novo', now() - interval '3 hours');

-- =====================================================================
-- LIMPEZA (rode só quando quiser apagar os dados fictícios)
-- delete from public.pacientes where id in ('b0000000-0000-4000-8000-000000000001', 'b0000000-0000-4000-8000-000000000002');
-- =====================================================================
