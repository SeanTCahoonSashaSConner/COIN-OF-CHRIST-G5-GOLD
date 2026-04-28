import React, { useState, useEffect, useCallback } from 'react';
import { 
  Award, Star, Trophy, Lock, Check, Flame, Heart, 
  Headphones, Moon, Sun, Sparkles, Crown
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Achievements = ({ discipleId }) => {
  const [achievements, setAchievements] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchAchievements = useCallback(async () => {
    try {
      // Fetch achievement definitions
      const { data: defData } = await supabase
        .from('achievement_definitions')
        .select('*')
        .order('category');
      
      if (defData) setDefinitions(defData);

      // Fetch user's achievements if discipleId provided
      if (discipleId) {
        const { data: achData } = await supabase
          .from('citizen_achievements')
          .select('*')
          .eq('disciple_id', discipleId);
        
        if (achData) {
          setAchievements(achData);
          const points = achData
            .filter(a => a.is_completed)
            .reduce((sum, a) => sum + (a.g5_reward || 0), 0);
          setTotalPoints(points);
        }
      }
    } catch (err) {
      console.log('Fetch error:', err);
    }
  }, [discipleId]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'listening', label: 'Listening', icon: Headphones },
    { id: 'streak', label: 'Streaks', icon: Flame },
    { id: 'samaritan', label: 'Service', icon: Heart },
    { id: 'sabbath', label: 'Sabbath', icon: Moon },
    { id: 'special', label: 'Special', icon: Star },
  ];

  const getTierColor = (tier) => {
    switch(tier) {
      case 'bronze': return 'from-amber-700 to-amber-900 border-amber-600';
      case 'silver': return 'from-gray-300 to-gray-500 border-gray-400';
      case 'gold': return 'from-yellow-400 to-amber-500 border-yellow-500';
      case 'platinum': return 'from-cyan-300 to-blue-400 border-cyan-400';
      case 'divine': return 'from-purple-400 to-pink-500 border-purple-500';
      default: return 'from-gray-600 to-gray-800 border-gray-500';
    }
  };

  const getTierReward = (def, tier) => {
    switch(tier) {
      case 'bronze': return def.bronze_reward;
      case 'silver': return def.silver_reward;
      case 'gold': return def.gold_reward;
      case 'platinum': return def.platinum_reward;
      case 'divine': return def.divine_reward;
      default: return 0;
    }
  };

  const getTierRequirement = (def, tier) => {
    switch(tier) {
      case 'bronze': return def.bronze_requirement;
      case 'silver': return def.silver_requirement;
      case 'gold': return def.gold_requirement;
      case 'platinum': return def.platinum_requirement;
      case 'divine': return def.divine_requirement;
      default: return 0;
    }
  };

  const getUserProgress = (badgeId) => {
    const ach = achievements.find(a => a.badge_id === badgeId);
    return ach || { current_progress: 0, badge_tier: null, is_completed: false };
  };

  const getCurrentTier = (def, progress) => {
    if (progress >= def.divine_requirement) return 'divine';
    if (progress >= def.platinum_requirement) return 'platinum';
    if (progress >= def.gold_requirement) return 'gold';
    if (progress >= def.silver_requirement) return 'silver';
    if (progress >= def.bronze_requirement) return 'bronze';
    return null;
  };

  const getNextTierProgress = (def, progress) => {
    const tiers = [
      { name: 'bronze', req: def.bronze_requirement },
      { name: 'silver', req: def.silver_requirement },
      { name: 'gold', req: def.gold_requirement },
      { name: 'platinum', req: def.platinum_requirement },
      { name: 'divine', req: def.divine_requirement },
    ];

    for (const tier of tiers) {
      if (progress < tier.req) {
        return { nextTier: tier.name, required: tier.req, percentage: (progress / tier.req) * 100 };
      }
    }
    return { nextTier: 'max', required: def.divine_requirement, percentage: 100 };
  };

  const filteredDefinitions = definitions.filter(def => 
    selectedCategory === 'all' || def.category === selectedCategory
  );

  return (
    <div className="space-y-6" data-testid="achievements-panel">
      {/* Header Stats */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif text-[#D4AF37] flex items-center gap-3">
              <Trophy className="w-7 h-7" />
              Achievements
            </h2>
            <p className="text-[#A8A29E]">Your journey with Christ</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#D4AF37]">{totalPoints}</p>
            <p className="text-sm text-[#A8A29E]">G5 GOLD Earned</p>
          </div>
        </div>

        {/* Tier Progress Overview */}
        <div className="grid grid-cols-5 gap-2 mt-6">
          {['bronze', 'silver', 'gold', 'platinum', 'divine'].map(tier => {
            const count = achievements.filter(a => a.badge_tier === tier && a.is_completed).length;
            return (
              <div key={tier} className="text-center p-2 bg-white/5 rounded-lg">
                <div className={`w-8 h-8 mx-auto rounded-full bg-gradient-to-b ${getTierColor(tier)} flex items-center justify-center mb-1`}>
                  {tier === 'divine' ? <Crown className="w-4 h-4 text-white" /> : 
                   tier === 'platinum' ? <Star className="w-4 h-4 text-white" /> :
                   <Award className="w-4 h-4 text-white" />}
                </div>
                <p className="text-xs capitalize">{tier}</p>
                <p className="text-lg font-bold">{count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition ${
              selectedCategory === cat.id 
                ? 'bg-[#D4AF37] text-black' 
                : 'bg-white/5 text-[#A8A29E] hover:bg-white/10'
            }`}
            data-testid={`category-${cat.id}`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="achievement-grid">
        {filteredDefinitions.map(def => {
          const progress = getUserProgress(def.badge_id);
          const currentTier = getCurrentTier(def, progress.current_progress);
          const nextProgress = getNextTierProgress(def, progress.current_progress);

          return (
            <div 
              key={def.badge_id}
              className={`glass rounded-2xl p-5 border ${
                currentTier ? `border-${currentTier === 'divine' ? 'purple' : currentTier === 'gold' ? 'yellow' : 'white'}-500/30` : 'border-white/10'
              }`}
              data-testid={`achievement-${def.badge_id}`}
            >
              <div className="flex items-start gap-4">
                {/* Badge Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                  currentTier 
                    ? `bg-gradient-to-b ${getTierColor(currentTier)}` 
                    : 'bg-white/10'
                }`}>
                  {def.badge_icon}
                </div>

                {/* Badge Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{def.badge_name}</h3>
                    {currentTier && (
                      <span className={`px-2 py-0.5 text-xs rounded-full capitalize bg-gradient-to-r ${getTierColor(currentTier)} text-white`}>
                        {currentTier}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#A8A29E] mb-3">{def.badge_description}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#A8A29E]">
                        Progress: {progress.current_progress} / {nextProgress.required}
                      </span>
                      {nextProgress.nextTier !== 'max' && (
                        <span className="text-[#D4AF37]">
                          Next: {nextProgress.nextTier} (+{getTierReward(def, nextProgress.nextTier)} G5)
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          currentTier 
                            ? `bg-gradient-to-r ${getTierColor(currentTier)}` 
                            : 'bg-[#D4AF37]'
                        }`}
                        style={{ width: `${Math.min(nextProgress.percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Tier Milestones */}
                  <div className="flex items-center gap-1 mt-3">
                    {['bronze', 'silver', 'gold', 'platinum', 'divine'].map(tier => {
                      const req = getTierRequirement(def, tier);
                      const achieved = progress.current_progress >= req;
                      return (
                        <div 
                          key={tier}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            achieved 
                              ? `bg-gradient-to-b ${getTierColor(tier)}` 
                              : 'bg-white/10'
                          }`}
                          title={`${tier}: ${req} required`}
                        >
                          {achieved ? (
                            <Check className="w-3 h-3 text-white" />
                          ) : (
                            <Lock className="w-3 h-3 text-[#A8A29E]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
