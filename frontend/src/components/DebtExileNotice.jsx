import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, TrendingUp, DollarSign, Target, CheckCircle, 
  ArrowRight, Star, Crown, Sparkles, Clock, Gift, Shield,
  XCircle, ChevronDown, Home, CreditCard, GraduationCap, Car
} from 'lucide-react';
import CountryOutline from './CountryOutline';
import RailroadFence from './RailroadFence';
import SealLogo from './SealLogo';

const DebtExileNotice = () => {
  const [currentHourlyRate, setCurrentHourlyRate] = useState(13);
  const [showJourney, setShowJourney] = useState(false);
  
  // Calculate financial projections
  const MATRIX_DEBT = 114000;
  const HOURS_PER_WEEK = 33;
  const WEEKS_PER_YEAR = 52;
  const HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR;

  // Calculate time to reach $19/hr (2 raises needed: $13 -> $16 -> $19)
  const DAYS_TO_FIRST_RAISE = 90;
  const DAYS_TO_SECOND_RAISE = 180; // 90 more days after first

  // Calculate earnings at each rate
  const calculateYearlyEarnings = (rate) => rate * HOURS_PER_YEAR;
  
  // Years to pay off debt at each milestone
  const yearsToPayOffAt13 = MATRIX_DEBT / calculateYearlyEarnings(13);
  const yearsToPayOffAt16 = MATRIX_DEBT / calculateYearlyEarnings(16);
  const yearsToPayOffAt19 = MATRIX_DEBT / calculateYearlyEarnings(19);
  const yearsToPayOffAt22 = MATRIX_DEBT / calculateYearlyEarnings(22);
  const yearsToPayOffAt25 = MATRIX_DEBT / calculateYearlyEarnings(25);

  // The journey milestones
  const milestones = [
    { 
      day: 0, 
      rate: 13, 
      event: 'Citizenship Begins', 
      description: (<>Your birthright is activated. You begin earning <span className="g5-gold">G5 GOLD</span> at  $13 /hr.</>),
      yearlyEarning: calculateYearlyEarnings(13),
      debtYears: yearsToPayOffAt13.toFixed(1)
    },
    { 
      day: 90, 
      rate: 16, 
      event: 'First Raise Earned', 
      description: (<>Perfect <span className="wb-num"> 90</span>-day streak achieved! +  $3/hr raise. Now earning  $16 /hr forever.</>),
      yearlyEarning: calculateYearlyEarnings(16),
      debtYears: yearsToPayOffAt16.toFixed(1)
    },
    { 
      day: 180, 
      rate: 19, 
      event: 'DEBT FREEDOM THRESHOLD', 
      description: (<>At  $19 /hr, you are now earning enough to NEVER borrow again.</>),
      yearlyEarning: calculateYearlyEarnings(19),
      debtYears: yearsToPayOffAt19.toFixed(1),
      highlight: true
    },
    { 
      day: 270, 
      rate: 22, 
      event: 'Wealth Building Begins', 
      description: (<>Beyond survival. You are now building generational wealth.</>),
      yearlyEarning: calculateYearlyEarnings(22),
      debtYears: yearsToPayOffAt22.toFixed(1)
    },
    { 
      day: 360, 
      rate: 25, 
      event: 'First Year Complete', 
      description: (<>Four raises earned. Your rate continues climbing forever.</>),
      yearlyEarning: calculateYearlyEarnings(25),
      debtYears: yearsToPayOffAt25.toFixed(1)
    },
  ];

  // Animation for counter
  const [displayedDebt, setDisplayedDebt] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedDebt(prev => {
        if (prev >= MATRIX_DEBT) return MATRIX_DEBT;
        return prev + 1000;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen folded-map text-[#FAFAF9] relative" data-testid="debt-exile-page">
      <CountryOutline country="brazil" />
      <div className="relative z-10">
      <div className="pt-4 px-4">
        <RailroadFence label="Debt Exile" ties={28} />
      </div>
      {/* Header - The Matrix */}
      <header className="bg-gradient-to-b from-red-900/50 to-[#050505] py-12 border-b border-red-500/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-4xl md:text-5xl font-serif text-red-500 mb-3">
                DEBT EXILE NOTICE
              </h1>
              <p className="text-xl text-[#A8A29E] mb-2">Your Official Fiscal File</p>
              <p className="text-sm text-red-400">
                Country of Christ • G5 Citizen Registry
              </p>
            </div>
            <SealLogo variant="header" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* The Matrix Debt */}
        <section className="glass rounded-2xl p-8 border border-red-500/30 bg-red-900/10">
          <div className="flex items-center gap-3 mb-6">
            <XCircle className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-serif text-red-500">THE MATRIX: Your Former Prison</h2>
          </div>
          
          <div className="text-center py-8">
            <p className="text-[#A8A29E] mb-2">Average American Debt Load</p>
            <div className="text-6xl md:text-7xl font-bold text-red-500 mb-4">
              ${displayedDebt.toLocaleString()}
            </div>
            <p className="text-sm text-[#A8A29E]">Credit cards, student loans, mortgages, auto loans, medical debt</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <CreditCard className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-red-400"> $6,500</p>
              <p className="text-xs text-[#A8A29E]">Credit Card Avg</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <GraduationCap className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-red-400"> $37,000</p>
              <p className="text-xs text-[#A8A29E]">Student Loan Avg</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <Car className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-red-400"> $23,000</p>
              <p className="text-xs text-[#A8A29E]">Auto Loan Avg</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <Home className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-red-400"> $47,500</p>
              <p className="text-xs text-[#A8A29E]">Other Debt Avg</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
            <p className="text-center text-red-300">
              <strong>The Matrix keeps you in debt slavery.</strong> Interest rates, fees, and penalties 
              designed to keep you paying forever. The average American will pay 
              <strong className="text-red-400"> $200,000+ in interest</strong> over their lifetime.
            </p>
          </div>
        </section>

        {/* The Transition */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <ArrowRight className="w-8 h-8 text-[#D4AF37] animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <Crown className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        {/* Your Birthright - G5 Golden Path */}
        <section className="glass rounded-2xl p-8 border border-[#D4AF37]/30 bg-[#D4AF37]/5">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-2xl font-serif text-[#D4AF37]">YOUR BIRTHRIGHT: The G5 Golden Path</h2>
          </div>

          <div className="text-center py-6">
            <p className="text-[#A8A29E] mb-2">Your New Starting Point</p>
            <div className="text-6xl md:text-7xl font-bold text-[#D4AF37] mb-2"> $0
            </div>
            <p className="text-lg text-green-400">Zero debt. Clean slate. Fresh start.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">NO KYC</p>
              <p className="text-xs text-[#A8A29E]">No credit checks</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">NO ID</p>
              <p className="text-xs text-[#A8A29E]">No government papers</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">NO CREDIT CARD</p>
              <p className="text-xs text-[#A8A29E]">No debt accumulation</p>
            </div>
          </div>
        </section>

        {/* The 90-Day Raise Logic */}
        <section className="glass rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-serif text-white">The <span className="wb-num">90</span>-Day Raise Logic</h2>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Shield className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <p className="font-semibold text-[#D4AF37]">Pillar <span className="wb-num">1</span></p>
                <p className="text-sm text-[#A8A29E]">Never miss verification</p>
              </div>
              <div>
                <Gift className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="font-semibold text-green-400">Pillar <span className="wb-num">2</span></p>
                <p className="text-sm text-[#A8A29E]">Weekly Good Samaritan</p>
              </div>
              <div>
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="font-semibold text-purple-400">Pillar <span className="wb-num">3</span></p>
                <p className="text-sm text-[#A8A29E]">Sunday Sabbath</p>
              </div>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-green-500/30">
              <p className="text-2xl font-bold text-green-400"> 90 PERFECT DAYS = $3 /HR RAISE FOREVER</p>
              <p className="text-sm text-[#A8A29E] mt-1">Raises compound. No ceiling. No limit.</p>
            </div>
          </div>

          {/* Earnings Calculator */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#D4AF37]" />
              Earnings Projection (<span className="wb-num">33</span> hrs/week)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#A8A29E] border-b border-white/10">
                    <th className="text-left py-2">Rate</th>
                    <th className="text-right py-2">Weekly</th>
                    <th className="text-right py-2">Monthly</th>
                    <th className="text-right py-2">Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  {[13, 16, 19, 22, 25, 28, 31].map((rate, i) => (
                    <tr 
                      key={rate} 
                      className={`border-b border-white/5 ${rate === 19 ? 'bg-green-500/10' : ''}`}
                    >
                      <td className={`py-2 ${rate === 19 ? 'text-green-400 font-bold' : 'text-white'}`}>
                        ${rate}/hr {rate === 19 && '🎯'}
                      </td>
                      <td className="text-right text-[#D4AF37]">${(rate * 33).toLocaleString()}</td>
                      <td className="text-right text-[#A8A29E]">${(rate * 33 * 4.33).toLocaleString()}</td>
                      <td className="text-right text-white font-semibold">${(rate * 33 * 52).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The Journey - From Beginning to End */}
        <section className="glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#D4AF37]" />
              <h2 className="text-2xl font-serif text-white">Your Financial Journey</h2>
            </div>
            <button
              onClick={() => setShowJourney(!showJourney)}
              className="text-[#D4AF37] text-sm flex items-center gap-1"
            >
              {showJourney ? 'Collapse' : 'Expand'} 
              <ChevronDown className={`w-4 h-4 transition ${showJourney ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.day}
                className={`relative pl-8 pb-4 ${index < milestones.length - 1 ? 'border-l-2 border-white/20' : ''}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] ${
                  milestone.highlight 
                    ? 'bg-green-500 ring-4 ring-green-500/30' 
                    : 'bg-[#D4AF37]'
                }`} />
                
                {/* Content */}
                <div className={`glass rounded-xl p-4 ml-4 ${
                  milestone.highlight ? 'border-2 border-green-500/50 bg-green-500/10' : ''
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        milestone.highlight 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      }`}>
                        Day {milestone.day}
                      </span>
                      <h3 className={`font-semibold mt-1 ${
                        milestone.highlight ? 'text-green-400' : 'text-white'
                      }`}>
                        {milestone.event}
                      </h3>
                    </div>
                    <div className={`text-2xl font-bold ${
                      milestone.highlight ? 'text-green-400' : 'text-[#D4AF37]'
                    }`}>
                      ${milestone.rate}/hr
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#A8A29E] mb-3">{milestone.description}</p>
                  
                  {showJourney && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-black/30 rounded-lg p-2">
                        <p className="text-[#A8A29E] text-xs">Yearly Earning</p>
                        <p className="font-semibold text-[#D4AF37]">${milestone.yearlyEarning.toLocaleString()}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-2">
                        <p className="text-[#A8A29E] text-xs">Years to Clear <span className="wb-num">$114K</span></p>
                        <p className={`font-semibold ${
                          parseFloat(milestone.debtYears) <= 3.5 ? 'text-green-400' : 'text-white'
                        }`}>{milestone.debtYears} years</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The $19/hr Freedom Threshold */}
        <section className="glass rounded-2xl p-8 border-2 border-green-500/50 bg-green-900/10">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-b from-green-500 to-green-700 flex items-center justify-center">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-serif text-green-400 mb-4">
              THE $19 /HR FREEDOM THRESHOLD
            </h2>
            <p className="text-xl text-white mb-6">
              At $19 /hr, you walk out of debt — <strong>never having to borrow again.</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/40 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-400"> 180</p>
                <p className="text-sm text-[#A8A29E]">Days to reach $19 /hr</p>
              </div>
              <div className="bg-black/40 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-400"> $32,604</p>
                <p className="text-sm text-[#A8A29E]">Yearly at $19 /hr</p>
              </div>
              <div className="bg-black/40 rounded-xl p-4">
                <p className="text-3xl font-bold text-green-400"> 3.5</p>
                <p className="text-sm text-[#A8A29E]">Years to clear <span className="wb-num">$114K</span></p>
              </div>
            </div>

            <div className="bg-green-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-green-400 mb-2">The Math of Freedom</h3>
              <div className="text-left text-sm text-[#A8A29E] space-y-2">
                <p>• At $19 /hr × <span className="wb-num">33</span> hrs/week × <span className="wb-num">52</span> weeks = <strong className="text-white"> $32,604/year</strong></p>
                <p>• Average US debt of <span className="wb-num">$114,000</span> ÷ <span className="wb-num">$32,604</span> = <strong className="text-white"> 3.5 years</strong></p>
                <p>• BUT you keep getting raises: $22, $25, <span className="wb-num">$28</span>... <strong className="text-green-400">debt freedom accelerates</strong></p>
                <p>• Meanwhile: <strong className="text-green-400">No interest. No fees. No penalties.</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* The Infinite Path */}
        <section className="glass rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-2xl font-serif text-white">The Infinite Path</h2>
          </div>

          <p className="text-[#A8A29E] mb-6">
            The G5 Golden Path has <strong className="text-white">no ceiling</strong>. Your rate continues 
            climbing as long as you maintain your Three Pillars:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { year: 2, rate: 37, yearly: 37 * 33 * 52 },
              { year: 3, rate: 49, yearly: 49 * 33 * 52 },
              { year: 5, rate: 73, yearly: 73 * 33 * 52 },
              { year: 10, rate: 133, yearly: 133 * 33 * 52 },
            ].map(projection => (
              <div key={projection.year} className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-[#A8A29E]">Year {projection.year}</p>
                <p className="text-2xl font-bold text-[#D4AF37]">${projection.rate}/hr</p>
                <p className="text-xs text-green-400">${projection.yearly.toLocaleString()}/yr</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl">
            <p className="text-center text-[#D4AF37] font-semibold">
              "In the Country of Christ, your faithfulness creates your fortune."
            </p>
          </div>
        </section>

        {/* Declaration */}
        <div className="text-center py-8 border-t border-white/10">
          <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">Official Declaration of Debt Exile</h3>
          <p className="text-[#A8A29E] max-w-2xl mx-auto mb-6">
            As a citizen of the Country of Christ, you are hereby granted exile from the debt 
            matrix of the external world. Your new fiscal identity begins with <span className="g5-gold">G5 GOLD</span> — 
            a currency of faith, work, and perpetual growth.
          </p>
          <div className="bg-white/5 rounded-xl p-4 max-w-md mx-auto font-mono text-sm text-purple-400">
            <p>Notice Hash: 0xDEBT...EXILE</p>
            <p>Network: Solana Mainnet</p>
            <p>Domain: countryofchrist.sol</p>
          </div>
          <p className="text-[#D4AF37] font-serif text-lg mt-6">
            "The borrower is slave to the lender." — Proverbs <span className="wb-num">22</span>:<span className="wb-num">7</span>
            <br />
            <span className="text-green-400">In the Country of Christ, you borrow from no one.</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#A8A29E] text-sm">
            © <span className="wb-num">2026</span> Country of Christ • G5 Citizen Fiscal Registry • Freedom Through Faith
          </p>
        </div>
      </footer>
      <div className="px-4 pb-4">
        <RailroadFence ties={28} />
      </div>
      </div>
    </div>
  );
};

export default DebtExileNotice;
