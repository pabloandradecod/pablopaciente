-- Rotina para dias de crise (guia "dias de crise" do Dr. Pablo). Aplicado no banco de produção.
update public.exercicios set crise_ordem = 1 where nome = 'Descanso com pernas apoiadas na cadeira';
update public.exercicios set crise_ordem = 2 where nome = 'Descanso deitado de lado (dias de crise)';
update public.exercicios set crise_ordem = 3 where nome = 'Báscula pélvica curta (dias de crise)';
update public.exercicios set crise_ordem = 4 where nome = 'Joelho ao peito parcial (dias de crise)';
update public.exercicios set crise_ordem = 5 where nome = 'Caminhada curta (dias de crise)';
