import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Coins, Package, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SeaLogo from './SeaLogo';
import RailroadFence from './railroadfence';
import MOCK_REWARDS from './mockrewards';



/**
 * The Crown of Christ - the SOLE venue where G5 GOLD is redeemed.
 * Wired to: member_ledger, closet_catalog, closet_orders (Supabase).
 * 
 * Citizens see their G5 GOLD balance, browse merchant-donated inventory,
 * and redeem items in Closet. Database constraint enforces Closet-only
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
        // Fallback: mock rewards catalog for frontend-only redemption show
        setCatalog(MOCK_REWARDS);
      }
    } catch (err) {
      console.error('Closet fetch error:', err);
      setCatalog(MOCK_REWARDS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRedeem = async (item) => {
    if (balance < parseFloat(item.price_g5_gold)) {
      setMessage({ type: 'error', text: 'Insufficient G5 GOLD balance. Please update your ledger.' });
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    setRedeeming(item.id);

    // Frontend-only simulation for mock rewards
    if (item.mock) {
      setTimeout(() => {
        setBalance((prev) => +(prev - parseFloat(item.price_g5_gold)).toFixed(2));
        setMessage({
          type: 'success',
          text: `Redeemed: ${item.product_name} – $${parseFloat(item.price_g5_gold).toFixed(2)} G5 GOLD deducted.`
        });
        setRedeeming(null);
        setTimeout(() => setMessage(null), 4000);
      }, 400);
      return;
    }

    // Real catalog path - hits Supabase closet_orders
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

      setMessage({ type: 'success', text: `Successfully ordered ${item.product_name}!` });
      fetchData(); // Refresh metrics after purchase
    } catch (err) {
      console.error('Order error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to place order.' });
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-200 fabric-page">
      <RailroadFence label="THE CROWN OF CHRIST - Fit For a King" lines={2} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="pb-10 border-b border-[#1e232d]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <SeaLogo variant="hero" width={90} className="text-amber-500 animate-pulse-slow" />
              <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 tracking-tight style={{ fontFamily: 'Cinzel, serif' }}">
                  THE CROWN OF CHRIST
                </h1>
                <p className="text-sm md:text-base text-amber-500/80 font-medium uppercase tracking-wider mt-1">
                  Fit For a King • G5 GOLD Sovereign Venue
                </p>
              </div>
            </div>
            
            {/* User Card */}
            <div className="w-full md:w-auto bg-[#131722]/80 border border-amber-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 rounded-xl border border-amber-500/20">
                <Coins className="h-8 w-8 text-amber-400 animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Citizen Identity</div>
                <div className="text-lg font-bold text-gray-100 mt-0.5">{discipleName}</div>
                <div className="flex items-center gap-1.5 mt-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 w-fit">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs font-extrabold text-amber-400 tracking-wide">{balance} G5 GOLD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Messages banner */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 animate-fade-in ${
            message.type === 'error' 
              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
              : 'bg-green-500/10 border-green-500/20 text-green-400'
          }`}>
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Catalog Grid View */}
        <main className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-100 tracking-wide">Available Sacred Offerings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalog.map((item) => (
              <div key={item.id} className="group bg-[#11141c]/90 border border-[#1e2433] rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/5">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-lg text-gray-100 group-hover:text-amber-400 transition-colors">
                      {item.product_name}
                    </h3>
                    <div className="p-2 bg-[#181d2a] rounded-lg border border-[#242b3d]">
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {item.description || 'No description provided for this royal artifact.'}
                  </p>
                  
                  {item.advertisers?.business_name && (
                    <div className="text-xs font-semibold text-amber-500/60 uppercase mt-3 tracking-wider">
                      Merchant: {item.advertisers.business_name}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1e2433]/50 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Redemption Cost</div>
                    <div className="text-xl font-black text-amber-400 tracking-wide mt-0.5">
                      {parseFloat(item.price_g5_gold).toLocaleString()} <span className="text-xs font-bold text-amber-500/80">G5</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={redeeming !== null}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 font-extrabold text-sm rounded-xl hover:from-amber-500 hover:to-yellow-400 shadow-lg shadow-amber-600/10 hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    {redeeming === item.id ? 'Processing...' : 'Redeem'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Closet;
