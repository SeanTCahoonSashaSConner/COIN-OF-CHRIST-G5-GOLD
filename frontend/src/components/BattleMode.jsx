import React, { useState, useEffect, useCallback } from 'react';
import { 
  Swords, Shield, Crown, AlertTriangle, TrendingUp, TrendingDown,
  Flame, Zap, Bell, Target, Flag, ChevronRight, X, Volume2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const BattleMode = () => {
  const [conquests, setConquests] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [momentum, setMomentum] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showAlertPanel, setShowAlertPanel] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Fetch battle data
  const fetchData = useCallback(async () => {
    try {
      // Fetch regional conquests
      const { data: conquestData } = await supabase
        .from('regional_conquests')
        .select('*')
        .order('region');
      
      if (conquestData) setConquests(conquestData);

      // Fetch recent alerts
      const { data: alertData } = await supabase
        .from('territory_alerts')
        .select('*, advertisers!territory_alerts_advertiser_id_fkey(business_name)')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (alertData) setAlerts(alertData);

      // Fetch momentum data
      const { data: momentumData } = await supabase
        .from('donation_momentum')
        .select('*, advertisers(business_name)')
        .order('donation_velocity', { ascending: false });
      
      if (momentumData) setMomentum(momentumData);

    } catch (err) {
      console.log('Fetch error:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Play alert sound (simulated)
  const playAlertSound = () => {
    if (soundEnabled) {
      // In production, this would play an actual sound
      console.log('🔔 Alert sound played');
    }
  };

  const getThreatColor = (level) => {
    switch(level) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-blue-400 bg-blue-400/20 border-blue-400/50';
      default: return 'text-green-500 bg-green-500/20 border-green-500/50';
    }
  };

  const getStreakIcon = (type) => {
    switch(type) {
      case 'hot': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'rising': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'cooling': return <TrendingDown className="w-5 h-5 text-blue-400" />;
      case 'cold': return <div className="w-5 h-5 text-blue-600">❄️</div>;
      default: return <div className="w-5 h-5 text-gray-400">—</div>;
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'territory_threat': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'overtaken': return <Flag className="w-5 h-5 text-red-500" />;
      case 'defended': return <Shield className="w-5 h-5 text-green-500" />;
      case 'conquered': return <Crown className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const regionNames = {
    northeast: 'Northeast',
    southeast: 'Southeast',
    midwest: 'Midwest',
    southwest: 'Southwest',
    west: 'West'
  };

  return (
    <div className="space-y-6" data-testid="battle-mode">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-[#D4AF37] flex items-center gap-3">
            <Swords className="w-7 h-7" />
            Battle Mode
          </h2>
          <p className="text-[#A8A29E]">Regional conquest & territory defense</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition ${soundEnabled ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/5 text-[#A8A29E]'}`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAlertPanel(!showAlertPanel)}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Alerts ({alerts.filter(a => !a.is_read).length})
          </button>
        </div>
      </div>

      {/* Alert Panel */}
      {showAlertPanel && alerts.length > 0 && (
        <div className="glass rounded-2xl p-4 border border-red-500/30 bg-red-900/10" data-testid="alert-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Territory Alerts
            </h3>
            <button onClick={() => setShowAlertPanel(false)}>
              <X className="w-5 h-5 text-[#A8A29E]" />
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {alerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  alert.is_critical ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'
                }`}
                data-testid="alert-item"
              >
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.alert_type)}
                  <div>
                    <p className="font-medium">
                      {alert.alert_type === 'territory_threat' && `⚠️ ${alert.competitor_name} is threatening your ${regionNames[alert.region]} territory!`}
                      {alert.alert_type === 'overtaken' && `🚨 You lost ${regionNames[alert.region]} to ${alert.competitor_name}!`}
                      {alert.alert_type === 'defended' && `🛡️ Successfully defended ${regionNames[alert.region]}!`}
                      {alert.alert_type === 'conquered' && `👑 You conquered ${regionNames[alert.region]}!`}
                    </p>
                    <p className="text-xs text-[#A8A29E]">
                      Gap: {alert.gap_percentage}% • Your influence: {formatCurrency(alert.your_influence)}
                    </p>
                  </div>
                </div>
                {alert.is_critical && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                    CRITICAL
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regional Conquest Map */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Flag className="w-5 h-5 text-[#D4AF37]" />
          Regional Conquest Status
        </h3>
        <div className="grid grid-cols-5 gap-4" data-testid="conquest-grid">
          {conquests.map(conquest => (
            <div 
              key={conquest.id}
              onClick={() => setSelectedRegion(selectedRegion === conquest.region ? null : conquest.region)}
              className={`p-4 rounded-xl border cursor-pointer transition hover:scale-105 ${
                getThreatColor(conquest.threat_level)
              } ${selectedRegion === conquest.region ? 'ring-2 ring-[#D4AF37]' : ''}`}
              data-testid={`conquest-${conquest.region}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{regionNames[conquest.region]}</span>
                {conquest.threat_level === 'critical' && (
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm truncate">{conquest.ruler_name?.split(' ')[0]}</span>
              </div>
              
              <div className="text-xs text-[#A8A29E]">
                {conquest.consecutive_weeks} week{conquest.consecutive_weeks !== 1 ? 's' : ''} ruled
              </div>
              
              {conquest.under_attack && (
                <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                  <Swords className="w-3 h-3" />
                  Under attack by {conquest.attacker_name?.split(' ')[0]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Donation Momentum / Hot Streaks */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Donation Momentum
          <span className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
            LIVE
          </span>
        </h3>
        <div className="space-y-3" data-testid="momentum-list">
          {momentum.map((m, index) => (
            <div 
              key={m.id}
              className={`p-4 rounded-xl border ${
                m.streak_type === 'hot' ? 'bg-orange-500/10 border-orange-500/30' :
                m.streak_type === 'rising' ? 'bg-green-500/10 border-green-500/30' :
                'bg-white/5 border-white/10'
              }`}
              data-testid={`momentum-${index}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-[#D4AF37]/20' : 'bg-white/10'
                  }`}>
                    {index === 0 ? '🔥' : index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{m.advertisers?.business_name}</p>
                    <p className="text-xs text-[#A8A29E]">
                      {m.streak_hours}h {m.streak_type} streak
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Velocity */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#D4AF37]">
                      {formatCurrency(m.donation_velocity)}/hr
                    </p>
                    <div className="flex items-center gap-1 text-xs">
                      {m.trend_direction === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : m.trend_direction === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <span className="text-[#A8A29E]">—</span>
                      )}
                      <span className={
                        m.trend_percentage > <span className="wb-num">0</span> ? 'text-green-500' : 
                        m.trend_percentage < 0 ? 'text-red-500' : 'text-[#A8A29E]'
                      }>
                        {m.trend_percentage > 0 ? '+' : ''}{m.trend_percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Streak indicator */}
                  <div className="flex items-center">
                    {getStreakIcon(m.streak_type)}
                  </div>
                </div>
              </div>
              
              {/* Momentum bar */}
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    m.streak_type === 'hot' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    m.streak_type === 'rising' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                    m.streak_type === 'cooling' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${Math.min((m.donation_velocity / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[#A8A29E]">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-[#A8A29E]">Contested</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-[#A8A29E]">Threatened</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[#A8A29E]">Critical</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-[#A8A29E]">Hot Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-[#A8A29E]">Rising</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleMode;
