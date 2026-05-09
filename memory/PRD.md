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

## Routes
- `/` - Audio Player (citizen app)
- `/merchants` - Merchant Transparency Ledger (advertiser dashboard)
- `/constitution` - G5 Sovereign Constitution & Merchant Covenant
- `/witness-jury` - Witness Jury Protocol
- `/debt-exile` - Debt Exile Notice / Fiscal Journey

## Next Tasks (priority order)
1. **C2C / Crypto Christian Network mailing system** — BLOCKED: user's SQL didn't actually run in Supabase. User needs to re-run, then we wire frontend (verified cove directory view, covenant hub flag/capacity, c2c_routing_code, covenators/covenettes rosters)
2. **Crypto Christian Closet** physical/digital marketplace + closet account balance (incl. $429.00 G5 GOLD initial drop)
3. Integrate actual KJV Bible audio source (currently a timer placeholder)
4. Solana wallet integration for blockchain tracking (currently UI-only)
5. Advertiser registration portal with Covenant signing ceremony (digital signature with .sol wallet)

## Design System (Feb 2026)
- **G5 GOLD** text → solid metallic gold gradient via `.g5-gold` CSS class
- **All numerals, $ amounts, Article Roman numerals** → witness-blue (`#3B82F6`) via `.wb-num` CSS class
- **Folded-map background** (`.folded-map`) on every page — paper-fold creases + parchment grain
- **Neon country outlines** (`<CountryOutline country=".." />`) — usa, canada, mexico, uk, brazil, italy, countryofchrist
- **Golden railroad-tie fence** (`<RailroadFence label=".." />`) framing top + bottom of each page
- **Silent platform** — Achievements page + badges/levels removed. No public posts allowed.
- **Advertiser Clean-Content Declaration** (`<AdvertiserDeclaration />`) — non-negotiable: no age-sensitive material, dating sites/apps, alcohol, cigarette, nudity. Citizen roster includes children 11+. Violators banned from auctions and donation participations indefinitely. Citizenship requirement: become G5 Citizen + accept G5 GOLD online and offline in all stores.

