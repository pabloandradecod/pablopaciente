-- =====================================================================
-- Fotos posturais anexadas no assistente.
-- Bucket PRIVADO: só o administrador lê e grava. O paciente nunca vê.
-- O relatório do assistente guarda os caminhos das fotos e a análise.
-- =====================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos-posturais', 'fotos-posturais', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy fotos_posturais_admin_le on storage.objects
  for select to authenticated using (bucket_id = 'fotos-posturais' and public.is_admin());
create policy fotos_posturais_admin_insere on storage.objects
  for insert to authenticated with check (bucket_id = 'fotos-posturais' and public.is_admin());
create policy fotos_posturais_admin_apaga on storage.objects
  for delete to authenticated using (bucket_id = 'fotos-posturais' and public.is_admin());

-- Lista de fotos do relatório: [{ "caminho": "...", "vista": "Anterior" }]
alter table public.relatorios_ia add column if not exists fotos jsonb not null default '[]'::jsonb;
