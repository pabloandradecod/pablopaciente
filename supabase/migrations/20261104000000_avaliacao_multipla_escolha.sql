-- =====================================================================
-- Avaliação com mais múltipla escolha.
-- Novo tipo "multipla" (várias opções + "Outro") e opções no detalhe
-- de "sim_nao_texto" (ex.: para onde a dor irradia).
-- =====================================================================

alter table public.avaliacao_campos drop constraint if exists avaliacao_campos_tipo_check;
alter table public.avaliacao_campos add constraint avaliacao_campos_tipo_check
  check (tipo in ('texto', 'texto_longo', 'escala', 'sim_nao', 'sim_nao_texto', 'lista', 'multipla'));

-- Campos existentes passam a ser de escolha
update public.avaliacao_campos set tipo = 'multipla', opcoes =
  '["Dor lombar", "Lombar travada", "Dor que desce para a perna", "Dor no meio das costas", "Dor no pescoço", "Dor no quadril ou glúteo", "Tensão nos ombros"]'
  where chave = 'queixa_principal';

update public.avaliacao_campos set tipo = 'multipla', opcoes =
  '["Ficar sentado", "Ficar em pé", "Abaixar ou pegar peso", "Caminhar", "Levantar da cama", "Tossir ou espirrar", "Ao acordar", "Fim do dia", "Dirigir"]'
  where chave = 'o_que_piora';

update public.avaliacao_campos set tipo = 'multipla', opcoes =
  '["Repouso", "Caminhar", "Deitar de lado", "Calor local", "Alongar", "Mudar de posição", "Medicação"]'
  where chave = 'o_que_melhora';

update public.avaliacao_campos set opcoes =
  '["Glúteo", "Coxa (atrás)", "Coxa (frente)", "Até o joelho", "Abaixo do joelho", "Até o pé", "Lado esquerdo", "Lado direito"]',
  detalhe_rotulo = 'Para onde?'
  where chave = 'irradiacao';

-- Campos novos
insert into public.avaliacao_campos
  (chave, rotulo, rotulo_paciente, tipo, opcoes, detalhe_rotulo, ordem, visivel_paciente)
values
  ('lado_dor', 'Lado da dor', 'Onde você sente mais', 'lista',
     '["Centro", "Esquerdo", "Direito", "Os dois lados"]', null, 15, true),
  ('como_comecou', 'Como começou', 'Como começou', 'lista',
     '["De repente, travou", "Aos poucos", "Depois de pegar peso", "Depois de queda ou pancada", "Não sei dizer"]', null, 25, true),
  ('episodios', 'Episódios anteriores', 'Já aconteceu antes?', 'lista',
     '["Primeira vez", "Já aconteceu 1 ou 2 vezes", "Acontece com frequência"]', null, 27, true),
  ('impacto', 'Impacto na rotina', 'Quanto atrapalha sua rotina', 'lista',
     '["Pouco", "Moderado", "Muito", "Precisei me afastar"]', null, 35, true),
  ('atividade', 'Atividade física', 'Atividade física', 'lista',
     '["Sedentário", "1 a 2 vezes por semana", "3 ou mais vezes por semana"]', null, 55, true)
on conflict (chave) do nothing;
