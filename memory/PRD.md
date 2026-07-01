# Crypto Walking with Christ - PRD

## Original Problem Statement
Build the "Crypto Walking with Christ" app - an audible scripture app where users 14+ get paid $13/hour to listen to 33 hours of King James Bible audio. Features the TIV-TEK Trinity verification system for 100% human verification.

## User Personas
1. **Disciples/Citizens** - Users who listen to scripture and earn G5 GOLD
2. **Advertisers** - Donate merchandise, compete for ad placement via donation leaderboard
3. **Witnesses** - Verify Good Samaritan acts on Saturdays

## Core Requirements
- Audio player with video loop background (Jesus walking)
- TIV-TEK 10-second slide verification (Mon-Fri)
- Saturday Good Samaritan task + witness upload
- Sunday 18-minute 528 Hz Sabbath tone
- G5 GOLD currency paid every 33 hours
- $3/hr raise every 90 perfect days across all 3 pillars
- Ledger tracking: hours, balance, streaks
- Profile: name, age, ethnicity, gender only
- Merchant Transparency Ledger for advertisers

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Connection**: Transaction Pooler (IPv4)
- **Blockchain**: Solana (countryofchrist.sol)

## What's Been Implemented

### Jan 27, 2026 - Initial TIV-TEK System
- ✅ `citizen_profiles` - name, age, ethnicity, gender, disciple_id
- ✅ `loyalty_ledger` - hours, balance, hourly_rate, pillar streaks
- ✅ `tivtek_tracking` - verification stats, weekly completion, sabbath tracking
- ✅ `good_samaritan_tasks` - Saturday task tracking with witness upload
- ✅ `sabbath_sessions` - Sunday 528 Hz participation
- ✅ `verification_log` - Atomic time ledger for all verifications
- ✅ Audio Player with TIV-TEK verification cycle
- ✅ Three Pillars dashboard

### Jan 27, 2026 - Merchant Transparency Ledger
- ✅ `advertisers` - business info, $25K buy-in status, donation tracking, Solana wallet
- ✅ `merchant_donations` - item donations with value and quality scoring
- ✅ `weekly_competitions` - 1st/2nd/3rd place tracking (4/2/1 days exclusive ads)
- ✅ `war_room_events` - $100K monthly competition for 7 days exclusive
- ✅ `war_room_participants` - tracking entry fees and participants
- ✅ `ad_schedule` - exclusive ad slot scheduling
- ✅ Public advertiser dashboard at /merchants
- ✅ Live leaderboard with real-time updates
- ✅ War Room tab with $100K entry, no runner-ups rule
- ✅ Citizen Insights (demographics for advertisers)
- ✅ Live Donations feed

### Jan 27, 2026 - Mercy Map Module
- ✅ `mercy_map_distribution` - regional G5 GOLD distribution tracking
- ✅ `mercy_map_events` - real-time donation pulses for map animation
- ✅ Geographic visualization with 5 US regions (Northeast, Southeast, Midwest, Southwest, West)
- ✅ Interactive region selection with detail panels
- ✅ Advertiser influence breakdown per region
- ✅ Regional Influence Leaderboard showing top advertiser per region
- ✅ Real-time pulse animations for donation events
- ✅ Advertiser filter to isolate competitor influence
- ✅ Color-coded legend for all advertisers

### Jan 27, 2026 - Battle Mode & Enhanced Features
- ✅ `territory_alerts` - competitive territory threat notifications
- ✅ `donation_momentum` - hot streak and velocity tracking
- ✅ `regional_conquests` - ruler tracking per region with attack status
- ✅ `citizen_achievements` - user badge progress tracking
- ✅ `achievement_definitions` - 10 badges with 5 tiers (bronze/silver/gold/platinum/divine)
- ✅ Battle Mode dashboard with real-time territory alerts
- ✅ Regional Conquest map showing rulers and "under attack" status
- ✅ Donation Momentum leaderboard with hot/cooling streak indicators
- ✅ Achievement system with 6 categories (Listening, Streaks, Samaritan, Sabbath, Special)
- ✅ 528 Hz Sabbath Tone player with Web Audio API and heartbeat rhythm
- ✅ Sound alert toggle for territory notifications

