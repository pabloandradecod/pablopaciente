# Portal do Paciente | Dr. Pablo Andrade

Sistema para pacientes que já se consultaram: o profissional registra avaliação, sessões e exercícios no painel e envia um link pessoal pelo WhatsApp. O paciente vê o resumo, os segmentos tratados, a evolução da dor, os exercícios e um botão para pedir retorno prioritário, com triagem de sinais de alerta.

**Stack:** React + Vite + Tailwind (PWA) · Supabase (Postgres, Auth, Storage, RLS) · Netlify.

## Rotas

| Rota | Quem usa |
|---|---|
| `/painel` | Dr. Pablo (login por magic link) |
| `/p#TOKEN` | Paciente (digita a senha definida no cadastro na primeira abertura do aparelho) |
| `/previa-coluna` | Prévia do mapa da coluna, sem dados de paciente |

## Começar

```bash
npm install
cp .env.example .env.local   # preencha com os dados do Supabase
npm run dev
```

Deploy passo a passo: [`docs/2026-11-03-deploy-netlify.md`](docs/2026-11-03-deploy-netlify.md)

## Segurança (resumo)

- RLS em todas as tabelas. Só o usuário cadastrado em `public.admins` lê e escreve.
- O paciente não acessa tabelas. Usa três funções (`paciente_confirmar`, `paciente_dados`, `paciente_pedir_sos`) que validam o token do link e a chave do aparelho.
- O token tem 256 bits aleatórios e o banco guarda só o hash. O link vai depois do `#`, que não aparece em logs de servidor.
- A senha do paciente é definida pelo profissional no cadastro e guardada só como hash (bcrypt). Pacientes antigos sem senha entram pela data de nascimento.
- 5 erros de senha bloqueiam o link por 15 minutos.
- Recriar ou revogar o link desconecta todos os aparelhos.
