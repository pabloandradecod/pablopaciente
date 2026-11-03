-- =====================================================================
-- Portal do Paciente | Dr. Pablo Andrade
-- Migração inicial: tabelas, RLS, funções do painel e do paciente.
--
-- Regras de segurança (LGPD, dados de saúde):
--  * RLS ligado em TODAS as tabelas. Só quem está em public.admins lê/escreve.
--  * O papel "anon" (paciente) não tem acesso a nenhuma tabela.
--    Ele só chama as funções paciente_* abaixo, que validam token + aparelho.
--  * O token do link é guardado apenas como hash SHA-256.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------
-- Utilitários
-- ---------------------------------------------------------------------
create or replace function public.hash_token(p text)
returns text
language sql
immutable
set search_path = ''
as $$
  select encode(extensions.digest(p, 'sha256'), 'hex')
$$;

create or replace function public.gerar_segredo()
returns text
language sql
volatile
set search_path = ''
as $$
  -- 32 bytes aleatórios em base64url (43 caracteres, sem padding)
  select rtrim(translate(encode(extensions.gen_random_bytes(32), 'base64'), '+/', '-_'), '=')
$$;

create or replace function public.tocar_atualizado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- Administradores (só o Dr. Pablo)
-- ---------------------------------------------------------------------
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  criado_em timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;

-- ---------------------------------------------------------------------
-- Configurações (textos editáveis)
-- ---------------------------------------------------------------------
create table public.configuracoes (
  chave text primary key,
  valor text not null,
  atualizado_em timestamptz not null default now()
);
create trigger configuracoes_atualizado before update on public.configuracoes
  for each row execute function public.tocar_atualizado_em();

-- ---------------------------------------------------------------------
-- Pacientes
-- ---------------------------------------------------------------------
create table public.pacientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (length(trim(nome)) > 1),
  data_nascimento date not null,
  whatsapp text not null,
  primeira_consulta date not null default current_date,
  consentimento_aceito boolean not null check (consentimento_aceito),
  consentimento_em timestamptz not null default now(),
  consentimento_versao text not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create index pacientes_nome_idx on public.pacientes (lower(nome));
create trigger pacientes_atualizado before update on public.pacientes
  for each row execute function public.tocar_atualizado_em();

-- Tokens do link pessoal. Só um ativo por paciente.
create table public.paciente_tokens (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  token_hash text not null unique,
  falhas smallint not null default 0,
  bloqueado_ate timestamptz,
  criado_em timestamptz not null default now(),
  revogado_em timestamptz
);
create unique index paciente_tokens_um_ativo
  on public.paciente_tokens (paciente_id) where revogado_em is null;

-- Aparelhos que já confirmaram a data de nascimento.
create table public.dispositivos (
  id uuid primary key default gen_random_uuid(),
  token_id uuid not null references public.paciente_tokens (id) on delete cascade,
  chave_hash text not null unique,
  criado_em timestamptz not null default now(),
  ultimo_acesso timestamptz not null default now()
);
create index dispositivos_token_idx on public.dispositivos (token_id);

-- ---------------------------------------------------------------------
-- Avaliação (campos configuráveis)
-- ---------------------------------------------------------------------
create table public.avaliacao_campos (
  id uuid primary key default gen_random_uuid(),
  chave text not null unique check (chave ~ '^[a-z0-9_]+$'),
  rotulo text not null,                 -- como aparece no painel
  rotulo_paciente text,                 -- como aparece no link (linguagem simples)
  tipo text not null check (tipo in ('texto', 'texto_longo', 'escala', 'sim_nao', 'sim_nao_texto', 'lista')),
  opcoes jsonb not null default '[]'::jsonb,   -- usado em "lista"
  detalhe_rotulo text,                  -- usado em "sim_nao_texto" (ex.: "Para onde?")
  ordem integer not null default 0,
  ativo boolean not null default true,
  visivel_paciente boolean not null default true,
  criado_em timestamptz not null default now()
);

create table public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  data date not null default current_date,
  respostas jsonb not null default '{}'::jsonb,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create index avaliacoes_paciente_idx on public.avaliacoes (paciente_id, data desc);
create trigger avaliacoes_atualizado before update on public.avaliacoes
  for each row execute function public.tocar_atualizado_em();

