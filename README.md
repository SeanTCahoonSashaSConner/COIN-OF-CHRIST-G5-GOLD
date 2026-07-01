# Country of Christ — The Coin of Christ · G5 GOLD

The sovereign digital nation. TIV-TEK Human Edification, G5 GOLD loyalty currency, walled-garden redemption via The Crown of Christ.

## Tech Stack
- React (Create React App) + Tailwind + shadcn/ui
- Supabase (Postgres + RLS + Edge Functions)
- Pass2U (Apple Wallet / Google Pay loyalty cards)

## Deploy to Vercel

1. Push this repo to GitHub (via Emergent "Save to GitHub")
2. Import on Vercel: vercel.com → Add New → Project
3. **Settings:**
   - Framework Preset: **Create React App**
   - Root Directory: **`frontend`**
   - Build Command: `yarn build`
   - Output Directory: `build`
4. **Environment Variables:**
   - `REACT_APP_BACKEND_URL` → your Vercel URL (set after first deploy)
   - `REACT_APP_SUPABASE_URL` → https://cwsgebsxbhvfnyzyjasy.supabase.co
   - `REACT_APP_SUPABASE_ANON_KEY` → (copy from frontend/.env)
5. Deploy. `vercel.json` at repo root handles React Router rewrites.

## Routes
- `/` — TIVTEK Trinity home
- `/merchants` — Merchant Transparency Ledger
- `/constitution` — Sovereign Constitution + Merchant Covenant
- `/witness-jury` — Witness Jury Protocol
- `/debt-exile` — Debt Exile Notice
- `/closet` — The Crown of Christ · Fit for a King
- `/wallet/sasha` — Sasha Conner's G5 Wallet Card (Pass2U)
