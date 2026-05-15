# Dirks Cloud Engineering — Website

Minimalistische Next.js one-pager (statische export) voor zakelijk digitaal visitekaartje.

## Stack

- Next.js 15 (App Router, `output: 'export'`)
- Tailwind CSS 4
- TypeScript

## Ontwikkeling

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Statische output: `out/` (Azure Static Web Apps).

## Security

Strikte headers via `next.config.ts` en `public/staticwebapp.config.json` (CSP zonder inline scripts, `X-Frame-Options: DENY`, enz.).

## Configuratie

- Contact: `app/page.tsx` → `CONTACT_EMAIL`
- KvK: `app/page.tsx` → `KVK`