-- ---------------------------------------------------------------------
-- Sessões
-- ---------------------------------------------------------------------
create table public.sessoes (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  data date not null default current_date,
  dor_antes smallint check (dor_antes between 0 and 10),
  dor_depois smallint check (dor_depois between 0 and 10),
  segmentos text[] not null default '{}' check (
    segmentos <@ array[
      'C1','C2','C3','C4','C5','C6','C7',
      'T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12',
      'L1','L2','L3','L4','L5',
      'SACRO','ILIACO_E','ILIACO_D'
    ]::text[]
  ),
  notas_internas text,   -- nunca vai para o link do paciente
  criado_em timestamptz not null default now()
);
create index sessoes_paciente_idx on public.sessoes (paciente_id, data);

-- ---------------------------------------------------------------------
-- Exercícios
-- ---------------------------------------------------------------------
create table public.exercicios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  video_path text,         -- caminho no bucket "exercicios"
  instrucoes text not null default '',
  series_padrao smallint not null default 3 check (series_padrao between 1 and 20),
  reps_padrao text not null default '10',  -- texto: "10", "30 s", "5 de cada lado"
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table public.paciente_exercicios (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  exercicio_id uuid not null references public.exercicios (id) on delete restrict,
  series smallint not null check (series between 1 and 20),
  reps text not null,
  observacao text,
  ordem integer not null default 0,
  criado_em timestamptz not null default now(),
  unique (paciente_id, exercicio_id)
);

