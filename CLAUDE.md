# ClaudeTradeHQ Website - Project Guide

## Project Overview
- **Purpose**: Professional website for Claude AI + MT4/MT5 trading education
- **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
- **Theme**: Dark cyber-trading with orange (#FF6200) and cyan accents

## Folder Structure
- `/app` → Main pages (Home, Backtests, Performance, About)
- `/components` → Reusable UI components
- `/lib` → Utilities and data
- `/public` → Images, banners, logos
- `CLAUDE.md` → This file (always keep updated)

## How to Work with Claude
When working in this project, always start your prompt with:

> "You are working in the ClaudeTradeHQ Next.js website. Current root: /home/dan/ClaudeTradeHQ/CTHQWebsite"

### Common Tasks

**Add a new backtest:**
- Put equity curve image in `/public/backtests/`
- Ask Claude to update `/app/backtests/page.tsx`

**Update Hero Banner:**
- Replace image in `/public/brand/`
- Ask Claude to update the hero section

**Add new content/page:**
- Create new folder in `/app/` 
- Claude can generate the full page

**Add an FX Blue account (`/fx-blue-links`):**
- Add it to `FXBLUE_ACCOUNTS` in `lib/fxblue-parse.ts` — that's the only edit needed
- Run `npm run fxblue` so the offline fallback covers the new account too
- The page splits accounts into Demo vs Live automatically off FX Blue's
  `Account type` field (`Real` → Live section), so no page edit is needed
- All accounts run 24/7 on a dedicated VPS; keep that framing in the copy

**How `/fx-blue-links` gets its numbers:**
- The page is ISR (`export const revalidate = 1800`) and refetches FX Blue at
  most every 30 min, so published stats track the accounts with no redeploy
- `lib/fxblue-parse.ts` holds the scraping rules and is shared by the page and
  the refresh script — fix a markup change in one place only
- `www.fxblue.com` is client-rendered and returns nothing to `fetch`; scrape
  `api.fxblue.com/users/<id>`, which is still server-rendered
- `lib/fxblue-data.json` is the fallback if FX Blue is unreachable. Cards served
  from it are labelled "cached — FX Blue unreachable" rather than passing stale
  numbers off as current

## Important Rules
- Always run `npm run build` before committing
- Use proper escaping for apostrophes in JSX (`&rsquo;`)
- All images go in `/public` folder
- Keep strong disclaimers ("Not financial advice")
- Never hand-edit numbers in `lib/fxblue-data.json` — it is generated output.
  Regenerate with `npm run fxblue`.
- Every detailed backtest report page under `app/backtests/<slug>/page.tsx` must render `<WhitelistedBuildPanel />` (from `components/whitelisted-build-panel.tsx`) between the trade-stats grid and the disclaimer block. It is the funnel from a convinced viewer into the funded/live whitelisted-EA email path. The archive page at `/backtests` and the `/downloads` page render it too. Pattern set by `app/backtests/claudetradehq-0-01/page.tsx`.
- **No public EA file downloads.** `/downloads` is the "have Dan build your
  custom EA" service page — never re-add a `.ex4`/`.ex5` link or a
  `public/expert-advisors/` binary. `expertAdvisors` in `lib/data.ts` is the
  reference-build catalogue the service is quoted against, not a file list.
- `/downloads` and `/fx-blue-links` link to each other, and every page links to
  `/downloads` from its body copy. Keep both directions intact when editing.
- Show the contact email **only** through `<ContactEmailBanner />`
  (`components/contact-email-banner.tsx`). It assembles the address in the
  browser after mount so the server HTML never contains a scrapeable
  `name@domain` string — never hard-code the address in JSX.

## Deployment
- Push to `main` branch → Vercel auto-deploys
- Live URL: https://claude-trade-hq.vercel.app

## Future Features
- Member area (paid prompts/courses)
- Real backtest uploads
- Live performance tracking
- Blog / YouTube integration

