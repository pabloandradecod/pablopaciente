-- =====================================================================
-- Separação: Exercícios do Dr. Pablo (biblioteca própria) x Academia (animações da galeria).
-- A biblioteca (tabela exercicios) guarda só os exercícios do Dr. Pablo: sem vídeo ou com
-- vídeo gravado por ele. As animações da galeria ficam só no treino de academia (A/B/C).
-- =====================================================================

-- Exercícios que tinham entrado com animação da galeria viram exercícios do Dr. Pablo sem vídeo
-- (as prescrições dos pacientes continuam; o vídeo próprio é gravado depois).
update public.exercicios set video_path = null where video_path like 'galeria/%';
update public.exercicios set nome = 'Agachamento' where nome = 'Agachamento 3';

-- Trava no banco: a biblioteca não aceita animação da galeria.
alter table public.exercicios drop constraint if exists exercicios_sem_galeria;
alter table public.exercicios add constraint exercicios_sem_galeria
  check (video_path is null or video_path not like 'galeria/%');