### Jan 27, 2026 - G5 Sovereign Constitution & Merchant Covenant
- ✅ Constitution page at /constitution with expandable articles
- ✅ Article I: The Sovereign Identity (TIV-TEK Trinity)
- ✅ Article II: G5 GOLD Currency (earning, spending, blockchain transparency)
- ✅ Article III: The Three Pillars (verification, samaritan, sabbath)
- ✅ Article IV: Citizen Rights (5 inalienable rights)
- ✅ Article V: The Crypto Christian Closet (phygital commerce)
- ✅ Article VI: Amendments process
- ✅ Merchant Business Covenant tab with binding agreement terms
- ✅ Section 1: Entry Requirements ($25K buy-in, G5 GOLD acceptance)
- ✅ Section 2: 100% Transparency Mandate (non-negotiable requirements)
- ✅ Section 3: What Advertisers Receive (6 benefits including demographic data)
- ✅ Section 4: Weekly Competition & Ad Slots (1st/2nd/3rd prizes)
- ✅ Section 5: The Transparent Playbook (Mercy Map, Battle Mode, Leaderboard)
- ✅ Section 6: Covenant Termination conditions

## Prioritized Backlog

### P0 - Critical
- [ ] User registration/authentication flow
- [ ] Audio source integration (Bible.is API or hosted MP3s)
- [ ] Resume playback from last position

