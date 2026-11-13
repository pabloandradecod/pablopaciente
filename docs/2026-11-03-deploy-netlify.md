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
3. Abra o link no celular, digite a senha do paciente e teste o botão **Pedir retorno**.
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

## Assistente com IA (API da Anthropic)

1. Em [console.anthropic.com](https://console.anthropic.com): **Settings > API Keys > Create Key** e, em **Billing**, adicione créditos. Em **Limits**, defina um teto mensal de gasto.
2. No Supabase: **Edge Functions > Secrets** (`https://supabase.com/dashboard/project/<projeto>/functions/secrets`) e crie o secret `ANTHROPIC_API_KEY` com a chave.
3. A função `assistente` (código em `supabase/functions/assistente/index.ts`) já está publicada. Para republicar: `supabase functions deploy assistente`.
4. Recarregue o painel: o botão **Gerar com IA** aparece no Assistente. Sem a chave, o painel usa a ponte manual (copiar e colar no app do Claude).

Modelo: Claude Opus 5.5, esforço médio, resposta em JSON validado por esquema. Cada análise mostra o custo estimado.

### Fotos posturais

- No Assistente, **Anexar** aceita até 4 fotos (frente, costas, laterais). O painel reduz cada foto no celular antes de enviar.
- A IA devolve a análise postural (achados por região, lado, intensidade e os exercícios que trabalham cada achado) junto com o relatório e a prescrição.
- Ao salvar, as fotos vão para o bucket privado `fotos-posturais` (só o administrador lê; o paciente nunca vê) e a análise aparece na aba **Avaliação** da ficha.
- Custo: uma análise com 2 fotos ficou em cerca de US$ 0,14 no teste; sem fotos continua por volta de US$ 0,08.
- Banco: migração `supabase/migrations/20261113000000_fotos_posturais.sql` (já aplicada).

## Domínio próprio (pablopaciente.com.br)

1. **Netlify:** Domain management > Add a domain > `pablopaciente.com.br` > confirmar. Adicione também `www.pablopaciente.com.br`.
2. **Registro.br:** no domínio, em DNS > Editar zona, crie:
   - Tipo `A`, nome em branco (raiz), valor `75.2.60.5`
   - Tipo `CNAME`, nome `www`, valor `moonlit-vacherin-275173.netlify.app.`
3. Aguarde a propagação (de minutos a algumas horas). O Netlify ativa o HTTPS sozinho; em Domain management, marque `pablopaciente.com.br` como domínio principal.
4. **Supabase** > Authentication > URL Configuration:
   - Site URL: `https://pablopaciente.com.br`
   - Redirect URLs: acrescente `https://pablopaciente.com.br/painel` (mantenha o endereço do Netlify enquanto houver links antigos).
5. Links novos enviados pelo painel já saem com o domínio novo quando o painel for aberto por `https://pablopaciente.com.br/painel`. Links antigos continuam funcionando.