-- ---------------------------------------------------------------------
-- Fila SOS
-- ---------------------------------------------------------------------
create table public.sos_pedidos (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  triagem jsonb not null,
  status text not null default 'novo' check (status in ('novo', 'agendado', 'atendido')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create index sos_status_idx on public.sos_pedidos (status, criado_em desc);
create trigger sos_atualizado before update on public.sos_pedidos
  for each row execute function public.tocar_atualizado_em();

-- =====================================================================
-- RLS: tudo fechado, só admin
-- =====================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'admins','configuracoes','pacientes','paciente_tokens','dispositivos',
    'avaliacao_campos','avaliacoes','sessoes','exercicios','paciente_exercicios','sos_pedidos'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
    execute format('revoke all on public.%I from anon', t);
  end loop;
end $$;

-- admins: o admin só consegue ler a si mesmo. Inserção é feita pelo SQL Editor.
create policy admins_le_proprio on public.admins
  for select to authenticated using (user_id = auth.uid());

do $$
declare t text;
begin
  foreach t in array array[
    'configuracoes','pacientes','avaliacao_campos','avaliacoes','sessoes',
    'exercicios','paciente_exercicios','sos_pedidos'
  ] loop
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t || '_admin', t
    );
  end loop;
end $$;

-- Tokens e dispositivos: admin só lê (para mostrar status). Escrita só via funções.
create policy paciente_tokens_admin_le on public.paciente_tokens
  for select to authenticated using (public.is_admin());
create policy dispositivos_admin_le on public.dispositivos
  for select to authenticated using (public.is_admin());

-- =====================================================================
-- Funções do painel (exigem admin)
-- =====================================================================

-- Cria (ou recria) o token do paciente. Revoga o anterior e seus aparelhos.
-- Devolve o token em texto UMA ÚNICA VEZ; o banco guarda só o hash.
create or replace function public.admin_gerar_token(p_paciente_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_token text;
begin
  if not public.is_admin() then
    raise exception 'acesso_negado' using errcode = '42501';
  end if;

  perform 1 from public.pacientes where id = p_paciente_id;
  if not found then
    raise exception 'paciente_inexistente';
  end if;

  delete from public.dispositivos d
    using public.paciente_tokens t
    where d.token_id = t.id and t.paciente_id = p_paciente_id and t.revogado_em is null;

  update public.paciente_tokens set revogado_em = now()
    where paciente_id = p_paciente_id and revogado_em is null;

  v_token := public.gerar_segredo();
  insert into public.paciente_tokens (paciente_id, token_hash)
    values (p_paciente_id, public.hash_token(v_token));

  return v_token;
end;
$$;

-- Revoga o link do paciente sem criar outro.
create or replace function public.admin_revogar_token(p_paciente_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'acesso_negado' using errcode = '42501';
  end if;

  delete from public.dispositivos d
    using public.paciente_tokens t
    where d.token_id = t.id and t.paciente_id = p_paciente_id and t.revogado_em is null;

  update public.paciente_tokens set revogado_em = now()
    where paciente_id = p_paciente_id and revogado_em is null;
end;
$$;

-- =====================================================================
-- Funções do paciente (papel anon). Nunca expõem tabelas inteiras.
-- =====================================================================

-- Uso interno: valida token + chave do aparelho e devolve o id do paciente.
create or replace function public._paciente_por_acesso(p_token text, p_chave text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_paciente uuid;
  v_disp uuid;
begin
  if p_token is null or length(p_token) < 32 or p_chave is null or length(p_chave) < 32 then
    return null;
  end if;

  select t.paciente_id, d.id into v_paciente, v_disp
    from public.paciente_tokens t
    join public.dispositivos d on d.token_id = t.id
   where t.token_hash = public.hash_token(p_token)
     and t.revogado_em is null
     and d.chave_hash = public.hash_token(p_chave);

  if v_disp is not null then
    update public.dispositivos set ultimo_acesso = now() where id = v_disp;
  end if;

  return v_paciente;
end;
$$;

-- Primeira abertura no aparelho: confere a data de nascimento.
-- Retorna {ok, chave} ou {ok:false, erro}. Bloqueia 15 min após 5 erros.
create or replace function public.paciente_confirmar(p_token text, p_nascimento date)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_tok public.paciente_tokens%rowtype;
  v_nasc date;
  v_chave text;
begin
  if p_token is null or length(p_token) < 32 then
    return jsonb_build_object('ok', false, 'erro', 'link_invalido');
  end if;

  select * into v_tok from public.paciente_tokens
   where token_hash = public.hash_token(p_token) and revogado_em is null
   for update;

  if not found then
    return jsonb_build_object('ok', false, 'erro', 'link_invalido');
  end if;

  if v_tok.bloqueado_ate is not null and v_tok.bloqueado_ate > now() then
    return jsonb_build_object('ok', false, 'erro', 'bloqueado', 'ate', v_tok.bloqueado_ate);
  end if;

  select data_nascimento into v_nasc from public.pacientes where id = v_tok.paciente_id;

  if v_nasc is distinct from p_nascimento then
    if v_tok.falhas + 1 >= 5 then
      update public.paciente_tokens
         set falhas = 0, bloqueado_ate = now() + interval '15 minutes'
       where id = v_tok.id;
      return jsonb_build_object('ok', false, 'erro', 'bloqueado', 'ate', now() + interval '15 minutes');
    end if;
    update public.paciente_tokens set falhas = falhas + 1 where id = v_tok.id;
    return jsonb_build_object('ok', false, 'erro', 'data_incorreta', 'restantes', 4 - v_tok.falhas);
  end if;

  update public.paciente_tokens set falhas = 0, bloqueado_ate = null where id = v_tok.id;

  v_chave := public.gerar_segredo();
  insert into public.dispositivos (token_id, chave_hash) values (v_tok.id, public.hash_token(v_chave));

  return jsonb_build_object('ok', true, 'chave', v_chave);
end;
$$;

-- Dados da página do paciente. Só o que é dele, sem notas internas.
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
    ), '[]'::jsonb)
  ) into v_res
  from public.pacientes p where p.id = v_id;

  return v_res;
end;
$$;

-- Pedido de retorno prioritário. Só registra se a triagem for toda "não".
-- Evita duplicar: se já há pedido "novo" nas últimas 12 h, reaproveita.
create or replace function public.paciente_pedir_sos(p_token text, p_chave text, p_triagem jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_nome text;
  v_chave text;
begin
  v_id := public._paciente_por_acesso(p_token, p_chave);
  if v_id is null then
    return jsonb_build_object('ok', false, 'erro', 'acesso_invalido');
  end if;

  -- Triagem precisa ter as 3 respostas e todas "não" (false).
  foreach v_chave in array array['dormencia_virilha', 'perda_forca', 'alteracao_urina_fezes'] loop
    if p_triagem is null or jsonb_typeof(p_triagem -> v_chave) <> 'boolean' then
      return jsonb_build_object('ok', false, 'erro', 'triagem_incompleta');
    end if;
    if (p_triagem ->> v_chave)::boolean then
      return jsonb_build_object('ok', false, 'erro', 'sinal_alerta');
    end if;
  end loop;

  select nome into v_nome from public.pacientes where id = v_id;

  if not exists (
    select 1 from public.sos_pedidos
     where paciente_id = v_id and status = 'novo' and criado_em > now() - interval '12 hours'
  ) then
    insert into public.sos_pedidos (paciente_id, triagem)
      values (v_id, jsonb_build_object(
        'dormencia_virilha', false, 'perda_forca', false, 'alteracao_urina_fezes', false
      ));
  end if;

  return jsonb_build_object('ok', true, 'nome', v_nome);
end;
$$;

-- =====================================================================
-- Permissões de execução
-- =====================================================================
revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function public.paciente_confirmar(text, date) to anon, authenticated;
grant execute on function public.paciente_dados(text, text) to anon, authenticated;
grant execute on function public.paciente_pedir_sos(text, text, jsonb) to anon, authenticated;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.admin_gerar_token(uuid) to authenticated;
grant execute on function public.admin_revogar_token(uuid) to authenticated;
-- tocar_atualizado_em roda como trigger; hash_token/gerar_segredo são internas.

-- Funções criadas no futuro não ficam executáveis por anon automaticamente.
alter default privileges in schema public revoke execute on functions from public, anon;

-- =====================================================================
-- Storage: vídeos dos exercícios (bucket público, conteúdo não sensível)
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('exercicios', 'exercicios', true, 20971520, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do nothing;

create policy exercicios_admin_insere on storage.objects
  for insert to authenticated with check (bucket_id = 'exercicios' and public.is_admin());
create policy exercicios_admin_atualiza on storage.objects
  for update to authenticated using (bucket_id = 'exercicios' and public.is_admin());
create policy exercicios_admin_apaga on storage.objects
  for delete to authenticated using (bucket_id = 'exercicios' and public.is_admin());

-- =====================================================================
-- Dados iniciais de configuração (não são dados de paciente)
-- =====================================================================
insert into public.configuracoes (chave, valor) values
  ('termo_versao', '2026-11-03-rascunho'),
  ('termo_texto',
   'Autorizo o Dr. Pablo Andrade, fisioterapeuta, a registrar e armazenar meus dados pessoais e de saúde '
   || '(identificação, avaliação, sessões e exercícios) com a finalidade exclusiva de acompanhar meu tratamento. '
   || 'Sei que receberei um link pessoal para consultar um resumo desses dados, protegido pela confirmação da minha '
   || 'data de nascimento. Posso pedir a qualquer momento acesso, correção ou exclusão dos meus dados, ou revogar este '
   || 'consentimento, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018). Os dados não são compartilhados com terceiros.'),
  ('mensagem_link',
   'Olá, {nome}! Aqui é o Dr. Pablo Andrade. Preparei uma página só sua com o resumo da sua avaliação, '
   || 'os segmentos tratados e os seus exercícios: {link}' || chr(10) || chr(10)
   || 'Na primeira vez, ela pede sua data de nascimento para confirmar que é você. '
   || 'Se travar de novo, use o botão "Pedir retorno" na própria página.')
on conflict (chave) do nothing;

insert into public.avaliacao_campos
  (chave, rotulo, rotulo_paciente, tipo, opcoes, detalhe_rotulo, ordem, visivel_paciente)
values
  ('queixa_principal', 'Queixa principal', 'O que te trouxe aqui', 'texto', '[]', null, 10, true),
  ('tempo_queixa', 'Há quanto tempo', 'Há quanto tempo', 'lista',
     '["Menos de 1 semana", "1 a 4 semanas", "1 a 3 meses", "3 a 6 meses", "Mais de 6 meses"]', null, 20, true),
  ('dor_inicial', 'Escala de dor (0 a 10)', 'Sua dor no dia da avaliação', 'escala', '[]', null, 30, true),
  ('o_que_piora', 'O que piora', 'O que costuma piorar', 'texto_longo', '[]', null, 40, true),
  ('o_que_melhora', 'O que melhora', 'O que costuma aliviar', 'texto_longo', '[]', null, 50, true),
  ('irradiacao', 'Irradiação', 'A dor desce para outra região?', 'sim_nao_texto', '[]', 'Para onde?', 60, true),
  ('observacoes', 'Observações', 'Observações', 'texto_longo', '[]', null, 70, false)
on conflict (chave) do nothing;
