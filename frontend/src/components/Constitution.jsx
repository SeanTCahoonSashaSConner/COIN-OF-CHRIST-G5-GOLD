import React, { useState } from 'react';
import { 
  ScrollText, Shield, Crown, Users, Coins, Globe, Eye, 
  CheckCircle, FileText, Scale, Heart, ChevronDown, ChevronUp,
  BookOpen, Lock, Handshake, Star, Zap, MapPin, Clock
} from 'lucide-react';

const Constitution = () => {
  const [expandedSection, setExpandedSection] = useState('preamble');
  const [activeTab, setActiveTab] = useState('constitution');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAF9]" data-testid="constitution-page">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#1a1a1a] to-[#050505] py-12 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-b from-[#D4AF37] to-[#8B6914] flex items-center justify-center">
            <ScrollText className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4">
            The G5 Sovereign Constitution
          </h1>
          <p className="text-xl text-[#A8A29E] mb-2">Country of Christ</p>
          <p className="text-sm text-[#A8A29E]">
            Built by the People • For the People • For All Entities
          </p>
          <p className="text-xs text-purple-400 mt-4 font-mono">
            Ratified on the Solana Blockchain • countryofchrist.sol
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('constitution')}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'constitution' 
                  ? 'border-[#D4AF37] text-[#D4AF37]' 
                  : 'border-transparent text-[#A8A29E] hover:text-white'
              }`}
            >
              <ScrollText className="w-4 h-4 inline mr-2" />
              Constitution
            </button>
            <button
              onClick={() => setActiveTab('covenant')}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'covenant' 
                  ? 'border-[#D4AF37] text-[#D4AF37]' 
                  : 'border-transparent text-[#A8A29E] hover:text-white'
              }`}
            >
              <Handshake className="w-4 h-4 inline mr-2" />
              Merchant Covenant
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* CONSTITUTION TAB */}
        {activeTab === 'constitution' && (
          <div className="space-y-6">
            
            {/* Preamble */}
            <section className="glass rounded-2xl overflow-hidden border border-[#D4AF37]/30">
              <button
                onClick={() => toggleSection('preamble')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-[#D4AF37]">Preamble</h2>
                    <p className="text-sm text-[#A8A29E]">The Foundation of Our Digital Nation</p>
                  </div>
                </div>
                {expandedSection === 'preamble' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'preamble' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <p className="text-lg italic border-l-4 border-[#D4AF37] pl-4">
                    "We, the Citizens of the Country of Christ, in order to form a more perfect digital union, 
                    establish truth, ensure domestic harmony, provide for the common defense against deception, 
                    promote the general welfare of all believers, and secure the blessings of liberty and prosperity 
                    to ourselves and our posterity, do ordain and establish this Constitution for the Country of Christ."
                  </p>
                  <p>
                    This Constitution serves as the supreme governing document for all entities operating within 
                    the Country of Christ ecosystem, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">The Crypto Christian Network</strong> — Our unified digital community</li>
                    <li><strong className="text-white">Crypto Walking With Christ</strong> — The audible scripture platform</li>
                    <li><strong className="text-white">The Crypto Christian Closet</strong> — Our phygital commerce system</li>
                    <li><strong className="text-white">G5 GOLD</strong> — Our sovereign closed-loop reward currency</li>
                  </ul>
                </div>
              )}
            </section>

            {/* Article I - The Sovereign Identity */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article1')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article I — The Sovereign Identity</h2>
                    <p className="text-sm text-[#A8A29E]">TIV-TEK Human Verification System</p>
                  </div>
                </div>
                {expandedSection === 'article1' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article1' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <h3 className="text-lg font-semibold text-white">Section 1: The TIV-TEK Trinity</h3>
                  <p>
                    The Country of Christ employs the TIV-TEK (Temporal Identity Verification through Technological 
                    Kinetic Evidence) system as its foundation for 100% human verification. This trinity consists of:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 my-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Clock className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                      <h4 className="font-semibold text-white">Atomic Time Ledger</h4>
                      <p className="text-xs">Immutable temporal verification</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white">GPSDO Satellites</h4>
                      <p className="text-xs">Precision location & timing</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center">
                      <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-white">TIV-TEK Algorithm</h4>
                      <p className="text-xs">Human behavior verification</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Section 2: The 20-Second Covenant</h3>
                  <p>
                    Every citizen must perform the slide verification within 10 seconds of the verification window 
                    opening (20 seconds after session start). This biological response pattern, combined with 
                    temporal and spatial data, creates an unforgeable proof of humanity.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Section 3: Identity Without Invasion</h3>
                  <p>
                    The Country of Christ guarantees that citizenship requires:
                  </p>
                  <ul className="list-none space-y-2 mt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong className="text-white">NO KYC</strong> — No invasive identity verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong className="text-white">NO Government ID</strong> — No papers required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong className="text-white">NO Credit Card</strong> — No financial surveillance</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    Instead, citizenship is proven through consistent human behavior patterns verified by TIV-TEK.
                  </p>
                </div>
              )}
            </section>

            {/* Article II - G5 GOLD Currency */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article2')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article II — G5 GOLD Currency</h2>
                    <p className="text-sm text-[#A8A29E]">The Closed-Loop Sovereign Economy</p>
                  </div>
                </div>
                {expandedSection === 'article2' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article2' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <h3 className="text-lg font-semibold text-white">Section 1: Definition & Purpose</h3>
                  <p>
                    G5 GOLD is the official closed-loop, off-chain reward currency of the Country of Christ. 
                    It serves as the medium of exchange between citizens and participating merchants within 
                    our ecosystem.
                  </p>
                  
                  <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4 my-4">
                    <h4 className="font-semibold text-[#D4AF37] mb-2">The G5 Principles:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>G</strong>race — Earned through faithful listening</li>
                      <li>• <strong>G</strong>iving — Must be spent to unlock next rewards</li>
                      <li>• <strong>G</strong>rowth — $3/hr raises for 90-day perfect streaks</li>
                      <li>• <strong>G</strong>uaranteed — 100% backed by merchant inventory</li>
                      <li>• <strong>G</strong>odly — Used only within the sanctified economy</li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-semibold text-white mt-6">Section 2: Earning Mechanism</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Citizens earn G5 GOLD at a base rate of <strong className="text-[#D4AF37]">$13.00/hour</strong> for verified scripture listening</li>
                    <li>Payout occurs upon completion of each <strong className="text-[#D4AF37]">33-hour milestone</strong></li>
                    <li>Perfect 90-day streaks (all three pillars) unlock permanent <strong className="text-[#D4AF37]">$3.00/hr raises</strong></li>
                    <li>Raises compound infinitely for lifetime citizens</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mt-6">Section 3: Spending Requirement</h3>
                  <p>
                    G5 GOLD must be spent before the next payout can be received. This ensures continuous 
                    circulation within the economy and prevents hoarding. Citizens have access to the 
                    <strong className="text-white"> Crypto Christian Closet</strong> filled with merchandise 
                    donated by covenant-bound merchants.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">Section 4: Blockchain Transparency</h3>
                  <p>
                    All G5 GOLD transactions are recorded on the Solana blockchain via 
                    <strong className="text-purple-400"> countryofchrist.sol</strong>. This provides:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Complete transaction transparency for citizens and merchants</li>
                    <li>Immutable proof of earning and spending</li>
                    <li>Real-time verification for advertisers</li>
                  </ul>
                </div>
              )}
            </section>

            {/* Article III - The Three Pillars */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article3')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article III — The Three Pillars</h2>
                    <p className="text-sm text-[#A8A29E]">Requirements for Perfect Citizenship</p>
                  </div>
                </div>
                {expandedSection === 'article3' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article3' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <p>
                    To qualify for the $3.00/hour perpetual raise, citizens must maintain a perfect 90-day 
                    streak across all three pillars:
                  </p>
                  
                  <div className="grid gap-4 my-4">
                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-6 h-6 text-[#D4AF37]" />
                        <h4 className="font-semibold text-white">Pillar I: Verification Faithfulness</h4>
                      </div>
                      <p className="text-sm">
                        Never miss a 10-second slide verification window. The TIV-TEK system monitors every 
                        verification attempt. One miss resets your Pillar I streak to zero.
                      </p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-6 h-6 text-green-400" />
                        <h4 className="font-semibold text-white">Pillar II: Good Samaritan Service</h4>
                      </div>
                      <p className="text-sm">
                        Complete one Good Samaritan act every Saturday with witness verification. Service to 
                        others is not optional—it is constitutional.
                      </p>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Globe className="w-6 h-6 text-purple-400" />
                        <h4 className="font-semibold text-white">Pillar III: Sabbath Restoration</h4>
                      </div>
                      <p className="text-sm">
                        Participate in every Sunday 18-minute 528 Hz universal restoration session. This is 
                        the collective healing of our nation.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 mt-4">
                    <h4 className="font-semibold text-white mb-2">Penalty Structure:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Missing a slide verification: <strong className="text-red-400">-1 hour from ledger</strong> (not clock)</li>
                      <li>• Missing Saturday service: <strong className="text-red-400">Pillar II streak reset</strong></li>
                      <li>• Missing Sunday sabbath: <strong className="text-red-400">Pillar III streak reset</strong></li>
                      <li>• No G5 GOLD is ever taken—only streaks and ledger time</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Article IV - Citizen Rights */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article4')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article IV — Citizen Rights</h2>
                    <p className="text-sm text-[#A8A29E]">Inalienable Rights of Every Citizen</p>
                  </div>
                </div>
                {expandedSection === 'article4' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article4' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <p className="font-semibold text-white">Every citizen of the Country of Christ is guaranteed:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#D4AF37] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Right to Earn</h4>
                        <p className="text-sm">Access to G5 GOLD earning through scripture listening, regardless of age (14+), economic status, or geographic location.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#D4AF37] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Right to Privacy</h4>
                        <p className="text-sm">No government ID, no social security, no credit card, no KYC requirements. Your identity is your behavior pattern.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#D4AF37] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Right to Growth</h4>
                        <p className="text-sm">Perpetual $3.00/hour raises for maintaining perfect 90-day pillars. No ceiling on earnings.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#D4AF37] font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Right to Transparency</h4>
                        <p className="text-sm">Full visibility into all G5 GOLD transactions, merchant donations, and ecosystem operations via the Solana blockchain.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#D4AF37] font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">The Right to Minimal Profile</h4>
                        <p className="text-sm">Only name, age, ethnicity, and gender are collected—nothing more. No social graphs, no behavior tracking beyond verification.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Article V - The Crypto Christian Closet */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article5')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article V — The Crypto Christian Closet</h2>
                    <p className="text-sm text-[#A8A29E]">The Phygital Commerce System</p>
                  </div>
                </div>
                {expandedSection === 'article5' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article5' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <h3 className="text-lg font-semibold text-white">Section 1: Definition</h3>
                  <p>
                    The Crypto Christian Closet is the official marketplace where citizens spend their G5 GOLD. 
                    It operates as a <strong className="text-white">phygital twin</strong>—a digital inventory 
                    connected to physical fulfillment.
                  </p>

                  <h3 className="text-lg font-semibold text-white mt-6">Section 2: Inventory Model</h3>
                  <p>
                    The Closet does not warehouse products. Instead:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Merchants donate items to the Closet catalog</li>
                    <li>Items remain in merchant warehouses until ordered</li>
                    <li>Merchants fulfill orders directly to citizens</li>
                    <li>No inventory risk for the Country of Christ</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mt-6">Section 3: Acceptance Requirement</h3>
                  <p>
                    All covenant merchants must accept G5 GOLD in their stores—both online and offline. 
                    This creates a circular economy where:
                  </p>
                  <div className="bg-white/5 rounded-xl p-4 mt-2">
                    <p className="text-center text-sm">
                      Merchants donate → Citizens earn → Citizens spend → Merchants gain customers → Cycle repeats
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Article VI - Amendments */}
            <section className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('article6')}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif">Article VI — Amendments</h2>
                    <p className="text-sm text-[#A8A29E]">Evolution of the Constitution</p>
                  </div>
                </div>
                {expandedSection === 'article6' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedSection === 'article6' && (
                <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
                  <p>
                    This Constitution may be amended through the following process:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Proposal submitted to the Constitutional Council</li>
                    <li>30-day public comment period for all citizens</li>
                    <li>Two-thirds majority vote of active citizens</li>
                    <li>Amendment recorded permanently on Solana blockchain</li>
                  </ol>
                  <p className="mt-4 text-sm italic">
                    The core principles of human verification, privacy protection, and the Three Pillars 
                    may never be amended—they are eternal.
                  </p>
                </div>
              )}
            </section>

            {/* Ratification */}
            <div className="text-center py-8 border-t border-white/10 mt-8">
              <p className="text-[#A8A29E] mb-4">
                This Constitution was ratified and recorded on the Solana blockchain
              </p>
              <p className="font-mono text-purple-400 text-sm">
                Block: #GENESIS • Hash: 0x528Hz...CHRIST
              </p>
              <p className="text-[#D4AF37] font-serif text-xl mt-4">
                "Built by the People, For the People, For All Entities"
              </p>
            </div>
          </div>
        )}

        {/* MERCHANT COVENANT TAB */}
        {activeTab === 'covenant' && (
          <div className="space-y-6">
            
            {/* Covenant Header */}
            <div className="glass rounded-2xl p-8 border border-[#D4AF37]/30 text-center">
              <Handshake className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-[#D4AF37] mb-2">
                The Merchant Business Covenant
              </h2>
              <p className="text-[#A8A29E]">
                A Sacred Agreement Between Advertisers and the Country of Christ
              </p>
              <p className="text-sm text-purple-400 mt-2 font-mono">
                Binding • Transparent • Blockchain-Verified
              </p>
            </div>

            {/* Preamble */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-xl font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
                <ScrollText className="w-5 h-5" />
                Covenant Preamble
              </h3>
              <p className="text-[#A8A29E] leading-relaxed">
                This Business Covenant ("Covenant") establishes the binding agreement between participating 
                merchants ("Advertisers") and the Country of Christ ecosystem. By entering this Covenant, 
                Advertisers gain access to the most valuable customer base in digital commerce: 
                <strong className="text-white"> 100% verified humans with purchasing power and zero fraud risk</strong>.
              </p>
            </section>

            {/* Section 1: Entry Requirements */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#D4AF37]" />
                Section 1: Entry Requirements
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p>To become a Covenant Merchant, Advertisers must:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="font-semibold text-white">Monthly Buy-In</h4>
                    </div>
                    <p className="text-sm">
                      Commit to a minimum <strong className="text-[#D4AF37]">$25,000 USD</strong> monthly 
                      recurring merchandise donation to the Crypto Christian Closet.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="font-semibold text-white">G5 GOLD Acceptance</h4>
                    </div>
                    <p className="text-sm">
                      Accept G5 GOLD as payment in <strong className="text-green-400">all stores</strong>—online 
                      and offline locations without exception.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Transparency Requirements */}
            <section className="glass rounded-2xl p-6 border border-[#D4AF37]/30">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#D4AF37]" />
                Section 2: 100% Transparency Mandate
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p className="font-semibold text-white">
                  Advertisers agree to complete transparency in all operations:
                </p>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-red-400 mb-2">⚠️ Non-Negotiable Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>All donation amounts and values must be publicly visible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>All competitor advertisers can see your donation activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>All transactions recorded permanently on Solana blockchain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>No hidden deals, no private arrangements, no exceptions</span>
                    </li>
                  </ul>
                </div>

                <p className="text-sm italic">
                  The Merchant Transparency Ledger displays all advertiser activity in real-time. 
                  This is by design—competition drives generosity.
                </p>
              </div>
            </section>

            {/* Section 3: What Advertisers Receive */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#D4AF37]" />
                Section 3: What You Receive
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p className="font-semibold text-white">
                  In exchange for Covenant compliance, Advertisers receive:
                </p>
                
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-6">
                  <h4 className="font-semibold text-[#D4AF37] mb-4 text-center text-lg">
                    🎯 The Perfect Customer Base
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span><strong className="text-white">100% Human Verified</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        TIV-TEK verification every 20 seconds eliminates bots, farms, and fraud
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-blue-400" />
                        <span><strong className="text-white">No KYC Population</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        Access the untapped market of privacy-conscious consumers
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-[#D4AF37]" />
                        <span><strong className="text-white">Pre-Funded Customers</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        We give citizens the G5 GOLD to spend in YOUR stores
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span><strong className="text-white">Demographic Data</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        Legal name, age, ethnicity, and gender for every customer
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-400" />
                        <span><strong className="text-white">Engagement Timing</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        Exact timestamp of when they viewed your ad
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-400" />
                        <span><strong className="text-white">Location Data</strong></span>
                      </div>
                      <p className="text-sm ml-7">
                        Geographic position when your ad was displayed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Ad Competition */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
                Section 4: Weekly Competition & Ad Slots
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p>
                  Exclusive advertising slots are awarded based on donation rankings:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="font-bold text-yellow-400">1st Place</h4>
                    <p className="text-2xl font-bold text-white">4 Days</p>
                    <p className="text-xs">Exclusive Ad Placement</p>
                  </div>
                  <div className="bg-gray-500/10 border border-gray-500/30 rounded-xl p-4 text-center">
                    <Crown className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-300">2nd Place</h4>
                    <p className="text-2xl font-bold text-white">2 Days</p>
                    <p className="text-xs">Exclusive Ad Placement</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                    <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <h4 className="font-bold text-amber-600">3rd Place</h4>
                    <p className="text-2xl font-bold text-white">1 Day</p>
                    <p className="text-xs">Exclusive Ad Placement</p>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-4">
                  <h4 className="font-bold text-red-400 flex items-center gap-2">
                    ⚔️ Monthly War Room
                  </h4>
                  <p className="text-sm mt-2">
                    For <strong className="text-white">$100,000 USD</strong> entry fee, compete for 
                    <strong className="text-white"> 7 consecutive days</strong> of exclusive advertising. 
                    One winner only—no runner-ups, no refunds, no mercy.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: The Playbook */}
            <section className="glass rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Section 5: The Transparent Playbook
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p className="font-semibold text-white">
                  Every advertiser can see the complete playbook:
                </p>
                
                <div className="bg-purple-500/10 rounded-xl p-4">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Mercy Map:</strong> Real-time geographic distribution of G5 GOLD and regional influence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Battle Mode:</strong> Territory conquest status, threat alerts, and momentum tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Leaderboard:</strong> Weekly donation rankings visible to all competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Citizen Insights:</strong> Aggregate demographic data (anonymized)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Blockchain Record:</strong> Every transaction verified on Solana (countryofchrist.sol)</span>
                    </li>
                  </ul>
                </div>

                <p className="text-sm italic text-purple-300">
                  "In the Country of Christ, there are no secrets. What you give is what everyone sees. 
                  This transparency creates trust—and trust creates commerce."
                </p>
              </div>
            </section>

            {/* Section 6: Termination */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-red-400" />
                Section 6: Covenant Termination
              </h3>
              <div className="space-y-4 text-[#A8A29E]">
                <p>
                  The Covenant may be terminated under the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Failure to maintain $25,000 monthly donation commitment</li>
                  <li>Refusal to accept G5 GOLD at any location</li>
                  <li>Violation of transparency requirements</li>
                  <li>Fraudulent activity detected on blockchain</li>
                  <li>Actions harmful to citizens of the Country of Christ</li>
                </ul>
                <p className="text-sm text-red-400 mt-4">
                  Termination is immediate, permanent, and recorded on the Solana blockchain. 
                  There is no appeals process.
                </p>
              </div>
            </section>

            {/* Signature Section */}
            <div className="glass rounded-2xl p-8 border border-[#D4AF37]/30 text-center">
              <h3 className="text-2xl font-serif text-[#D4AF37] mb-4">Covenant Acceptance</h3>
              <p className="text-[#A8A29E] mb-6">
                By participating in the Country of Christ ecosystem as an Advertiser, 
                you agree to all terms of this Business Covenant.
              </p>
              <div className="bg-white/5 rounded-xl p-4 font-mono text-sm text-purple-400">
                <p>Covenant Hash: 0xCOVENANT...MERCHANT</p>
                <p>Network: Solana Mainnet</p>
                <p>Domain: countryofchrist.sol</p>
              </div>
              <p className="text-[#D4AF37] font-serif text-lg mt-6">
                "Transparency is the currency of trust"
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#A8A29E] text-sm">
            © 2026 Country of Christ • countryofchrist.sol • All rights reserved under divine law
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Constitution;
