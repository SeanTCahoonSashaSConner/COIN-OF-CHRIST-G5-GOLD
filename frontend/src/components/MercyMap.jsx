import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  MapPin, TrendingUp, TrendingDown, Minus, Users, DollarSign,
  Package, Zap, ChevronDown, ChevronUp, Eye, Filter
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// US Region coordinates for map positioning
const REGIONS = {
  northeast: { name: 'Northeast', x: 78, y: 25, states: ['NY', 'MA', 'PA', 'NJ', 'CT', 'RI', 'VT', 'NH', 'ME'] },
  southeast: { name: 'Southeast', x: 70, y: 55, states: ['FL', 'GA', 'NC', 'SC', 'VA', 'TN', 'AL', 'MS', 'LA', 'AR', 'KY'] },
  midwest: { name: 'Midwest', x: 55, y: 30, states: ['IL', 'OH', 'MI', 'IN', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'] },
  southwest: { name: 'Southwest', x: 35, y: 60, states: ['TX', 'AZ', 'NM', 'OK'] },
  west: { name: 'West', x: 18, y: 35, states: ['CA', 'WA', 'OR', 'NV', 'UT', 'CO', 'ID', 'MT', 'WY', 'AK', 'HI'] }
};

// City coordinates for pulse animations
const CITIES = {
  'New York': { lat: 40.7128, lng: -74.0060, x: 82, y: 28 },
  'Boston': { lat: 42.3601, lng: -71.0589, x: 85, y: 22 },
  'Philadelphia': { lat: 39.9526, lng: -75.1652, x: 80, y: 32 },
  'Atlanta': { lat: 33.7490, lng: -84.3880, x: 72, y: 52 },
  'Miami': { lat: 25.7617, lng: -80.1918, x: 78, y: 72 },
  'Charlotte': { lat: 35.2271, lng: -80.8431, x: 75, y: 45 },
  'Nashville': { lat: 36.1627, lng: -86.7816, x: 68, y: 45 },
  'Chicago': { lat: 41.8781, lng: -87.6298, x: 62, y: 30 },
  'Detroit': { lat: 42.3314, lng: -83.0458, x: 68, y: 28 },
  'Minneapolis': { lat: 44.9778, lng: -93.2650, x: 52, y: 22 },
  'Cleveland': { lat: 41.4993, lng: -81.6944, x: 70, y: 30 },
  'Dallas': { lat: 32.7767, lng: -96.7970, x: 45, y: 55 },
  'Houston': { lat: 29.7604, lng: -95.3698, x: 48, y: 65 },
  'Phoenix': { lat: 33.4484, lng: -112.0740, x: 25, y: 55 },
  'Los Angeles': { lat: 34.0522, lng: -118.2437, x: 15, y: 50 },
  'San Francisco': { lat: 37.7749, lng: -122.4194, x: 10, y: 40 },
  'Seattle': { lat: 47.6062, lng: -122.3321, x: 12, y: 18 },
  'Denver': { lat: 39.7392, lng: -104.9903, x: 32, y: 40 }
};

const MercyMap = ({ selectedAdvertiser = null }) => {
  const [distribution, setDistribution] = useState([]);
  const [events, setEvents] = useState([]);
  const [advertisers, setAdvertisers] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filterAdvertiser, setFilterAdvertiser] = useState('all');
  const [showLegend, setShowLegend] = useState(true);
  const [animatingEvents, setAnimatingEvents] = useState([]);
  const mapRef = useRef(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      // Fetch distribution data
      const { data: distData } = await supabase
        .from('mercy_map_distribution')
        .select('*, advertisers(business_name)')
        .order('influence_score', { ascending: false });
      
      if (distData) setDistribution(distData);

      // Fetch recent events for animation
      const { data: eventData } = await supabase
        .from('mercy_map_events')
        .select('*, advertisers(business_name)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (eventData) setEvents(eventData);

      // Fetch advertisers for filter
      const { data: advData } = await supabase
        .from('advertisers')
        .select('id, business_name')
        .eq('buy_in_status', 'active');
      
      if (advData) setAdvertisers(advData);

    } catch (err) {
      console.log('Fetch error:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Animate new events
  useEffect(() => {
    if (events.length > 0) {
      // Cycle through events for animation
      let index = 0;
      const animationInterval = setInterval(() => {
        const event = events[index % events.length];
        if (event && event.city && CITIES[event.city]) {
          setAnimatingEvents(prev => [...prev.slice(-10), { ...event, animId: Date.now() }]);
        }
        index++;
      }, 2000);

      return () => clearInterval(animationInterval);
    }
  }, [events]);

  // Calculate region totals
  const getRegionStats = (region) => {
    const regionData = distribution.filter(d => 
      d.region === region && 
      (filterAdvertiser === 'all' || d.advertiser_id === filterAdvertiser)
    );
    
    const total = regionData.reduce((sum, d) => sum + parseFloat(d.total_g5_distributed || 0), 0);
    const citizens = regionData.reduce((sum, d) => sum + (d.citizen_count || 0), 0);
    const influence = regionData.reduce((sum, d) => sum + parseFloat(d.influence_score || 0), 0);
    
    return { total, citizens, influence, data: regionData };
  };

  // Get color intensity based on distribution
  const getRegionColor = (region) => {
    const stats = getRegionStats(region);
    const maxInfluence = 50000; // Normalize against max expected
    const intensity = Math.min(stats.influence / maxInfluence, 1);
    
    // Gold color with varying opacity
    return `rgba(212, 175, 55, ${0.2 + intensity * 0.6})`;
  };

  // Get advertiser color
  const getAdvertiserColor = (index) => {
    const colors = [
      '#D4AF37', // Gold
      '#4ADE80', // Green
      '#60A5FA', // Blue
      '#F472B6', // Pink
      '#A78BFA', // Purple
    ];
    return colors[index % colors.length];
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  // Get top advertiser per region
  const getTopAdvertiserInRegion = (region) => {
    const regionData = distribution.filter(d => d.region === region);
    if (regionData.length === 0) return null;
    
    const sorted = [...regionData].sort((a, b) => 
      parseFloat(b.influence_score || 0) - parseFloat(a.influence_score || 0)
    );
    return sorted[0];
  };

  return (
    <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden" data-testid="mercy-map">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif text-[#D4AF37] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Mercy Map
            </h2>
            <p className="text-sm text-[#A8A29E]"><span className="g5-gold">G5 GOLD</span> distribution & advertiser influence by region</p>
          </div>
          
          {/* Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#A8A29E]" />
              <select 
                value={filterAdvertiser}
                onChange={(e) => setFilterAdvertiser(e.target.value)}
                className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm"
                data-testid="advertiser-filter"
              >
                <option value="all">All Advertisers</option>
                {advertisers.map(adv => (
                  <option key={adv.id} value={adv.id}>{adv.business_name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="text-[#A8A29E] hover:text-white transition"
            >
              {showLegend ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative" ref={mapRef}>
        {/* USA Map SVG */}
        <div className="relative w-full aspect-[2/1] bg-[#050505] overflow-hidden">
          {/* Map Background with state outlines */}
          <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full">
            {/* Simplified USA outline */}
            <path 
              d="M5,20 L25,15 L45,18 L65,15 L85,20 L90,35 L85,50 L75,60 L55,65 L35,62 L15,55 L8,40 Z"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
            
            {/* Region polygons */}
            {Object.entries(REGIONS).map(([key, region]) => {
              const stats = getRegionStats(key);
              const topAdv = getTopAdvertiserInRegion(key);
              
              return (
                <g key={key}>
                  {/* Region circle indicator */}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={8 + Math.min(stats.influence / 5000, 12)}
                    fill={getRegionColor(key)}
                    className="cursor-pointer transition-all duration-500 hover:opacity-80"
                    onClick={() => setSelectedRegion(selectedRegion === key ? null : key)}
                    data-testid={`region-${key}`}
                  />
                  
                  {/* Pulse effect for active regions */}
                  {stats.influence > 10000 && (
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={8 + Math.min(stats.influence / 5000, 12)}
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      className="animate-ping opacity-50"
                    />
                  )}
                  
                  {/* Region label */}
                  <text
                    x={region.x}
                    y={region.y + 15}
                    textAnchor="middle"
                    fill="white"
                    fontSize="3"
                    className="font-medium"
                  >
                    {region.name}
                  </text>
                  
                  {/* Top advertiser indicator */}
                  {topAdv && (
                    <text
                      x={region.x}
                      y={region.y + 19}
                      textAnchor="middle"
                      fill="#D4AF37"
                      fontSize="2"
                    >
                      {topAdv.advertisers?.business_name?.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Animated donation pulses */}
            {animatingEvents.map((event, i) => {
              const city = CITIES[event.city];
              if (!city) return null;
              
              return (
                <g key={event.animId}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="1"
                    fill="#D4AF37"
                    className="animate-ping"
                  />
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="0.5"
                    fill="#D4AF37"
                  />
                </g>
              );
            })}

            {/* City markers */}
            {Object.entries(CITIES).map(([name, city]) => (
              <circle
                key={name}
                cx={city.x}
                cy={city.y}
                r="0.8"
                fill="rgba(255,255,255,0.3)"
              />
            ))}
          </svg>

          {/* Live indicator */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">LIVE</span>
          </div>
        </div>

        {/* Region Detail Panel */}
        {selectedRegion && (
          <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-white/10 w-72" data-testid="region-detail">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{REGIONS[selectedRegion].name}</h3>
              <button onClick={() => setSelectedRegion(null)} className="text-[#A8A29E] hover:text-white">
                ✕
              </button>
            </div>
            
            {/* Region stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <DollarSign className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                <p className="text-xs text-[#A8A29E]">G5 Distributed</p>
                <p className="font-semibold text-[#D4AF37]">{formatCurrency(getRegionStats(selectedRegion).total)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2 text-center">
                <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-[#A8A29E]">Citizens</p>
                <p className="font-semibold">{getRegionStats(selectedRegion).citizens.toLocaleString()}</p>
              </div>
            </div>

            {/* Advertiser breakdown */}
            <p className="text-xs text-[#A8A29E] mb-2">Advertiser Influence</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {getRegionStats(selectedRegion).data
                .sort((a, b) => parseFloat(b.influence_score || 0) - parseFloat(a.influence_score || 0))
                .map((d, i) => (
                  <div key={d.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getAdvertiserColor(i) }}
                      />
                      <span className="truncate">{d.advertisers?.business_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#D4AF37]">{formatCurrency(d.total_g5_distributed)}</span>
                      {d.rank_change > 0 && <TrendingUp className="w-3 h-3 text-green-400" />}
                      {d.rank_change < 0 && <TrendingDown className="w-3 h-3 text-red-400" />}
                      {d.rank_change === 0 && <Minus className="w-3 h-3 text-[#A8A29E]" />}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="p-4 border-t border-white/10 bg-[#050505]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Advertiser colors */}
            <div className="flex items-center gap-4">
              {advertisers.slice(0, 5).map((adv, i) => (
                <div key={adv.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getAdvertiserColor(i) }}
                  />
                  <span className="text-xs text-[#A8A29E]">{adv.business_name.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            {/* Stats summary */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#A8A29E]">Active Events:</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-green-400" />
                <span className="text-[#A8A29E]">Total Distributed:</span>
                <span className="font-semibold text-[#D4AF37]">
                  {formatCurrency(distribution.reduce((sum, d) => sum + parseFloat(d.total_g5_distributed || 0), 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regional Leaderboard */}
      <div className="p-4 border-t border-white/10">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#D4AF37]" />
          Regional Influence Leaderboard
        </h3>
        <div className="grid grid-cols-5 gap-2" data-testid="regional-leaderboard">
          {Object.entries(REGIONS).map(([key, region]) => {
            const stats = getRegionStats(key);
            const topAdv = getTopAdvertiserInRegion(key);
            
            return (
              <div 
                key={key}
                className={`bg-white/5 rounded-lg p-3 cursor-pointer transition hover:bg-white/10 ${
                  selectedRegion === key ? 'ring-2 ring-[#D4AF37]' : ''
                }`}
                onClick={() => setSelectedRegion(selectedRegion === key ? null : key)}
              >
                <p className="text-xs text-[#A8A29E] mb-1">{region.name}</p>
                <p className="font-bold text-[#D4AF37]">{formatCurrency(stats.total)}</p>
                {topAdv && (
                  <p className="text-xs text-green-400 truncate mt-1">
                    👑 {topAdv.advertisers?.business_name?.split(' ')[0]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MercyMap;
