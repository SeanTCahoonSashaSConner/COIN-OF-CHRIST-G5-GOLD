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

## Tech Stack
- **Frontend**: React + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Connection**: Transaction Pooler (IPv4)

## What's Been Implemented (Jan 27, 2026)

### Database (Supabase)
- ✅ `citizen_profiles` - name, age, ethnicity, gender, disciple_id, display_name
- ✅ `loyalty_ledger` - hours, balance, hourly_rate, pillar streaks, audio position
- ✅ `tivtek_tracking` - verification stats, weekly completion, sabbath tracking
- ✅ `good_samaritan_tasks` - Saturday task tracking with witness upload
- ✅ `sabbath_sessions` - Sunday 528 Hz participation
- ✅ `verification_log` - Atomic time ledger for all verifications

### Frontend
- ✅ Audio Player screen with mobile-first design
- ✅ Day mode detection (weekday/saturday/sunday)
- ✅ TIV-TEK verification cycle (20s countdown → 10s window → penalty at 31s)
- ✅ Slide-to-walk button with visual feedback
- ✅ Three Pillars dashboard (Verification, Samaritan, Sabbath streaks)
- ✅ G5 GOLD balance display
- ✅ Session timer tracking
- ✅ Penalty modal for failed verification
- ✅ Saturday Good Samaritan task flow
- ✅ Sunday Sabbath 18-minute session

## Prioritized Backlog

### P0 - Critical
- [ ] User registration/authentication flow
- [ ] Audio source integration (Bible.is API or hosted MP3s)
- [ ] Resume playback from last position

### P1 - High Priority
- [ ] Advertiser dashboard (public leaderboard)
- [ ] Closet/shop for spending G5 GOLD
- [ ] Witness upload with photo/video
- [ ] Push notifications for verification

### P2 - Medium Priority
- [ ] 528 Hz tone audio for Sabbath
- [ ] Weekly 33-hour completion tracking
- [ ] 90-day raise calculation automation
- [ ] Ad display during weekends

### P3 - Nice to Have
- [ ] Offline mode support (PWA)
- [ ] Social sharing
- [ ] Achievement badges

## Supabase Credentials
- URL: https://cwsgebsxbhvfnyzyjasy.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

## Next Tasks
1. Integrate actual Bible audio source
2. Build user registration flow
3. Add advertiser dashboard
4. Implement closet shopping experience
