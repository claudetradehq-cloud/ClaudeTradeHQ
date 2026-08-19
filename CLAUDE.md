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

**Add / refresh an FX Blue account (`/fx-blue-links`):**
- Add the account to the `ACCOUNTS` array in `scripts/fetch-fxblue.mjs`
- Run `npm run fxblue` — rewrites `lib/fxblue-data.json` from the live statements
- The page splits accounts into Demo vs Live automatically off FX Blue's
  `Account type` field (`Real` → Live section), so no page edit is needed
- All accounts run 24/7 on a dedicated VPS; keep that framing in the copy

## Important Rules
- Always run `npm run build` before committing
- Use proper escaping for apostrophes in JSX (`&rsquo;`)
- All images go in `/public` folder
- Keep strong disclaimers ("Not financial advice")
- Never hand-edit numbers in `lib/fxblue-data.json` — it is generated output.
  Regenerate with `npm run fxblue` so published stats always match FX Blue.
- Every detailed backtest report page under `app/backtests/<slug>/page.tsx` must render `<WhitelistedBuildPanel />` (from `components/whitelisted-build-panel.tsx`) between the trade-stats grid and the disclaimer block. It is the funnel from a convinced viewer into the funded/live whitelisted-EA email path. The archive page at `/backtests` and the `/downloads` page render it too. Pattern set by `app/backtests/claudetradehq-0-01/page.tsx`.

## Deployment
- Push to `main` branch → Vercel auto-deploys
- Live URL: https://claude-trade-hq.vercel.app

## Future Features
- Member area (paid prompts/courses)
- Real backtest uploads
- Live performance tracking
- Blog / YouTube integration

