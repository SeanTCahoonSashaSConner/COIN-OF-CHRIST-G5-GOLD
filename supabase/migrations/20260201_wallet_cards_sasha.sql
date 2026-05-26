-- ============================================================
-- COUNTRY OF CHRIST :: G5 WALLET CARD MAPPING + SASHA REGISTRATION
-- Paste into Supabase SQL Editor → Run
-- ============================================================

-- 1) Table mapping each citizen → their Pass2U wallet card
CREATE TABLE IF NOT EXISTS g5_wallet_cards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  disciple_id text UNIQUE NOT NULL,
  cardholder_name text NOT NULL,
  role text DEFAULT 'Citizen',
  is_cofounder boolean DEFAULT false,
  has_crown boolean DEFAULT false,
  pass2u_url text NOT NULL,
  card_design_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallet_cards_disciple ON g5_wallet_cards(disciple_id);

-- 2) RLS: anyone can read (the share URL is public by nature)
ALTER TABLE g5_wallet_cards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read wallet cards" ON g5_wallet_cards;
CREATE POLICY "read wallet cards" ON g5_wallet_cards FOR SELECT USING (true);

-- 3) Register Sasha Conner — Co-Founder
INSERT INTO g5_wallet_cards
  (disciple_id, cardholder_name, role, is_cofounder, has_crown, pass2u_url,
   card_design_notes)
VALUES (
  'g5-sash-15',
  'Sasha Conner',
  'Co-Founder',
  true,
  true,
  'https://www.pass2u.net/p/EcAU5Mn_73ar?openExternalBrowser=1',
  'Glitter gold background • Silver-glitter Sol note w/ black outline • Matte black typography silver-outlined • Black queen crown silver-outlined top-right • PDF417 barcode: Co Founder - Sasha Conner - g5-sash-15'
)
ON CONFLICT (disciple_id) DO UPDATE
  SET cardholder_name = EXCLUDED.cardholder_name,
      role            = EXCLUDED.role,
      is_cofounder    = EXCLUDED.is_cofounder,
      has_crown       = EXCLUDED.has_crown,
      pass2u_url      = EXCLUDED.pass2u_url,
      updated_at      = now();

-- 4) Mint Sasha's member_ledger row (auto-grant $429 G5 GOLD birthright)
INSERT INTO member_ledger
  (disciple_id, disciple_name, g5_gold_balance, freedom_status,
   total_lifetime_earned, last_drop_at)
VALUES
  ('g5-sash-15', 'Sasha Conner', 429.00, 'Co-Founder', 429.00, now())
ON CONFLICT (disciple_id) DO UPDATE
  SET disciple_name  = EXCLUDED.disciple_name,
      freedom_status = EXCLUDED.freedom_status,
      updated_at     = now();
