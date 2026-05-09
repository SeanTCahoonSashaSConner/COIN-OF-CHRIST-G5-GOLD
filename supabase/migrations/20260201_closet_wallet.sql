-- ============================================================
-- COUNTRY OF CHRIST :: CLOSET WALLET FOUNDATION
-- Paste into Supabase SQL Editor and click Run.
-- Pure native syntax — no extensions required.
-- ============================================================

-- 1) Member Ledger — citizen wallet (Closet-only redemption)
CREATE TABLE IF NOT EXISTS member_ledger (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  disciple_id text UNIQUE NOT NULL,
  disciple_name text,
  g5_gold_balance numeric(12,2) DEFAULT 0 CHECK (g5_gold_balance >= 0),
  freedom_status text DEFAULT 'New Citizen',
  total_lifetime_earned numeric(12,2) DEFAULT 0,
  total_lifetime_spent numeric(12,2) DEFAULT 0,
  last_drop_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_member_ledger_disciple ON member_ledger(disciple_id);

-- 2) Closet Catalog — merchant-donated inventory available in the Closet
CREATE TABLE IF NOT EXISTS closet_catalog (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  advertiser_id uuid REFERENCES advertisers(id) ON DELETE CASCADE,
  product_name text NOT NULL,
  product_image text,
  category text,
  price_g5_gold numeric(12,2) NOT NULL CHECK (price_g5_gold > 0),
  inventory_count int DEFAULT 0 CHECK (inventory_count >= 0),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_catalog_active ON closet_catalog(is_active, advertiser_id);

-- 3) Closet Orders — the ONLY venue where G5 GOLD may be spent
CREATE TABLE IF NOT EXISTS closet_orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  disciple_id text NOT NULL,
  catalog_item_id uuid REFERENCES closet_catalog(id),
  amount_g5_gold numeric(12,2) NOT NULL CHECK (amount_g5_gold > 0),
  redemption_venue text DEFAULT 'crypto_christian_closet'
    CHECK (redemption_venue = 'crypto_christian_closet'),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_disciple ON closet_orders(disciple_id);

-- 4) Auto-drop $429 G5 GOLD on new citizen
CREATE OR REPLACE FUNCTION grant_citizenship_drop()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO member_ledger
    (disciple_id, disciple_name, g5_gold_balance, freedom_status,
     total_lifetime_earned, last_drop_at)
  VALUES (NEW.disciple_id, NEW.display_name, 429.00, 'New Citizen',
          429.00, now())
  ON CONFLICT (disciple_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_grant_citizenship_drop ON citizen_profiles;
CREATE TRIGGER trg_grant_citizenship_drop
AFTER INSERT ON citizen_profiles
FOR EACH ROW EXECUTE FUNCTION grant_citizenship_drop();

-- 5) Debit ledger atomically when an order is placed
CREATE OR REPLACE FUNCTION debit_member_ledger()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE member_ledger
  SET g5_gold_balance      = g5_gold_balance - NEW.amount_g5_gold,
      total_lifetime_spent = total_lifetime_spent + NEW.amount_g5_gold,
      updated_at           = now()
  WHERE disciple_id = NEW.disciple_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No member_ledger row for disciple %', NEW.disciple_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_debit_member_ledger ON closet_orders;
CREATE TRIGGER trg_debit_member_ledger
AFTER INSERT ON closet_orders
FOR EACH ROW EXECUTE FUNCTION debit_member_ledger();

-- 6) Backfill existing citizens with their $429 drop (one-time, idempotent)
INSERT INTO member_ledger
  (disciple_id, disciple_name, g5_gold_balance, freedom_status,
   total_lifetime_earned, last_drop_at)
SELECT disciple_id, display_name, 429.00, 'New Citizen', 429.00, now()
FROM citizen_profiles
ON CONFLICT (disciple_id) DO NOTHING;

-- 7) RLS — citizens read their own ledger, public reads active catalog
ALTER TABLE member_ledger   ENABLE ROW LEVEL SECURITY;
ALTER TABLE closet_catalog  ENABLE ROW LEVEL SECURITY;
ALTER TABLE closet_orders   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read ledger"  ON member_ledger;
DROP POLICY IF EXISTS "read catalog" ON closet_catalog;
DROP POLICY IF EXISTS "read orders"  ON closet_orders;
DROP POLICY IF EXISTS "place orders" ON closet_orders;

CREATE POLICY "read ledger"  ON member_ledger  FOR SELECT USING (true);
CREATE POLICY "read catalog" ON closet_catalog FOR SELECT USING (is_active = true);
CREATE POLICY "read orders"  ON closet_orders  FOR SELECT USING (true);
CREATE POLICY "place orders" ON closet_orders  FOR INSERT WITH CHECK (true);
