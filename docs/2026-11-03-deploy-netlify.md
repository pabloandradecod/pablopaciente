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

### Fotos posturais (avaliação biomecânica)

- Até 20 fotos por avaliação (frente, costas, laterais), no Assistente ou na ficha (aba **Avaliação**, card **Gerar exercícios com IA**).
- Etapa 1: a IA marca os pontos anatômicos de cada foto (cabeça, acrômios, cristas ilíacas, joelhos, maléolos; no perfil, trago, acrômio, trocânter, joelho e maléolo), em lotes de 4 fotos, 3 lotes ao mesmo tempo.
- O painel desenha por cima de cada foto: grade quadriculada, linha de prumo, linhas de alinhamento e as medidas (inclinação de ombros, pelve e joelhos em graus; distâncias até o prumo em % da altura; ângulos da cabeça e do tronco no perfil). Tocando na foto, dá para arrastar os pontos para corrigir.
- A IA identifica sozinha a vista de cada foto (frente, costas, laterais ou teste de Adams). Se a foto cortar os pés, a linha de referência passa a ser a linha média da pelve (frontal) ou o trocânter (perfil). No perfil, a ponta do nariz define para que lado o paciente olha.
- Na ficha, **Refazer análise postural** roda de novo a marcação das fotos já salvas com a versão mais nova, mantendo os exercícios.
- Etapa 2: a prescrição (exercícios do Dr. Pablo) e a análise consolidada recebem só o texto das medidas e achados, sem reenviar as fotos. Etapa 3 (opcional): treino de academia A/B/C.
- Ao salvar, as fotos vão para o bucket privado `fotos-posturais`. A análise aparece na ficha e, com **Mostrar no link do paciente** marcado (padrão), também no link e no PDF do paciente. O link busca as fotos pela função `paciente-fotos`, que confere token e chave do aparelho e devolve links de 1 hora.
- Custo de referência: cerca de US$ 0,07 por lote de 2 fotos na marcação; 20 fotos devem ficar perto de US$ 0,60, mais uns US$ 0,13 de prescrição e treino.
- Banco: migrações `20261113000000_fotos_posturais.sql` e `20261113010000_postura_no_link.sql` (já aplicadas).

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