### Feb 1, 2026 — Silent Platform + Brand Color System
- ✅ Removed `Achievements.jsx` + `/achievements` route — silent platform, no public posts/badges
- ✅ Global CSS: `.g5-gold` solid metallic gold gradient, `.wb-num` witness-blue (#3B82F6)
- ✅ `<CountryOutline />` component — neon-blue silhouettes of USA, Canada, Mexico, UK, Brazil, Italy, Country of Christ
- ✅ `<RailroadFence />` component — golden railroad ties with optional gate label
- ✅ `<AdvertiserDeclaration />` component — clean content rules, banned categories, citizen-roster minor warning, banishment penalty
- ✅ Folded-map page background (`.folded-map`) with paper-fold creases + parchment grain
- ✅ Wired into: Witness Jury (UK outline), Constitution (Canada/USA outline by tab), Advertiser Dashboard (CountryOfChrist outline + Declaration), Debt Exile (Brazil outline)
- ✅ G5 GOLD text auto-styled gold across every component
- ✅ Numerals / $ amounts / Article Roman numerals auto-styled witness-blue

### Feb 1, 2026 — Country of Christ Seal + TIVTEK TRINITY rebuild
- ✅ Seal asset stored at `/app/frontend/public/assets/seal.jpg` (TIV-TEK Human Edification — lion+bull+pyramid+golden cargo ships)
- ✅ `<SealLogo />` component with `hero` / `header` / `watermark` variants and optional caption (`TIV-TEK · HUMAN EDIFICATION` + `COUNTRY OF CHRIST`)
- ✅ Strategically placed LARGE centered seal on every page (no fixed corner, no side placement, sized for authority):
  - **Constitution** — centered hero seal w/ caption in header
  - **Witness Jury** — centered hero seal w/ caption in header
  - **Debt Exile** — centered hero seal w/ caption in header
  - **Advertiser Dashboard** — centered hero seal w/ caption between sticky header and AdvertiserDeclaration
  - **Audio Player (TIVTEK Trinity)** — centered hero seal w/ caption above ATOMIC TIME card
- ✅ **AudioPlayer.jsx rebuilt as TIVTEK TRINITY** matching the Lovable design:
  - Black + gold + witness-blue color system
  - "TIVTEK TRINITY" gold-gradient title with triangle icons
  - "VERIFIED HUMAN PRESENCE PROTOCOL" subtitle
  - **Card 1: ATOMIC TIME / GPSDO** — live witness-blue UTC clock + "● SYNCED" badge
  - **Card 2: HUMAN VERIFICATION** — countdown + gold "W" handle slide-to-walk button + "chevrons + SLIDE TO WALK" text
  - **Card 3: OFFLINE TOKEN** — G coin + G5 GOLD label + "NOT A CRYPTOCURRENCY" pill + `countryofchrist.sol` link
  - **Card 4: REPUTATION SCORE** — G coin + progress bar + "G.O.D. — Great God Give Good Grace"
  - **Card 5: Five Pillars grid** — TALENT · TIME · TREASURE · TRANSACTION · TRACK
  - **Card 6: The 5th Letter — G** — G · O · D + tagline
  - Preserves all existing TIV-TEK timing logic (20s/10s/31s), Saturday Good Samaritan, Sunday Sabbath 528 Hz, ledger sync, penalty modal



### P1 - High Priority
- [ ] Closet/shop for spending G5 GOLD
- [ ] Witness upload with photo/video
- [ ] Push notifications for verification
- [ ] Advertiser registration portal

### P2 - Medium Priority
- [ ] 528 Hz tone audio for Sabbath
- [ ] Weekly 33-hour completion tracking
- [ ] 90-day raise calculation automation
- [ ] Ad display during weekends
- [ ] Solana wallet integration

### P3 - Nice to Have
- [ ] Offline mode support (PWA)

## Supabase Credentials
- URL: https://cwsgebsxbhvfnyzyjasy.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

## Country of Christ App — LAUNCH READY (Feb 2026)

Sovereign digital nation. Learn-to-earn ecosystem powered by TIV-TEK Human Edification verification, G5 GOLD offline loyalty tokens, and a walled-garden redemption venue.

### Brand
- **THE COIN of CHRIST · G5 GOLD** — the learn-to-earn app (formerly "Crypto Walking with Christ")
- **THE CROWN OF CHRIST · Fit for a King** — the walled-garden redemption venue (formerly "Crypto Christian Closet")
- **Christian Currency Network** — the citizen-to-citizen mailing/verification network (formerly "Crypto Christian Network")
- Word "crypto" removed everywhere — cleaner brand positioning

## DB Tables (live in Supabase)
- `citizen_profiles` (existing) — citizen identity
- `loyalty_ledger` (existing) — TIV-TEK tracking
- `advertisers` (existing) — merchant accounts
- `merchant_donations` (existing) — donation history
- `war_room_events` (existing)
- **`member_ledger`** — G5 GOLD wallet (`disciple_id`, `g5_gold_balance`, `tier`, `is_tivtek_exempt`, `hourly_drop_amount`, `cycle_payout_amount`)
- **`closet_catalog`** — merchant-donated inventory
- **`closet_orders`** — Closet-only redemption (DB-locked venue)
- **`g5_wallet_cards`** — Pass2U card mapping per citizen

## Live Citizens
- **Sasha Conner** (`g5-sash-15`) — Co-Founder — $21,987 G5 GOLD — TIV-TEK exempt — Pass2U card live in Google Wallet
- **Sean Tivis Cahoon** (`00000000-0000-0000-0000-000000000001`) — Founder — $21,987 G5 GOLD — TIV-TEK exempt — Pass2U URL pending

## Pass2U Integration
- Account: `countryofchrist@gmail.com`
- API Key: `d6087c2cf93275ae0cfaffe5b44c0358` (valid until 2026-06-25)
- Model: `382655` (SOLFEGE card)
- Sasha's passId: `DdwbQl8JhDaE`
- Update endpoint: `PUT https://api.pass2u.net/v2/models/{modelId}/passes/{passId}`
- Field key: `balance` (Dynamic, set in model designer)

## Next Tasks (priority order)
1. Final Pass2U Save with "Apply updates to all passes" → push $21,987 live to Sasha's card
2. Marqeta JIT production integration (needs API keys from user)
3. Sean's `/wallet/sean` route (needs his Pass2U URL)
4. $10/33hr citizen deduction rule (SQL trigger + cron)
5. Citizen sign-up form
6. Real Closet inventory (advertiser onboarding)
7. C2C / Crypto Christian Network mailing system

## Deployment
- ✅ Production build verified (`yarn build` clean)
- ✅ `vercel.json` at repo root (React Router rewrites)
- ✅ GitHub repo pushed via "Save to GitHub"
- 🟡 Vercel import pending (manual user step)

## Design System (Feb 2026)
- G5 GOLD text → solid metallic gold gradient via `.g5-gold` CSS class
- Numerals/$/Article Roman numerals → witness-blue (#3B82F6) via `.wb-num`
- Country of Christ seal on every page (uncropped, large, centered)
- Folded-map background + neon country outlines + golden railroad fences
- Advertiser Clean-Content Declaration on Merchant pages
- Silent platform — no badges/levels/public posts

## Design System (Feb 2026)
- **G5 GOLD** text → solid metallic gold gradient via `.g5-gold` CSS class
- **All numerals, $ amounts, Article Roman numerals** → witness-blue (`#3B82F6`) via `.wb-num` CSS class
- **Folded-map background** (`.folded-map`) on every page — paper-fold creases + parchment grain
- **Neon country outlines** (`<CountryOutline country=".." />`) — usa, canada, mexico, uk, brazil, italy, countryofchrist
- **Golden railroad-tie fence** (`<RailroadFence label=".." />`) framing top + bottom of each page
- **Silent platform** — Achievements page + badges/levels removed. No public posts allowed.
- **Advertiser Clean-Content Declaration** (`<AdvertiserDeclaration />`) — non-negotiable: no age-sensitive material, dating sites/apps, alcohol, cigarette, nudity. Citizen roster includes children 11+. Violators banned from auctions and donation participations indefinitely. Citizenship requirement: become G5 Citizen + accept G5 GOLD online and offline in all stores.

