-- =====================================================================
-- Acesso do paciente por senha definida pelo Dr. Pablo (no lugar da data de nascimento).
-- A senha fica só como hash bcrypt. Pacientes sem senha continuam entrando pela data
-- de nascimento até o Dr. Pablo definir uma.
-- =====================================================================
alter table public.pacientes add column if not exists senha_hash text;

-- Define (ou troca) a senha do paciente. Trocar a senha desconecta os aparelhos.
create or replace function public.admin_definir_senha(p_paciente_id uuid, p_senha text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'acesso_negado' using errcode = '42501';
  end if;
  if p_senha is null or length(trim(p_senha)) < 4 then
    raise exception 'senha_curta';
  end if;

  update public.pacientes
     set senha_hash = extensions.crypt(trim(p_senha), extensions.gen_salt('bf', 8))
   where id = p_paciente_id;
  if not found then
    raise exception 'paciente_inexistente';
  end if;

  delete from public.dispositivos d
    using public.paciente_tokens t
   where d.token_id = t.id and t.paciente_id = p_paciente_id;
end;
$$;

-- Diz ao link o que pedir: 'senha', 'nascimento' (paciente antigo) ou 'invalido'.
create or replace function public.paciente_metodo(p_token text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hash text;
begin
  if p_token is null or length(p_token) < 32 then
    return 'invalido';
  end if;
  select p.senha_hash into v_hash
    from public.paciente_tokens t
    join public.pacientes p on p.id = t.paciente_id
   where t.token_hash = public.hash_token(p_token) and t.revogado_em is null;
  if not found then
    return 'invalido';
  end if;
  return case when v_hash is null then 'nascimento' else 'senha' end;
end;
$$;

-- Entrada do paciente: confere a senha (ou a data de nascimento, se ainda não houver senha).
-- Retorna {ok, chave} ou {ok:false, erro}. Bloqueia 15 min após 5 erros.
create or replace function public.paciente_entrar(p_token text, p_segredo text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_tok public.paciente_tokens%rowtype;
  v_hash text;
  v_nasc date;
  v_data date;
  v_ok boolean := false;
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

  select senha_hash, data_nascimento into v_hash, v_nasc from public.pacientes where id = v_tok.paciente_id;

  if v_hash is not null then
    v_ok := p_segredo is not null and extensions.crypt(trim(p_segredo), v_hash) = v_hash;
  else
    begin
      v_data := case
        when p_segredo ~ '^\d{4}-\d{2}-\d{2}$' then p_segredo::date
        else to_date(trim(p_segredo), 'DD/MM/YYYY')
      end;
    exception when others then
      v_data := null;
    end;
    v_ok := v_data is not null and v_data = v_nasc;
  end if;

  if not v_ok then
    if v_tok.falhas + 1 >= 5 then
      update public.paciente_tokens set falhas = 0, bloqueado_ate = now() + interval '15 minutes' where id = v_tok.id;
      return jsonb_build_object('ok', false, 'erro', 'bloqueado', 'ate', now() + interval '15 minutes');
    end if;
    update public.paciente_tokens set falhas = falhas + 1 where id = v_tok.id;
    return jsonb_build_object('ok', false, 'erro', 'incorreto', 'restantes', 4 - v_tok.falhas);
  end if;

  update public.paciente_tokens set falhas = 0, bloqueado_ate = null where id = v_tok.id;
  v_chave := public.gerar_segredo();
  insert into public.dispositivos (token_id, chave_hash) values (v_tok.id, public.hash_token(v_chave));
  return jsonb_build_object('ok', true, 'chave', v_chave);
end;
$$;

-- A entrada antiga (só data de nascimento) passa a recusar pacientes que têm senha.
create or replace function public.paciente_confirmar(p_token text, p_nascimento date)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if public.paciente_metodo(p_token) = 'senha' then
    return jsonb_build_object('ok', false, 'erro', 'usa_senha');
  end if;
  return public.paciente_entrar(p_token, p_nascimento::text);
end;
$$;

revoke execute on function public.admin_definir_senha(uuid, text) from public, anon;
revoke execute on function public.paciente_metodo(text) from public;
revoke execute on function public.paciente_entrar(text, text) from public;
grant execute on function public.admin_definir_senha(uuid, text) to authenticated;
grant execute on function public.paciente_metodo(text) to anon, authenticated;
grant execute on function public.paciente_entrar(text, text) to anon, authenticated;

-- Mensagem padrão do link: fala da senha (só troca se ainda for o texto original).
update public.configuracoes
   set valor = replace(valor, 'Na primeira vez, ela pede sua data de nascimento para confirmar que é você.', 'Na primeira vez, ela pede a senha que combinamos no consultório.')
 where chave = 'mensagem_link';
