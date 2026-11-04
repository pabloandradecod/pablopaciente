-- =====================================================================
-- Relatórios gerados pelo assistente (Claude), revisados pelo profissional.
-- Internos: nunca aparecem no link do paciente.
-- =====================================================================
create table public.relatorios_ia (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  relatorio text not null,            -- texto do relatório (markdown simples)
  resposta jsonb not null default '{}'::jsonb,  -- bloco estruturado devolvido
  origem text not null default 'ponte_manual' check (origem in ('ponte_manual', 'api')),
  criado_em timestamptz not null default now()
);
create index relatorios_ia_paciente_idx on public.relatorios_ia (paciente_id, criado_em desc);

alter table public.relatorios_ia enable row level security;
alter table public.relatorios_ia force row level security;
revoke all on public.relatorios_ia from anon;
create policy relatorios_ia_admin on public.relatorios_ia
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
