/**
 * Mock reward catalog for THE CROWN OF CHRIST.
 * Frontend-only fallback used when Supabase catalog is empty.
 *
 * Data shape mirrors what a real retail/gift-card rewards network
 * (e.g. Tango Card, Rybbon, Tremendous) returns, so once we wire
 * a real network we just swap the `MOCK_REWARDS` import for a
 * network fetch — every downstream component keeps working.
 *
 * Fields:
 *   id           string  — unique reward id
 *   product_name string  — display name
 *   category     string  — retail category (Gift Card, Apparel, Digital, etc.)
 *   price_g5_gold number  — G5 GOLD point cost
 *   inventory_count number — how many left
 *   product_image string  — optional image url
 *   provider     string  — name of the rewards network
 *   mock         boolean — TRUE means frontend-only simulation
 */

const MOCK_REWARDS = [
  {
    id: 'mock-amzn-10',
    product_name: 'Amazon Gift Card',
    category: 'Gift Card',
    price_g5_gold: 10.00,
    inventory_count: 999,
    provider: 'Retail Network',
    mock: true,
  },
  {
    id: 'mock-tgt-25',
    product_name: 'Target Gift Card',
    category: 'Gift Card',
    price_g5_gold: 25.00,
    inventory_count: 999,
    provider: 'Retail Network',
    mock: true,
  },
  {
    id: 'mock-wm-50',
    product_name: 'Walmart Gift Card',
    category: 'Gift Card',
    price_g5_gold: 50.00,
    inventory_count: 999,
    provider: 'Retail Network',
    mock: true,
  },
  {
    id: 'mock-nike-75',
    product_name: 'Nike Store Credit',
    category: 'Apparel',
    price_g5_gold: 75.00,
    inventory_count: 200,
    provider: 'Retail Network',
    mock: true,
  },
  {
    id: 'mock-cfa-15',
    product_name: 'Chick-fil-A eGift',
    category: 'Restaurant',
    price_g5_gold: 15.00,
    inventory_count: 999,
    provider: 'Digital Network',
    mock: true,
  },
  {
    id: 'mock-star-25',
    product_name: 'Starbucks eGift',
    category: 'Restaurant',
    price_g5_gold: 25.00,
    inventory_count: 999,
    provider: 'Digital Network',
    mock: true,
  },
  {
    id: 'mock-hd-100',
    product_name: 'Home Depot Voucher',
    category: 'Home & Hardware',
    price_g5_gold: 100.00,
    inventory_count: 120,
    provider: 'Retail Network',
    mock: true,
  },
  {
    id: 'mock-vs-50',
    product_name: 'Visa Prepaid Voucher',
    category: 'Cash Card',
    price_g5_gold: 50.00,
    inventory_count: 500,
    provider: 'Cash Network',
    mock: true,
  },
];

export default MOCK_REWARDS;
