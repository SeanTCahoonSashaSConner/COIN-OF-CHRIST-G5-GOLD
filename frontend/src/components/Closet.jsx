import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Coins, Package, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SealLogo from './SealLogo';
import RailroadFence from './RailroadFence';
import MOCK_REWARDS from './mockRewards';

/**
 * The Crown of Christ — the SOLE venue where G5 GOLD is redeemed.
 * Wired to: member_ledger, closet_catalog, closet_orders (Supabase).
 *
 * Citizens see their G5 GOLD balance, browse merchant-donated inventory,
 * and redeem items in-Closet. Database constraint enforces Closet-only
 * redemption (no off-Closet spending allowed).
 */
const Closet = () => {
  const [balance, setBalance] = useState(0);
  const [discipleId, setDiscipleId] = useState(null);
  const [discipleName, setDiscipleName] = useState('Citizen');
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const { data: ledger } = await supabase
        .from('member_ledger')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (ledger) {
        setBalance(parseFloat(ledger.g5_gold_balance) || 0);
        setDiscipleId(ledger.disciple_id);
        setDiscipleName(ledger.disciple_name || 'Citizen');
      }

      const { data: items } = await supabase
        .from('closet_catalog')
        .select('*, advertisers(business_name)')
        .eq('is_active', true)
        .gt('inventory_count', 0)
        .order('price_g5_gold', { ascending: true });

      if (items && items.length > 0) {
        setCatalog(items);
      } else {
        // Fallback: mock rewards catalog for frontend-only redemption sim
        setCatalog(MOCK_REWARDS);
      }
    } catch (err) {
      console.error('Closet fetch error:', err);
      setCatalog(MOCK_REWARDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRedeem = async (item) => {
    if (balance < parseFloat(item.price_g5_gold)) {
      setMessage({ type: 'error', text: 'Insufficient G5 GOLD balance.' });
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    setRedeeming(item.id);

    // Frontend-only simulation for mock rewards (from mockRewards.js)
    if (item.mock) {
      setTimeout(() => {
        setBalance((prev) => +(prev - parseFloat(item.price_g5_gold)).toFixed(2));
        setMessage({
          type: 'success',
          text: `Redeemed: ${item.product_name} — $${parseFloat(item.price_g5_gold).toFixed(2)} G5 GOLD deducted`,
        });
        setRedeeming(null);
        setTimeout(() => setMessage(null), 4000);
      }, 400);
      return;
    }

    // Real catalog path — hits Supabase closet_orders (DB trigger auto-debits ledger)
    if (!discipleId) {
      setMessage({ type: 'error', text: 'No citizen profile found. Please link your account first.' });
      setRedeeming(null);
      setTimeout(() => setMessage(null), 4000);
      return;
    }
    try {
      const { error } = await supabase.from('closet_orders').insert({
        disciple_id: discipleId,
        catalog_item_id: item.id,
        amount_g5_gold: parseFloat(item.price_g5_gold),
      });

      if (error) throw error;

      setMessage({ type: 'success', text: `Redeemed: ${item.product_name}` });
      await fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Redemption failed' });
    } finally {
      setRedeeming(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAF9]" data-testid="closet-page">
      <div className="pt-4 px-4">
        <RailroadFence label="THE CROWN OF CHRIST · Fit for a King" ties={28} />
      </div>

      {/* ============ HEADER ============ */}
      <header className="py-10 border-b border-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <SealLogo variant="hero" withCaption={true} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-2 mt-6">
            THE CROWN OF CHRIST
          </h1>
          <p
            className="text-sm md:text-base tracking-[0.4em] uppercase mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              background: 'linear-gradient(180deg,#FFF1A8 0%,#FFE066 30%,#F5C842 60%,#D4AF37 90%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
            }}
            data-testid="fit-for-a-king-slogan"
          >
            Fit for a King
        amount_g5_gold: parseFloat(item.price_g5_gold),
      });

      if (error) throw error;

      setMessage({ type: 'success', text: `Successfully ordered ${item.product_name}!` });
    } catch (err) {
      console.error('Order error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to place order.' });
    } finally {
      setRedeeming(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-amber-50 rounded-xl shadow-md space-y-4 border border-amber-200">
      <h1 className="text-2xl font-bold text-amber-900">The Crown of Christ - Fit For a King</h1>
      <p className="text-amber-700">Your G5 GOLD balance: <span className="font-bold">{balance}</span></p>
      {message && <div className={`p-3 rounded text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message.text}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {catalog.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow border border-amber-100 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg text-amber-950">{item.product_name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-amber-800 font-bold mt-2">{item.price_g5_gold} G5 GOLD</p>
            </div>
            <button 
              onClick={() => handleRedeem(item)} 
              disabled={redeeming !== null || loading}
              className="mt-4 w-full bg-amber-600 text-white py-2 rounded-md font-medium hover:bg-amber-700 transition disabled:opacity-50"
            >
              {redeeming === item.id ? 'Redeeming...' : 'Redeem Item'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet;
