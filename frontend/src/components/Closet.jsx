import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Coins, Package, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SealLogo from './SealLogo';
import RailroadFence from './RailroadFence';

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

      if (items) setCatalog(items);
    } catch (err) {
      console.error('Closet fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRedeem = async (item) => {
    if (!discipleId) {
      setMessage({ type: 'error', text: 'No citizen profile found. Please link your account first.' });
      return;
    }
    if (balance < parseFloat(item.price_g5_gold)) {
      setMessage({ type: 'error', text: 'Insufficient G5 GOLD balance.' });
      return;
    }

    setRedeeming(item.id);
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
          </p>
          <p className="text-[#A8A29E] max-w-2xl mx-auto">
            The <strong className="text-white">sole venue</strong> for redeeming{' '}
            <span className="g5-gold">G5 GOLD</span>. Walled garden by design — citizens
            spend exclusively here, merchants compete to be on the shelves.
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#3B82F6] mt-4 font-mono">
            countryofchrist.sol/closet
          </p>
        </div>
      </header>

      {/* ============ WALLET CARD ============ */}
      <section className="max-w-5xl mx-auto px-6 pt-8" data-testid="closet-wallet-card">
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1408] via-[#0d0d0d] to-[#1a1408] border-2 border-[#D4AF37] p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(212,175,55,0.5), transparent 60%)' }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl bg-[#D4AF37] flex items-center justify-center"
                   style={{ boxShadow: '0 0 24px rgba(212,175,55,0.7)' }}>
                <Coins className="w-9 h-9 text-black" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E]">
                  G5 Citizen
                </p>
                <p className="text-xl font-serif text-white">{discipleName}</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#3B82F6] mt-1">
                  Closet-Only Redemption
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E] mb-1">
                <span className="g5-gold">G5 GOLD</span> Balance
              </p>
              <p className="text-5xl md:text-6xl font-serif text-[#D4AF37]" data-testid="closet-balance"
                 style={{ textShadow: '0 0 24px rgba(212,175,55,0.55)' }}>
                <span className="wb-num">${balance.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div className="relative mt-6 pt-5 border-t border-[#D4AF37]/20 flex items-center gap-2 text-xs text-[#A8A29E]">
            <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
            New citizens receive <strong className="text-white">&nbsp;<span className="wb-num">$429</span>&nbsp;<span className="g5-gold">G5 GOLD</span>&nbsp;</strong> on Day 1 — redeemable only inside this Closet.
          </div>
        </div>
      </section>

      {/* ============ MESSAGE TOAST ============ */}
      {message && (
        <div className={`max-w-5xl mx-auto px-6 mt-4 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          <div className={`rounded-xl px-4 py-3 border ${
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          } flex items-center gap-2`} data-testid="closet-message">
            <AlertCircle className="w-4 h-4" />
            {message.text}
          </div>
        </div>
      )}

      {/* ============ CATALOG ============ */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-[#D4AF37] flex items-center gap-2">
            <Package className="w-6 h-6" />
            Closet Catalog
          </h2>
          <span className="text-xs text-[#A8A29E]">
            <span className="wb-num">{catalog.length}</span> items live
          </span>
        </div>

        {loading ? (
          <p className="text-center text-[#A8A29E] py-12">Loading Closet…</p>
        ) : catalog.length === 0 ? (
          <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-10 text-center" data-testid="empty-catalog">
            <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">The Closet awaits its first merchants</h3>
            <p className="text-sm text-[#A8A29E] max-w-md mx-auto">
              Once advertisers begin donating inventory to the Closet catalog, their goods
              will appear here for <span className="g5-gold">G5 GOLD</span> redemption.
              <br /><br />
              The walled garden is open — advertisers, take your seat at the table.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="catalog-grid">
            {catalog.map((item) => {
              const canAfford = balance >= parseFloat(item.price_g5_gold);
              const isRedeeming = redeeming === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] overflow-hidden hover:border-[#D4AF37]/50 transition"
                  data-testid={`catalog-item-${item.id}`}
                >
                  <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {item.product_image ? (
                      <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                    ) : (
                      <Sparkles className="w-12 h-12 text-[#D4AF37]/40" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8A29E]">
                      {item.category || 'Item'}
                    </p>
                    <h3 className="font-serif text-lg text-white mt-1 line-clamp-1">
                      {item.product_name}
                    </h3>
                    {item.advertisers?.business_name && (
                      <p className="text-xs text-[#3B82F6] mt-0.5">
                        Donated by {item.advertisers.business_name}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-[#D4AF37]">
                        <span className="wb-num">${parseFloat(item.price_g5_gold).toFixed(2)}</span>
                      </p>
                      <p className="text-xs text-[#A8A29E]">
                        <span className="wb-num">{item.inventory_count}</span> left
                      </p>
                    </div>
                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford || isRedeeming}
                      className={`w-full mt-3 py-2.5 rounded-xl font-bold text-sm transition ${
                        canAfford
                          ? 'bg-[#D4AF37] text-black hover:bg-[#FFE066]'
                          : 'bg-[#1a1a1a] text-[#5a5a5a] cursor-not-allowed'
                      }`}
                      data-testid={`redeem-${item.id}`}
                    >
                      {isRedeeming ? 'Redeeming…' : canAfford ? 'Redeem' : 'Need more G5 GOLD'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs text-[#A8A29E]">
          <p>The Crown of Christ · countryofchrist.sol · Walled-garden redemption</p>
        </div>
      </footer>
      <div className="px-4 pb-4">
        <RailroadFence ties={28} />
      </div>
    </div>
  );
};

export default Closet;
