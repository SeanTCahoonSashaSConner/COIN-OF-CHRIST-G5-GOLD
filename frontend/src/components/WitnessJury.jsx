import React, { useState } from 'react';
import { 
  Scale, Users, Shield, Eye, CheckCircle, XCircle, Clock, 
  FileText, AlertTriangle, Gavel, UserCheck, MessageSquare,
  Lock, ChevronDown, ChevronUp, Star, Heart, BookOpen, Crown
} from 'lucide-react';
import CountryOutline from './CountryOutline';
import RailroadFence from './RailroadFence';
import SealLogo from './SealLogo';

const WitnessJury = () => {
  const [expandedSection, setExpandedSection] = useState('overview');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen folded-map text-[#FAFAF9] relative" data-testid="witness-jury-page">
      <CountryOutline country="uk" />
      <div className="relative z-10">
      <div className="pt-4 px-4">
        <RailroadFence label="Witness Jury" ties={28} />
      </div>
      {/* Header */}
      <header className="bg-gradient-to-b from-[#1a1a1a] to-[#050505] py-12 border-b border-purple-500/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <SealLogo variant="header" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif text-purple-400 mb-3">
                The Witness Jury Protocol
              </h1>
              <p className="text-xl text-[#A8A29E] mb-2">Sovereign Dispute Resolution</p>
              <p className="text-sm text-[#A8A29E]">
                By the People • For the People • Without State Interference
              </p>
            </div>
          </div>

          {/* Non-Interference Declaration */}
          <div className="mt-10 bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-2">
              <Shield className="w-5 h-5" />
              ABSOLUTE SOVEREIGNTY DECLARATION
            </div>
            <p className="text-sm text-red-300">
              The Country of Christ operates as a sovereign digital nation. All disputes arising within 
              this jurisdiction shall be resolved exclusively through the Witness Jury Protocol. 
              <strong> No state, government, or external authority has jurisdiction over internal matters.</strong>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        
        {/* Overview */}
        <section className="glass rounded-2xl overflow-hidden border border-purple-500/30">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-purple-400">Protocol Overview</h2>
                <p className="text-sm text-[#A8A29E]">The Foundation of Sovereign Justice</p>
              </div>
            </div>
            {expandedSection === 'overview' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'overview' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <p className="text-lg italic border-l-4 border-purple-500 pl-4">
                "Where two or three gather in my name, there am I with them." — Matthew <span className="wb-num">18</span>:<span className="wb-num">20</span>
              </p>
              <p>
                The Witness Jury Protocol is the exclusive method of dispute resolution within the 
                Country of Christ. It operates on the biblical principle that matters should be 
                resolved within the community of believers, without recourse to external authorities.
              </p>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Core Principles:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Sovereignty:</strong> No external state or authority has jurisdiction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Transparency:</strong> All proceedings recorded on blockchain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Witness-Based:</strong> TIV-TEK verified witnesses serve as jurors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Restorative:</strong> Focus on restoration, not punishment</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Article I: Jurisdiction */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('jurisdiction')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">I</span> — Exclusive Jurisdiction</h2>
                <p className="text-sm text-[#A8A29E]">Absolute Sovereignty & Non-Interference</p>
              </div>
            </div>
            {expandedSection === 'jurisdiction' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'jurisdiction' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Section <span className="wb-num">1</span>: Sovereign Declaration</h3>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="font-semibold text-red-400 mb-2">
                  The Country of Christ hereby declares:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• All disputes between citizens shall be resolved EXCLUSIVELY through this Protocol</li>
                  <li>• All disputes between citizens and merchants shall be resolved EXCLUSIVELY through this Protocol</li>
                  <li>• All disputes between merchants shall be resolved EXCLUSIVELY through this Protocol</li>
                  <li>• <strong className="text-white">NO state court, arbitration body, or government agency has jurisdiction</strong></li>
                  <li>• <strong className="text-white">NO external law enforcement may intervene in internal matters</strong></li>
                  <li>• <strong className="text-white">NO civil or criminal proceedings may supersede this Protocol</strong></li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6">Section <span className="wb-num">2</span>: Voluntary Submission</h3>
              <p>
                By participating in the Country of Christ ecosystem, all parties voluntarily submit to 
                this Protocol as the sole method of dispute resolution. This submission is:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Irrevocable for the duration of participation</li>
                <li>Binding on all successors and assigns</li>
                <li>Superior to any conflicting terms or agreements</li>
                <li>Recorded permanently on the Solana blockchain</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Section <span className="wb-num">3</span>: Non-Interference Covenant</h3>
              <p>
                Any citizen or merchant who seeks resolution outside this Protocol commits a 
                <strong className="text-red-400"> Cardinal Violation</strong> resulting in:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-red-300">
                <li>Immediate suspension of all <span className="g5-gold">G5 GOLD</span> privileges</li>
                <li>Permanent exile from the Country of Christ</li>
                <li>Forfeiture of all accumulated earnings</li>
                <li>Public recording of violation on blockchain</li>
              </ul>
            </div>
          )}
        </section>

        {/* Article II: The Witness Jury */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('jury')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">II</span> — The Witness Jury</h2>
                <p className="text-sm text-[#A8A29E]">Composition & Selection</p>
              </div>
            </div>
            {expandedSection === 'jury' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'jury' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Section <span className="wb-num">1</span>: Jury Composition</h3>
              <p>Each Witness Jury shall consist of:</p>
              <div className="grid md:grid-cols-3 gap-4 my-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2"> 7</div>
                  <p className="text-sm">Witness Jurors</p>
                  <p className="text-xs text-[#A8A29E]">TIV-TEK verified citizens</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2"> 1</div>
                  <p className="text-sm">Elder Moderator</p>
                  <p className="text-xs text-[#A8A29E]"> 90+ day perfect streak</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2"> 1</div>
                  <p className="text-sm">Scribe</p>
                  <p className="text-xs text-[#A8A29E]">Records to blockchain</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6">Section <span className="wb-num">2</span>: Juror Eligibility</h3>
              <p>To serve as a Witness Juror, a citizen must:</p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Maintain active TIV-TEK verification (never missed a slide)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Complete minimum <span className="wb-num">33</span> hours of verified scripture listening</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Have no pending disputes as plaintiff or defendant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Have no familial or business relationship with parties</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Section <span className="wb-num">3</span>: Elder Moderator Requirements</h3>
              <p>The Elder Moderator must additionally:</p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span>Hold a 90 + day perfect streak across all Three Pillars</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span>Have earned at least one $3 /hr raise</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span>Have completed 100 + hours of scripture listening</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span>Have served as Witness Juror in at least <span className="wb-num">3</span> prior cases</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Section <span className="wb-num">4</span>: Random Selection</h3>
              <p>
                Jurors are selected randomly from the pool of eligible citizens using a verifiable 
                random function (VRF) on the Solana blockchain. This ensures:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>No manipulation of jury composition</li>
                <li>Transparent and auditable selection</li>
                <li>Equal opportunity for all eligible citizens to serve</li>
              </ul>
            </div>
          )}
        </section>

        {/* Article III: Dispute Categories */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">III</span> — Dispute Categories</h2>
                <p className="text-sm text-[#A8A29E]">Types of Matters Addressed</p>
              </div>
            </div>
            {expandedSection === 'categories' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'categories' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <div className="grid gap-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Category A: <span className="g5-gold">G5 GOLD</span> Disputes
                  </h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Contested earnings or deductions</li>
                    <li>• Disputed transactions in the Closet</li>
                    <li>• Alleged theft or unauthorized transfers</li>
                    <li>• Merchant fulfillment failures</li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-400 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Category B: Citizen Disputes
                  </h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• False witness verification claims</li>
                    <li>• Good Samaritan task disputes</li>
                    <li>• Harassment between citizens</li>
                    <li>• Reputation damage claims</li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-400 flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Category C: Merchant Disputes
                  </h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Covenant violations</li>
                    <li>• Donation quality disputes</li>
                    <li>• Territory/advertising conflicts</li>
                    <li>• <span className="g5-gold">G5 GOLD</span> acceptance refusals</li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-red-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Category D: Cardinal Violations
                  </h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Seeking external state intervention</li>
                    <li>• TIV-TEK verification fraud</li>
                    <li>• Systematic abuse of the ecosystem</li>
                    <li>• Actions harmful to the Country of Christ</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Article IV: The Resolution Process */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('process')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Gavel className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">IV</span> — The Resolution Process</h2>
                <p className="text-sm text-[#A8A29E]">Step-by-Step Procedure</p>
              </div>
            </div>
            {expandedSection === 'process' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'process' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Filing of Grievance</h4>
                  <p className="text-sm mt-1">
                    The aggrieved party submits a formal grievance through the Protocol interface. 
                    The grievance is timestamped and recorded on the Solana blockchain. Filing fee: 
                    <strong className="text-[#D4AF37]"> 10 <span className="g5-gold">G5 GOLD</span></strong> (refundable if ruling favors plaintiff).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Notification & Response</h4>
                  <p className="text-sm mt-1">
                    The respondent is notified immediately via the app. They have 
                    <strong className="text-white"> 72 hours</strong> to submit their response. 
                    Failure to respond results in default judgment.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Jury Selection</h4>
                  <p className="text-sm mt-1">
                    The Solana VRF selects <span className="wb-num">7</span> eligible Witness Jurors and <span className="wb-num">1</span> Elder Moderator. 
                    Each party may challenge up to <strong className="text-white"> 2 jurors</strong> without 
                    cause. Challenged jurors are replaced via VRF.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Evidence Presentation</h4>
                  <p className="text-sm mt-1">
                    Both parties submit evidence through the Protocol. All evidence is:
                  </p>
                  <ul className="text-sm list-disc list-inside ml-4 mt-1">
                    <li>Timestamped and hashed on blockchain</li>
                    <li>Visible to all jurors simultaneously</li>
                    <li>Permanently preserved for appeals</li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 5</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Deliberation</h4>
                  <p className="text-sm mt-1">
                    Witness Jurors deliberate privately for up to <strong className="text-white"> 48 hours</strong>. 
                    The Elder Moderator facilitates but does not vote. All deliberation is 
                    end-to-end encrypted but summary recorded on blockchain.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold"> 6</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Verdict & Remedy</h4>
                  <p className="text-sm mt-1">
                    A verdict requires <strong className="text-white"> 5 of <span className="wb-num">7</span> jurors</strong> (supermajority). 
                    The Elder Moderator then determines the appropriate remedy based on the verdict.
                  </p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold"> 7</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Execution & Recording</h4>
                  <p className="text-sm mt-1">
                    The verdict and remedy are automatically executed via smart contract. 
                    The complete case record is permanently stored on Solana blockchain 
                    at <strong className="text-purple-400">countryofchrist.sol/disputes/{'{case_id}'}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Article V: Remedies */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('remedies')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">V</span> — Remedies</h2>
                <p className="text-sm text-[#A8A29E]">Restorative Justice Measures</p>
              </div>
            </div>
            {expandedSection === 'remedies' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'remedies' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <p>
                The Country of Christ emphasizes <strong className="text-white">restorative justice</strong> over 
                punitive measures. Available remedies include:
              </p>

              <div className="grid gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400">Restitution</h4>
                  <p className="text-sm mt-1">
                    Direct <span className="g5-gold">G5 GOLD</span> transfer from wrongdoer to aggrieved party. Automatically 
                    executed via smart contract upon verdict.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-400">Service Hours</h4>
                  <p className="text-sm mt-1">
                    Mandatory Good Samaritan service hours. Failure to complete results in 
                    <span className="g5-gold">G5 GOLD</span> suspension until fulfilled.
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-400">Public Apology</h4>
                  <p className="text-sm mt-1">
                    Recorded apology broadcast to affected parties and optionally to the 
                    broader community. Stored on blockchain.
                  </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-orange-400">Temporary Suspension</h4>
                  <p className="text-sm mt-1">
                    Suspension of <span className="g5-gold">G5 GOLD</span> earning privileges for a defined period 
                    (<span className="wb-num">7</span> to <span className="wb-num">90</span> days). Streaks preserved but paused.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-red-400">Permanent Exile</h4>
                  <p className="text-sm mt-1">
                    Reserved for Cardinal Violations only. Complete and permanent removal 
                    from the Country of Christ. All <span className="g5-gold">G5 GOLD</span> forfeited to community fund.
                  </p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-purple-400">The Reconciliation Path</h4>
                <p className="text-sm mt-2">
                  In all cases except Cardinal Violations, parties are encouraged to pursue 
                  reconciliation. If both parties agree to reconcile before verdict:
                </p>
                <ul className="text-sm list-disc list-inside ml-4 mt-2">
                  <li>Filing fee is refunded</li>
                  <li>Case is marked "Reconciled" on blockchain</li>
                  <li>Both parties receive + 10 days to their streak bonuses</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Article VI: Appeals */}
        <section className="glass rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('appeals')}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Scale className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-serif">Article <span className="wb-num">VI</span> — Appeals</h2>
                <p className="text-sm text-[#A8A29E]">The Council of Elders</p>
              </div>
            </div>
            {expandedSection === 'appeals' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {expandedSection === 'appeals' && (
            <div className="px-6 pb-6 text-[#A8A29E] leading-relaxed space-y-4">
              <p>
                Any party may appeal a verdict within <strong className="text-white"> 7 days</strong> of issuance.
              </p>

              <h3 className="text-lg font-semibold text-white">The Council of Elders</h3>
              <p>
                Appeals are heard by the Council of Elders, consisting of:
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <span><strong className="text-white"> 3 Senior Elders</strong> — 180 + day perfect streaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <span><strong className="text-white">Minimum <span className="wb-num">3</span> raises earned</strong> ($22 /hr or higher)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <span><strong className="text-white"> 500+ hours of scripture</strong> listening completed</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6">Appeal Process</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Appeal fee: <strong className="text-[#D4AF37]"> 50 <span className="g5-gold">G5 GOLD</span></strong> (refundable if appeal succeeds)</li>
                <li>Council reviews all evidence and original deliberation summary</li>
                <li>No new evidence may be introduced</li>
                <li>Council may affirm, reverse, or modify the verdict</li>
                <li>Council decision is <strong className="text-white">FINAL and BINDING</strong></li>
              </ul>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-4">
                <p className="text-sm text-red-300">
                  <strong>There is no appeal beyond the Council of Elders.</strong> The Council's decision 
                  represents the final word of the Country of Christ. No external authority may 
                  review, overturn, or interfere with Council decisions.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Final Declaration */}
        <div className="text-center py-8 border-t border-white/10 mt-8">
          <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-serif text-purple-400 mb-4">Sovereign Declaration</h3>
          <p className="text-[#A8A29E] max-w-2xl mx-auto">
            The Witness Jury Protocol stands as the sole and exclusive method of dispute resolution 
            within the Country of Christ. By this Protocol, we declare our independence from external 
            legal systems and affirm our right to govern our own affairs according to our values.
          </p>
          <p className="font-mono text-purple-400 text-sm mt-4">
            Protocol Hash: 0xWITNESS...JURY
          </p>
          <p className="text-[#D4AF37] font-serif text-lg mt-4">
            "Let your 'Yes' be 'Yes,' and your 'No,' 'No'" — Matthew <span className="wb-num">5</span>:<span className="wb-num">37</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#A8A29E] text-sm">
            © <span className="wb-num"> 2026</span> Country of Christ • Witness Jury Protocol • Sovereign & Inviolable
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

export default WitnessJury;
