import React, { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, Medal, Award, TrendingUp, Package, DollarSign, 
  Users, Shield, Clock, Swords, Crown, Eye, ChevronDown, 
  ChevronUp, ExternalLink, Zap, Calendar, AlertCircle, MapPin
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import MercyMap from './MercyMap';
import BattleMode from './BattleMode';
import CountryOutline from './CountryOutline';
import RailroadFence from './RailroadFence';
import AdvertiserDeclaration from './AdvertiserDeclaration';
import SealLogo from './SealLogo';

const AdvertiserDashboard = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [warRoom, setWarRoom] = useState(null);
  const [citizenStats, setCitizenStats] = useState({});
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchData = useCallback(async () => {
    try {
      // Fetch advertisers sorted by current week donations
      const { data: advData } = await supabase
        .from('advertisers')
        .select('*')
        .eq('buy_in_status', 'active')
        .order('current_week_donations', { ascending: false });
      
      if (advData) {
        // Add rank to each advertiser
        const rankedData = advData.map((adv, index) => ({
          ...adv,
          rank: index + 1
        }));
        setAdvertisers(rankedData);
      }

      // Fetch recent donations
      const { data: donData } = await supabase
        .from('merchant_donations')
        .select('*, advertisers(business_name)')
        .order('donation_date', { ascending: false })
        .limit(20);
      
      if (donData) setDonations(donData);

      // Fetch current war room event
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const { data: wrData } = await supabase
        .from('war_room_events')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .maybeSingle();
      
      if (wrData) setWarRoom(wrData);

      // Mock citizen stats (would come from view in production)
      setCitizenStats({
        total_citizens: 15420,
        verified_humans: 15420,
        age_14_24: 4250,
        age_25_34: 5180,
        age_35_44: 3120,
        age_45_54: 1890,
        age_55_plus: 980,
        male_count: 7200,
        female_count: 8100,
        other_count: 120
      });

    } catch (err) {
      console.log('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Calculate total pool value
  const totalPoolValue = advertisers.reduce((sum, a) => sum + parseFloat(a.current_week_donations || 0), 0);

  // Get days until week reset (Sunday)
  const getDaysUntilReset = () => {
    const now = new Date();
    const daysUntilSunday = (7 - now.getDay()) % 7;
    return daysUntilSunday === 0 ? 7 : daysUntilSunday;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-[#A8A29E]">{rank}</span>;
    }
  };

  const getRankReward = (rank) => {
    switch(rank) {
      case 1: return '4 Days Exclusive Ads';
      case 2: return '2 Days Exclusive Ads';
      case 3: return '1 Day Exclusive Ads';
      default: return 'No Reward';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-[#D4AF37] text-xl">Loading Merchant Ledger...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen folded-map text-[#FAFAF9] relative" data-testid="advertiser-dashboard">
      <CountryOutline country="countryofchrist" />
      <div className="relative z-10">
      <div className="pt-4 px-4">
        <RailroadFence label="Gold Coast • countryofchrist.sol" ties={32} />
      </div>
      {/* Header */}
      <header className="bg-[#121212] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <SealLogo variant="header" style={{ transform: 'scale(0.65)', transformOrigin: 'left center' }} />
              <div>
                <h1 className="text-2xl font-serif text-[#D4AF37]">Merchant Transparency Ledger</h1>
                <p className="text-sm text-[#A8A29E]"> $25,000/month commitment • Real-time donation tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm">{getDaysUntilReset()} days until reset</span>
              </div>
              <a 
                href="https://solscan.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition"
              >
                <ExternalLink className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">Solana Ledger</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'leaderboard', label: 'Weekly Leaderboard', icon: Trophy },
              { id: 'mercymap', label: 'Mercy Map', icon: MapPin },
              { id: 'battlemode', label: 'Battle Mode', icon: Swords },
              { id: 'warroom', label: 'War Room', icon: Crown },
              { id: 'insights', label: 'Citizen Insights', icon: Users },
              { id: 'donations', label: 'Live Donations', icon: Package }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 transition ${
                  activeTab === tab.id 
                    ? 'border-[#D4AF37] text-[#D4AF37]' 
                    : 'border-transparent text-[#A8A29E] hover:text-white'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        <AdvertiserDeclaration />

        {/* Weekly Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm text-[#A8A29E]">This Week's Pool</span>
                </div>
                <p className="text-3xl font-bold text-[#D4AF37]" data-testid="total-pool">
                  {formatCurrency(totalPoolValue)}
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-[#A8A29E]">Active Merchants</span>
                </div>
                <p className="text-3xl font-bold">{advertisers.length}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-[#A8A29E]">Verified Humans</span>
                </div>
                <p className="text-3xl font-bold">{citizenStats.verified_humans?.toLocaleString()}</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-[#A8A29E]">Buy-in Requirement</span>
                </div>
                <p className="text-3xl font-bold"> $25K<span className="text-sm text-[#A8A29E]">/mo</span></p>
              </div>
            </div>

            {/* Prize Breakdown */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
                Weekly Prize Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-yellow-400">1st Place</p>
                  <p className="text-2xl font-bold"> 4 Days</p>
                  <p className="text-sm text-[#A8A29E]">Exclusive Ads</p>
                </div>
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-xl p-4 text-center">
                  <Medal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-300">2nd Place</p>
                  <p className="text-2xl font-bold"> 2 Days</p>
                  <p className="text-sm text-[#A8A29E]">Exclusive Ads</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                  <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-amber-600">3rd Place</p>
                  <p className="text-2xl font-bold"> 1 Day</p>
                  <p className="text-sm text-[#A8A29E]">Exclusive Ads</p>
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#D4AF37]" />
                  Live Leaderboard
                  <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="leaderboard-table">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#A8A29E] uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#A8A29E] uppercase tracking-wider">Merchant</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-[#A8A29E] uppercase tracking-wider">This Week</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-[#A8A29E] uppercase tracking-wider">All Time</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-[#A8A29E] uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-[#A8A29E] uppercase tracking-wider">Reward</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {advertisers.map((advertiser) => (
                      <tr 
                        key={advertiser.id}
                        className={`hover:bg-white/5 transition cursor-pointer ${
                          advertiser.rank <= 3 ? 'bg-[#D4AF37]/5' : ''
                        }`}
                        onClick={() => setSelectedAdvertiser(advertiser)}
                        data-testid={`advertiser-row-${advertiser.rank}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRankIcon(advertiser.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-semibold">{advertiser.business_name}</p>
                            <p className="text-xs text-[#A8A29E] font-mono">{advertiser.solana_wallet_address}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p className="font-bold text-[#D4AF37]">{formatCurrency(advertiser.current_week_donations)}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p className="text-[#A8A29E]">{formatCurrency(advertiser.total_donations_value)}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p>{advertiser.total_items_donated?.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            advertiser.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                            advertiser.rank === 2 ? 'bg-gray-500/20 text-gray-300' :
                            advertiser.rank === 3 ? 'bg-amber-500/20 text-amber-500' :
                            'bg-white/5 text-[#A8A29E]'
                          }`}>
                            {getRankReward(advertiser.rank)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Mercy Map Tab */}
        {activeTab === 'mercymap' && (
          <div className="space-y-6">
            <MercyMap selectedAdvertiser={selectedAdvertiser} />
          </div>
        )}

        {/* Battle Mode Tab */}
        {activeTab === 'battlemode' && (
          <BattleMode />
        )}

        {/* War Room Tab */}
        {activeTab === 'warroom' && (
          <div className="space-y-6">
            {/* War Room Hero */}
            <div className="glass rounded-2xl p-8 text-center border border-red-500/30 bg-gradient-to-b from-red-900/20 to-transparent">
              <Swords className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-white mb-2">The War Room</h2>
              <p className="text-[#A8A29E] mb-6">Monthly high-stakes competition for ultimate dominance</p>
              
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-red-500"> $100K</p>
                  <p className="text-sm text-[#A8A29E]">Entry Fee</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-[#D4AF37]"> 7 Days</p>
                  <p className="text-sm text-[#A8A29E]">Exclusive Ads</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-4xl font-bold text-white"> 1</p>
                  <p className="text-sm text-[#A8A29E]">Winner Only</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="text-red-400 font-bold">⚠️ NO RUNNER-UPS</span>
                <span className="text-[#A8A29E]">•</span>
                <span className="text-[#A8A29E]">Winner takes all exclusive airtime</span>
              </div>
            </div>

            {/* Current War Room Status */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-500" />
                January <span className="wb-num">2026</span> War Room
              </h3>
              
              {warRoom ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-sm text-[#A8A29E]">Status</p>
                      <p className="font-semibold capitalize">{warRoom.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A8A29E]">Participants</p>
                      <p className="font-semibold">{warRoom.total_participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#A8A29E]">Total Pool</p>
                      <p className="font-semibold text-[#D4AF37]">{formatCurrency(warRoom.total_pool)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-[#A8A29E] mx-auto mb-4" />
                  <p className="text-[#A8A29E]">No War Room event scheduled this month</p>
                  <button className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold transition">
                    Request War Room Event
                  </button>
                </div>
              )}
            </div>

            {/* Rules */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">War Room Rules</h3>
              <ul className="space-y-3 text-[#A8A29E]">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-500 mt-0.5" />
                  <span> $100,000 USD non-refundable entry fee required</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Only ONE winner - no second or third place rewards</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Winner receives <span className="wb-num">7</span> consecutive days of exclusive ad placement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>All transactions recorded on Solana blockchain for transparency</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Citizen Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Value Proposition */}
            <div className="glass rounded-2xl p-6 border border-[#D4AF37]/30">
              <h3 className="text-lg font-semibold mb-4 text-[#D4AF37] flex items-center gap-2">
                <Shield className="w-5 h-5" />
                What You Get as a Merchant
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-semibold">Legal Name</p>
                  <p className="text-xs text-[#A8A29E]">Verified identity</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-semibold">Age & Gender</p>
                  <p className="text-xs text-[#A8A29E]">Demographics</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-semibold">Ethnicity</p>
                  <p className="text-xs text-[#A8A29E]">Cultural context</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="font-semibold"> 100% Human</p>
                  <p className="text-xs text-[#A8A29E]">TIV-TEK verified</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-500/10 rounded-xl">
                <p className="text-green-400 text-center">
                  <strong>No KYC • No ID • No Credit Card</strong> — Brand new untapped customer base
                </p>
              </div>
            </div>

            {/* Demographic Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Distribution */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Age Distribution
                </h3>
                <div className="space-y-3">
                  {[
                    { label: '14-24', value: citizenStats.age_14_24, color: 'bg-blue-500' },
                    { label: '25-34', value: citizenStats.age_25_34, color: 'bg-green-500' },
                    { label: '35-44', value: citizenStats.age_35_44, color: 'bg-yellow-500' },
                    { label: '45-54', value: citizenStats.age_45_54, color: 'bg-orange-500' },
                    { label: '55+', value: citizenStats.age_55_plus, color: 'bg-red-500' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.label}</span>
                        <span className="text-[#A8A29E]">{item.value?.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color}`}
                          style={{ width: `${(item.value / citizenStats.total_citizens) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Distribution */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Gender Distribution
                </h3>
                <div className="flex items-center justify-center gap-8 py-8">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-blue-400">
                        {Math.round((citizenStats.male_count / citizenStats.total_citizens) * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-[#A8A29E]">Male</p>
                    <p className="font-semibold">{citizenStats.male_count?.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-pink-500/20 flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-pink-400">
                        {Math.round((citizenStats.female_count / citizenStats.total_citizens) * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-[#A8A29E]">Female</p>
                    <p className="font-semibold">{citizenStats.female_count?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solana Transparency */}
            <div className="glass rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Solana Blockchain Transparency
              </h3>
              <p className="text-[#A8A29E] mb-4">
                Every <span className="g5-gold">G5 GOLD</span> transaction is recorded on the Solana blockchain. Merchants can monitor 
                citizen spending in their stores (online and offline) in real-time via countryofchrist.sol
              </p>
              <a 
                href="https://solscan.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition"
              >
                <ExternalLink className="w-4 h-4" />
                View on Solana Explorer
              </a>
            </div>
          </div>
        )}

        {/* Live Donations Tab */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-400" />
                  Live Donation Feed
                  <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {donations.length > 0 ? donations.map((donation) => (
                  <div key={donation.id} className="p-4 hover:bg-white/5 transition" data-testid="donation-item">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                          <Package className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="font-semibold">{donation.item_name}</p>
                          <p className="text-sm text-[#A8A29E]">
                            {donation.advertisers?.business_name} • {donation.quantity}x @ {formatCurrency(donation.unit_value)} each
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#D4AF37]">{formatCurrency(donation.total_value)}</p>
                        <p className="text-xs text-[#A8A29E]">
                          {new Date(donation.donation_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-[#A8A29E]">
                    No donations yet this week
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#A8A29E] text-sm">
          <p>Merchant Transparency Ledger • countryofchrist.sol • All transactions verified on Solana</p>
        </div>
      </footer>
      <div className="px-4 pb-4">
        <RailroadFence ties={32} />
      </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
