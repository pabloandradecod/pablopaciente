# Deploy: Supabase + Netlify

Tempo estimado: 30 minutos. Faça na ordem.

## 1. Supabase (banco, login e vídeos)

1. Crie um projeto em [supabase.com](https://supabase.com). Região sugerida: **South America (São Paulo)**, para manter os dados no Brasil.
2. Vá em **SQL Editor** e rode, nesta ordem:
   - `supabase/migrations/20261103000000_schema_inicial.sql` (obrigatório)
   - `supabase/seed/2026-11-03-seed-pacientes-exercicios.sql` (opcional: 2 pacientes fictícios e 5 exercícios para testar)
3. **Authentication > Sign In / Providers**: deixe o provedor **Email** ligado e **desligue "Allow new users to sign up"**. Assim ninguém consegue criar conta.
4. **Authentication > Users > Add user**: crie o seu usuário com o seu e-mail.
5. Volte ao **SQL Editor** e dê permissão de administrador ao seu e-mail:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'SEU-EMAIL@exemplo.com';
   ```
6. **Authentication > URL Configuration**:
   - Site URL: o endereço do Netlify (ex.: `https://pablo-paciente.netlify.app`)
   - Redirect URLs: adicione `https://pablo-paciente.netlify.app/painel` e `http://localhost:5173/painel`
7. **Project Settings > API**: copie a **Project URL** e a chave **anon / publishable**. A chave `service_role` nunca vai para o site.

## 2. Netlify (site)

1. Em [netlify.com](https://netlify.com): **Add new site > Import an existing project** e escolha este repositório do GitHub.
2. Build: o `netlify.toml` já define tudo (`npm run build`, pasta `dist`).
3. **Site configuration > Environment variables**:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = chave anon / publishable
4. Faça o deploy. Se mudar as variáveis depois, rode **Trigger deploy** de novo.
5. Opcional: em **Domain management**, ligue um domínio próprio (ex.: `paciente.drpabloandrade.com.br`) e atualize o passo 1.6.

## 3. Teste rápido

1. Abra `https://SEU-SITE/painel`, digite seu e-mail e entre pelo link que chegar.
2. Abra um paciente, aba **Link**, toque em **Gerar link** e envie para o seu próprio WhatsApp.
3. Abra o link no celular, confirme a data de nascimento e teste o botão **Pedir retorno**.
4. Confira o pedido em **Fila SOS**.

## 4. Antes de usar com pacientes reais

- Revise o termo de consentimento em **Ajustes** e mude a versão.
- Apague os pacientes fictícios (botão no fim da ficha, ou o bloco LIMPEZA no fim do seed).
- O e-mail padrão do Supabase tem limite de poucos envios por hora. Para uso só seu é suficiente. Se precisar de mais, configure um SMTP próprio em **Authentication > Emails**.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha URL e chave
npm run dev                  # http://localhost:5173/painel
```
