# Parceiros R3 — Formulário de cadastro

Formulário web de cadastro de parceiros da **R3 Suprimentos** (segmento de hotelaria). Os dados enviados são gravados no Supabase.

**Produção:** https://parceiros-r3.vercel.app

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4, Headless UI, Radix (checkbox), Framer Motion
- `react-input-mask` (máscaras de telefone/documento)
- Supabase (`@supabase/supabase-js`)

## Como rodar

```bash
npm install
# crie o arquivo .env.local com as variáveis abaixo
npm run dev      # http://localhost:3000
```

### Variáveis de ambiente (`.env.local`)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_KEY` | Chave pública (anon) do Supabase |

### Banco

O formulário insere registros na tabela **`formularios`** do Supabase. Garanta que a tabela exista e que a política RLS permita `insert` para a chave anon.

## Estrutura

```
lib/supabaseClient.tsx      cliente Supabase
src/app/page.tsx            página do formulário
src/components/Form.tsx     formulário e envio
src/components/SelectCargo.tsx   seletor de cargo
src/components/Toast.tsx    feedback de envio
```

## Deploy

Vercel — configure as duas variáveis acima no painel do projeto.
