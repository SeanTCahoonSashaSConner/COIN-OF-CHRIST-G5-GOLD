import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Clock, Flame, ChevronUp, ChevronDown, Coins, Upload, Heart, Music, AlertTriangle, Check, Award, Trophy, Triangle, Radio, ArrowRightLeft, BarChart3, Gem, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SabbathTone from './SabbathTone';
import SealLogo from './SealLogo';

const AudioPlayer = () => {
  // Day mode: 'weekday' (Mon-Fri), 'saturday' (Good Samaritan), 'sunday' (Sabbath)
  const getDayMode = () => {
    const day = new Date().getDay();
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return 'weekday';
  };

  const [dayMode, setDayMode] = useState(getDayMode());
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // TIV-TEK Verification State (weekdays only)
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCountdown, setVerificationCountdown] = useState(20); // 20 sec before window opens
  const [slideWindowCountdown, setSlideWindowCountdown] = useState(10); // 10 sec window to slide
  const [verificationPhase, setVerificationPhase] = useState('waiting'); // 'waiting', 'window_open', 'success', 'failed'
  const [showPenalty, setShowPenalty] = useState(false);
  
  // Session tracking
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // Saturday - Good Samaritan
  const [samaritanTask, setSamaritanTask] = useState(null);
  const [witnessFile, setWitnessFile] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  
  // Sunday - Sabbath
  const [sabbathActive, setSabbathActive] = useState(false);
  const [sabbathSeconds, setSabbathSeconds] = useState(0);
  const SABBATH_DURATION = 18 * 60; // 18 minutes in seconds
  
  // Ledger data
  const [ledgerData, setLedgerData] = useState({
    time_verified_hours: 0,
    treasure_balance: 0,
    hourly_rate: 13,
    track_streak_days: 0,
    pillar_1_streak: 0,
    pillar_2_streak: 0,
    pillar_3_streak: 0,
    perfect_90_day_count: 0,
    audio_position_seconds: 0
  });
  
  const [showLedger, setShowLedger] = useState(false);
  
  // Refs
  const sliderRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const verificationTimerRef = useRef(null);
  const slideWindowTimerRef = useRef(null);
  const sabbathTimerRef = useRef(null);
  const isDragging = useRef(false);

  // Fetch ledger data
  const fetchLedgerData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_ledger')
        .select('*')
        .limit(1)
        .maybeSingle(); // Use maybeSingle instead of single to avoid 406 errors

      if (error) {
        // Only log actual errors, not "no rows" errors
        if (error.code !== 'PGRST116') {
          console.log('Ledger fetch info:', error.message);
        }
        return;
      }

      if (data) {
        setLedgerData(prev => ({ ...prev, ...data }));
        setTotalHours(parseFloat(data.time_verified_hours) || 0);
        setCurrentProgress((parseFloat(data.time_verified_hours) || 0) % 33);
      }
      // If no data, keep defaults - user hasn't been set up yet
    } catch (err) {
      // Silently handle - app will work with defaults
      console.log('Using default ledger values');
    }
  }, []);

  useEffect(() => {
    fetchLedgerData();
    // Update day mode every minute
    const interval = setInterval(() => setDayMode(getDayMode()), 60000);
    return () => clearInterval(interval);
  }, [fetchLedgerData]);

  // ==================== SLIDER CONTROLS ====================
  const handleSliderStart = (e) => {
    isDragging.current = true;
    updateSliderPosition(e);
  };

  const handleSliderMove = (e) => {
    if (!isDragging.current) return;
    updateSliderPosition(e);
  };

  const handleSliderEnd = () => {
    isDragging.current = false;
    // Lower threshold during verification window for easier detection
    const threshold = verificationPhase === 'window_open' ? 70 : 85;
    if (sliderPosition >= threshold) {
      handleSlideComplete();
    } else {
      setSliderPosition(0);
    }
  };

  const updateSliderPosition = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  // ==================== SLIDE COMPLETE HANDLER ====================
  const handleSlideComplete = () => {
    setSliderPosition(0);
    
    if (dayMode === 'weekday') {
      if (!isPlaying) {
        // Start audio session
        startWeekdaySession();
      } else if (verificationPhase === 'window_open') {
        // Verification successful during the 10-second window - THIS IS THE KEY CHECK
        handleVerificationSuccess();
      } else if (verificationPhase === 'waiting') {
        // User wants to stop during countdown - allow it
        stopWeekdaySession();
      } else {
        // Stop session (success or other phase)
        stopWeekdaySession();
      }
    } else if (dayMode === 'saturday') {
      handleSaturdaySlide();
    } else if (dayMode === 'sunday') {
      handleSundaySlide();
    }
  };

  // ==================== WEEKDAY LOGIC (Mon-Fri) ====================
  const startWeekdaySession = () => {
    setIsPlaying(true);
    setVerificationPhase('waiting');
    setVerificationCountdown(20);
    setShowVerification(true);
    
    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    
    // Start 20-second countdown before verification window opens
    startVerificationCycle();
  };

  const startVerificationCycle = () => {
    setVerificationPhase('waiting');
    setVerificationCountdown(20);
    
    verificationTimerRef.current = setInterval(() => {
      setVerificationCountdown(prev => {
        if (prev <= 1) {
          clearInterval(verificationTimerRef.current);
          openSlideWindow();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const openSlideWindow = () => {
    setVerificationPhase('window_open');
    setSlideWindowCountdown(10);
    
    slideWindowTimerRef.current = setInterval(() => {
      setSlideWindowCountdown(prev => {
        if (prev <= 1) {
          clearInterval(slideWindowTimerRef.current);
          // At 31 second mark - PENALTY
          handleVerificationFailed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerificationSuccess = () => {
    clearInterval(slideWindowTimerRef.current);
    setVerificationPhase('success');
    
    // Log successful verification
    logVerification(true);
    
    // Show success briefly, then restart cycle
    setTimeout(() => {
      if (isPlaying) {
        startVerificationCycle();
      }
    }, 2000);
  };

  const handleVerificationFailed = () => {
    setVerificationPhase('failed');
    setShowPenalty(true);
    
    // Deduct 1 hour from ledger (not clock)
    applyPenalty();
    
    // Log failed verification
    logVerification(false);
    
    // Reset and continue (or stop based on preference)
    setTimeout(() => {
      setShowPenalty(false);
      if (isPlaying) {
        startVerificationCycle();
      }
    }, 3000);
  };

  const stopWeekdaySession = async () => {
    setIsPlaying(false);
    setShowVerification(false);
    clearInterval(sessionTimerRef.current);
    clearInterval(verificationTimerRef.current);
    clearInterval(slideWindowTimerRef.current);
    
    // Save progress
    await saveProgress();
    setSessionSeconds(0);
  };

  const logVerification = async (success) => {
    try {
      await supabase.from('verification_log').insert({
        disciple_id: ledgerData.disciple_id,
        verification_type: 'slide',
        triggered_at: new Date().toISOString(),
        responded_at: success ? new Date().toISOString() : null,
        success: success,
        penalty_hours: success ? 0 : 1,
        day_of_week: new Date().getDay()
      });
    } catch (err) {
      console.error('Log verification error:', err);
    }
  };

  const applyPenalty = async () => {
    try {
      const newHours = Math.max(0, totalHours - 1);
      await supabase
        .from('loyalty_ledger')
        .update({ 
          time_verified_hours: newHours,
          pillar_1_streak: 0 // Reset Pillar 1 streak on failure
        })
        .eq('disciple_id', ledgerData.disciple_id);
      
      setTotalHours(newHours);
      setCurrentProgress(newHours % 33);
      setLedgerData(prev => ({ ...prev, time_verified_hours: newHours, pillar_1_streak: 0 }));
    } catch (err) {
      console.error('Penalty error:', err);
    }
  };

  const saveProgress = async () => {
    const hoursToAdd = sessionSeconds / 3600;
    const newTotalHours = totalHours + hoursToAdd;
    
    try {
      const previousMilestones = Math.floor(totalHours / 33);
      const newMilestones = Math.floor(newTotalHours / 33);
      
      let newBalance = parseFloat(ledgerData.treasure_balance) || 0;
      if (newMilestones > previousMilestones) {
        const payout = 33 * ledgerData.hourly_rate;
        newBalance += payout;
      }

      await supabase
        .from('loyalty_ledger')
        .update({ 
          time_verified_hours: newTotalHours,
          treasure_balance: newBalance,
          audio_position_seconds: (ledgerData.audio_position_seconds || 0) + sessionSeconds
        })
        .eq('disciple_id', ledgerData.disciple_id);
      
      setTotalHours(newTotalHours);
      setCurrentProgress(newTotalHours % 33);
      setLedgerData(prev => ({ 
        ...prev, 
        time_verified_hours: newTotalHours, 
        treasure_balance: newBalance 
      }));
    } catch (err) {
      console.error('Save progress error:', err);
    }
  };

  // ==================== SATURDAY LOGIC (Good Samaritan) ====================
  const handleSaturdaySlide = async () => {
    if (!samaritanTask) {
      // Start Good Samaritan task
      const task = {
        disciple_id: ledgerData.disciple_id,
        task_date: new Date().toISOString().split('T')[0],
        started_at: new Date().toISOString(),
        status: 'in_progress'
      };
      
      try {
        const { data, error } = await supabase
          .from('good_samaritan_tasks')
          .insert(task)
          .select()
          .single();
        
        if (!error) {
          setSamaritanTask(data);
        }
      } catch (err) {
        console.error('Start task error:', err);
      }
    }
  };

  const handleWitnessUpload = async () => {
    if (!samaritanTask || !taskDescription) return;
    
    try {
      await supabase
        .from('good_samaritan_tasks')
        .update({
          completed_at: new Date().toISOString(),
          witness_description: taskDescription,
          status: 'completed'
        })
        .eq('id', samaritanTask.id);
      
      // Update pillar 2 streak
      await supabase
        .from('loyalty_ledger')
        .update({ 
          pillar_2_streak: (ledgerData.pillar_2_streak || 0) + 1 
        })
        .eq('disciple_id', ledgerData.disciple_id);
      
      setSamaritanTask(null);
      setTaskDescription('');
      alert('Good Samaritan task completed! God bless you.');
    } catch (err) {
      console.error('Complete task error:', err);
    }
  };

  // ==================== SUNDAY LOGIC (Sabbath 528 Hz) ====================
  const handleSundaySlide = () => {
    if (!sabbathActive) {
      // Start Sabbath session
      setSabbathActive(true);
      setSabbathSeconds(0);
      
      sabbathTimerRef.current = setInterval(() => {
        setSabbathSeconds(prev => {
          if (prev >= SABBATH_DURATION - 1) {
            clearInterval(sabbathTimerRef.current);
            completeSabbath();
            return SABBATH_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
      
      // Log sabbath start
      supabase.from('sabbath_sessions').insert({
        disciple_id: ledgerData.disciple_id,
        sabbath_date: new Date().toISOString().split('T')[0],
        started_at: new Date().toISOString()
      });
      
    } else if (sabbathSeconds >= SABBATH_DURATION) {
      // End sabbath (already complete)
      setSabbathActive(false);
    }
  };

  const completeSabbath = async () => {
    try {
      await supabase
        .from('sabbath_sessions')
        .update({
          completed_at: new Date().toISOString(),
          duration_seconds: SABBATH_DURATION,
          completed: true
        })
        .eq('disciple_id', ledgerData.disciple_id)
        .eq('sabbath_date', new Date().toISOString().split('T')[0]);
      
      // Update pillar 3 streak
      await supabase
        .from('loyalty_ledger')
        .update({ 
          pillar_3_streak: (ledgerData.pillar_3_streak || 0) + 1 
        })
        .eq('disciple_id', ledgerData.disciple_id);
      
      // Check for 90-day perfect streak and apply raise
      checkPerfectStreak();
    } catch (err) {
      console.error('Complete sabbath error:', err);
    }
  };

  // ==================== 90-DAY PERFECT STREAK CHECK ====================
  const checkPerfectStreak = async () => {
    const p1 = ledgerData.pillar_1_streak || 0;
    const p2 = ledgerData.pillar_2_streak || 0;
    const p3 = ledgerData.pillar_3_streak || 0;
    
    // All three pillars must have 90+ days
    const minStreak = Math.min(p1, p2, p3);
    const currentRaises = ledgerData.perfect_90_day_count || 0;
    const eligibleRaises = Math.floor(minStreak / 90);
    
    if (eligibleRaises > currentRaises) {
      // Apply $3 raise
      const newRate = 13 + (eligibleRaises * 3);
      
      await supabase
        .from('loyalty_ledger')
        .update({ 
          hourly_rate: newRate,
          perfect_90_day_count: eligibleRaises
        })
        .eq('disciple_id', ledgerData.disciple_id);
      
      setLedgerData(prev => ({ 
        ...prev, 
        hourly_rate: newRate, 
        perfect_90_day_count: eligibleRaises 
      }));
      
      alert(`Congratulations! You've earned a $3 raise! New rate: $${newRate}/hr`);
    }
  };

  // ==================== FORMAT HELPERS ====================
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatMinSec = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==================== RENDER ====================
  // Live atomic clock for the ATOMIC TIME / GPSDO card
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(tick);
  }, []);

  const atomicTime = `${now.getUTCHours().toString().padStart(2,'0')}:${now.getUTCMinutes().toString().padStart(2,'0')}:${now.getUTCSeconds().toString().padStart(2,'0')}`;
  const atomicDecimal = Math.floor(now.getUTCMilliseconds() / 100);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAF9] relative" data-testid="audio-player-screen">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* ============ TITLE ============ */}
        <div className="flex flex-col items-center gap-1 pt-2">
          <div className="flex items-center justify-center gap-4">
            <Triangle className="w-7 h-7 text-[#D4AF37]" />
            <h1
              className="font-bold tracking-[0.18em] text-3xl md:text-4xl text-center"
              style={{
                fontFamily: "'Cinzel', serif",
                background: 'linear-gradient(180deg,#FFE066 0%,#F5C842 40%,#D4AF37 70%,#8B6914 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.4))',
              }}
              data-testid="coin-of-christ-title"
            >
              THE COIN of CHRIST
            </h1>
            <Triangle className="w-7 h-7 text-[#D4AF37]" style={{ transform: 'rotate(180deg)' }} />
          </div>
          <p
            className="text-2xl md:text-3xl tracking-[0.3em] mt-1"
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 800,
              background: 'linear-gradient(180deg,#FFF1A8 0%,#FFE066 30%,#F5C842 60%,#D4AF37 90%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.4))',
            }}
            data-testid="g5-gold-subtitle"
          >
            G5 GOLD
          </p>
        </div>
        <p className="text-center text-xs tracking-[0.35em] text-[#A8A29E] uppercase">
          Verified Human Presence Protocol
        </p>

        {/* ============ SEAL OF AUTHORITY — large, centered, in open space ============ */}
        <div className="flex justify-center py-2" data-testid="seal-of-authority">
          <SealLogo variant="hero" withCaption={true} />
        </div>

        {/* ============ DAY MODE BADGE ============ */}
        <div className="flex justify-center">
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase ${
            dayMode === 'weekday' ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40' :
            dayMode === 'saturday' ? 'bg-green-500/15 text-green-400 border border-green-500/40' :
            'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/40'
          }`}>
            {dayMode === 'weekday' && 'Scripture Day'}
            {dayMode === 'saturday' && 'Good Samaritan Day'}
            {dayMode === 'sunday' && 'Sabbath Day'}
          </div>
        </div>

        {/* ============ CARD 1 — ATOMIC TIME / GPSDO ============ */}
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-5" data-testid="card-atomic-time">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#A8A29E]">
              <Radio className="w-4 h-4 text-[#D4AF37]" />
              Atomic Time / GPSDO
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-green-400 font-bold">
              ● Synced
            </span>
          </div>
          <div className="text-center">
            <p className="font-mono text-4xl md:text-5xl tracking-wider text-[#FAFAF9]">
              <span className="wb-num">{atomicTime}</span>
              <span className="text-[#3B82F6] text-2xl">.<span className="wb-num">{atomicDecimal}</span></span>
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#A8A29E] mt-2">
              UTC — Fixed/DO Disciplined Oscillator
            </p>
          </div>
        </div>

        {/* ============ CARD 2 — HUMAN VERIFICATION (slide-to-walk) ============ */}
        <div className={`rounded-2xl bg-[#0d0d0d] p-5 transition ${
          verificationPhase === 'window_open' ? 'border-2 border-[#D4AF37] gold-glow' :
          verificationPhase === 'failed' ? 'border-2 border-red-500' :
          verificationPhase === 'success' ? 'border-2 border-green-500' :
          'border border-[#1f1f1f]'
        }`} data-testid="card-human-verification">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#A8A29E]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              Human Verification
            </div>
            <span className="text-[#D4AF37] font-mono text-lg" data-testid="verification-countdown">
              {verificationPhase === 'window_open'
                ? <><span className="wb-num">{slideWindowCountdown}</span>s</>
                : <><span className="wb-num">{verificationCountdown}</span>s</>}
            </span>
          </div>

          {/* SLIDE-TO-WALK button */}
          <div
            ref={sliderRef}
            className="h-16 rounded-full relative flex items-center px-1.5 bg-[#1a1a1a] border border-[#2a2a2a] cursor-pointer overflow-hidden"
            onMouseDown={handleSliderStart}
            onMouseMove={handleSliderMove}
            onMouseUp={handleSliderEnd}
            onMouseLeave={handleSliderEnd}
            onTouchStart={handleSliderStart}
            onTouchMove={handleSliderMove}
            onTouchEnd={handleSliderEnd}
            data-testid="walk-slider"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center absolute transition-none font-bold text-black text-lg ${
                verificationPhase === 'window_open'
                  ? 'bg-gradient-to-b from-red-500 to-red-700 text-white animate-pulse'
                  : 'bg-gradient-to-b from-[#FFE066] to-[#D4AF37]'
              }`}
              style={{
                left: `calc(${sliderPosition}% - ${sliderPosition * 0.5}px + 6px)`,
                boxShadow: '0 0 16px rgba(212,175,55,0.65)',
              }}
              data-testid="walk-button"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : 'W'}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pl-12">
              <div className="flex items-center gap-2 text-[#5a5a5a] text-sm tracking-[0.25em] font-medium">
                <span>›</span><span>›</span><span>›</span>
                <span className="ml-1 uppercase">
                  {verificationPhase === 'window_open' ? 'Slide Now' :
                   isPlaying ? 'Slide to stop' :
                   'Slide to Walk'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-[#A8A29E] mt-3 italic">
            Mandatory verification — confirms human presence
          </p>
        </div>

        {/* ============ CARD 3 — OFFLINE TOKEN ============ */}
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-5" data-testid="card-offline-token">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#A8A29E]">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              Offline Token
            </div>
            <span className="text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#A8A29E]">
              Not A Cryptocurrency
            </span>
          </div>
          <div className="text-center my-2">
            <div className="w-16 h-16 mx-auto rounded-xl bg-[#D4AF37] flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(212,175,55,0.55)' }}>
              <span className="text-black text-3xl font-bold">G</span>
            </div>
            <p className="text-sm text-[#A8A29E] mt-2 italic"><span className="g5-gold">G5 GOLD</span> loyalty tokens earned</p>
            <p className="text-2xl font-semibold text-[#D4AF37] mt-1" data-testid="gold-balance">
              $<span className="wb-num">{parseFloat(ledgerData.treasure_balance || 0).toFixed(2)}</span>
            </p>
          </div>
          <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1f1f1f]">
            <span className="text-[#A8A29E]">Today's verifications</span>
            <span className="text-[#D4AF37] font-mono"><span className="wb-num">0</span></span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#A8A29E] mt-2">
            <ArrowRightLeft className="w-3 h-3" />
            Linked: <span className="font-mono text-[#3B82F6]">countryofchrist.sol</span> — Advertiser Verification
          </div>
        </div>

        {/* ============ CARD 4 — REPUTATION SCORE ============ */}
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-5 text-center" data-testid="card-reputation">
          <p className="text-xs tracking-[0.3em] uppercase text-[#A8A29E] mb-3">Reputation Score</p>
          <div className="w-16 h-16 mx-auto rounded-xl bg-[#D4AF37] flex items-center justify-center mb-3" style={{ boxShadow: '0 0 20px rgba(212,175,55,0.55)' }}>
            <span className="text-black text-3xl font-bold">G</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1f1f1f] overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFE066]"
              style={{ width: `${Math.min(100, (currentProgress / 33) * 100)}%`, boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}
              data-testid="reputation-bar"
            />
          </div>
          <p className="text-[#A8A29E] text-xs">
            <span className="text-[#D4AF37] font-bold tracking-widest">G.O.D.</span> — Great God Give Good Grace
          </p>
        </div>

        {/* ============ CARD 5 — FIVE PILLARS ============ */}
        <div className="grid grid-cols-5 gap-2" data-testid="five-pillars-grid">
          {[
            { label: 'TALENT', icon: <Award className="w-5 h-5 text-[#D4AF37]" /> },
            { label: 'TIME', icon: <Clock className="w-5 h-5 text-[#3B82F6]" /> },
            { label: 'TREASURE', icon: <Gem className="w-5 h-5 text-red-400" /> },
            { label: 'TRANSACTION', icon: <ArrowRightLeft className="w-5 h-5 text-green-400" /> },
            { label: 'TRACK', icon: <BarChart3 className="w-5 h-5 text-[#A8A29E]" /> },
          ].map((p) => (
            <div key={p.label} className="rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] p-3 flex flex-col items-center gap-1">
              {p.icon}
              <div className="w-8 h-8 rounded-md bg-[#D4AF37] flex items-center justify-center mt-1" style={{ boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}>
                <span className="text-black font-bold text-sm">G</span>
              </div>
              <p className="text-[9px] tracking-[0.18em] text-[#A8A29E] mt-1">{p.label}</p>
            </div>
          ))}
        </div>

        {/* ============ CARD 6 — THE 5TH LETTER · G ============ */}
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-6 text-center" data-testid="card-fifth-letter">
          <p className="text-xs tracking-[0.3em] uppercase text-[#A8A29E] mb-4">The 5th Letter — G</p>
          <p className="text-3xl font-bold tracking-[0.5em]">
            <span className="g5-gold">G</span>
            <span className="text-[#A8A29E]"> · </span>
            <span className="g5-gold">O</span>
            <span className="text-[#A8A29E]"> · </span>
            <span className="g5-gold">D</span>
          </p>
          <p className="text-sm text-[#A8A29E] mt-3 italic">Great God Give Good Grace</p>
          <p className="text-[10px] tracking-[0.25em] text-[#A8A29E] mt-4">
            TALENT · TIME · TREASURE · TRANSACTION · TRACK
          </p>
        </div>

        {/* ============ SATURDAY / SUNDAY view (preserved) ============ */}
        {dayMode === 'saturday' && (
          <div className="rounded-2xl bg-[#0d0d0d] border border-green-500/30 p-5 space-y-3" data-testid="saturday-card">
            <div className="text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <h2 className="text-xl font-serif">Good Samaritan Day</h2>
              <p className="text-[#A8A29E] text-sm">Perform one act of kindness and document it</p>
            </div>
            {samaritanTask ? (
              <>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Describe your Good Samaritan act..."
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 text-white placeholder-[#5a5a5a] resize-none h-24"
                  data-testid="samaritan-description"
                />
                <button
                  onClick={handleWitnessUpload}
                  disabled={!taskDescription}
                  className="w-full py-3 rounded-xl bg-green-500 text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="submit-samaritan"
                >
                  <Upload className="w-5 h-5" />
                  Submit Witness
                </button>
              </>
            ) : (
              <p className="text-center text-[#A8A29E] text-sm">Slide above to begin your task</p>
            )}
          </div>
        )}

        {dayMode === 'sunday' && (
          <div className="rounded-2xl bg-[#0d0d0d] border border-[#3B82F6]/30 p-5 space-y-3" data-testid="sunday-card">
            {!sabbathActive ? (
              <div className="text-center">
                <Music className="w-12 h-12 text-[#3B82F6] mx-auto mb-2" />
                <h2 className="text-xl font-serif">Sabbath Restoration</h2>
                <p className="text-[#A8A29E] text-sm">
                  <span className="wb-num">18</span>-minute <span className="wb-num">528</span> Hz DNA restoration tone
                </p>
                <p className="text-[#A8A29E] mt-2 text-xs">Slide above to begin</p>
              </div>
            ) : (
              <SabbathTone onComplete={completeSabbath} />
            )}
          </div>
        )}

        {/* ============ EXPANDABLE LEDGER ============ */}
        <button
          onClick={() => setShowLedger(!showLedger)}
          className="w-full rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-4 flex items-center justify-between"
          data-testid="ledger-toggle"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
              <Coins className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8A29E]">Three Pillars Ledger</p>
              <p className="text-sm text-[#FAFAF9]">
                <span className="wb-num">{(ledgerData.pillar_1_streak || 0)}</span>·<span className="wb-num">{(ledgerData.pillar_2_streak || 0)}</span>·<span className="wb-num">{(ledgerData.pillar_3_streak || 0)}</span> day streak
              </p>
            </div>
          </div>
          {showLedger ? <ChevronDown className="w-5 h-5 text-[#A8A29E]" /> : <ChevronUp className="w-5 h-5 text-[#A8A29E]" />}
        </button>

        {showLedger && (
          <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-5 space-y-4" data-testid="ledger-card">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-xl bg-[#1a1a1a]">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8A29E] mb-1">Total Hours</p>
                <p className="text-2xl font-semibold"><span className="wb-num">{totalHours.toFixed(1)}</span></p>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#1a1a1a]">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8A29E] mb-1">Hourly Rate</p>
                <p className="text-2xl font-semibold text-[#D4AF37]">$<span className="wb-num">{ledgerData.hourly_rate}</span>/hr</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <p className="text-[10px] text-[#A8A29E]">Verification</p>
                <p className="text-lg font-semibold text-[#D4AF37]"><span className="wb-num">{ledgerData.pillar_1_streak || 0}</span></p>
              </div>
              <div className="text-center p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-[10px] text-[#A8A29E]">Samaritan</p>
                <p className="text-lg font-semibold text-green-400"><span className="wb-num">{ledgerData.pillar_2_streak || 0}</span></p>
              </div>
              <div className="text-center p-2 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                <p className="text-[10px] text-[#A8A29E]">Sabbath</p>
                <p className="text-lg font-semibold text-[#3B82F6]"><span className="wb-num">{ledgerData.pillar_3_streak || 0}</span></p>
              </div>
            </div>
            <p className="text-xs text-center text-[#A8A29E]">
              <span className="wb-num">{ledgerData.perfect_90_day_count || 0}</span> raises earned • Next at <span className="wb-num">90</span> perfect days
            </p>
          </div>
        )}
      </div>

      {/* ============ PENALTY MODAL ============ */}
      {showPenalty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <div className="rounded-3xl bg-[#0d0d0d] border-2 border-red-500/50 p-8 w-full max-w-sm" data-testid="penalty-modal">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-center text-red-500 mb-2">Repentance Penalty</h2>
            <p className="text-center text-[#A8A29E]">
              <span className="wb-num">1</span> hour deducted from your ledger.
            </p>
            <p className="text-center text-xs text-[#A8A29E] mt-4">
              The atomic time ledger has recorded this verification failure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
