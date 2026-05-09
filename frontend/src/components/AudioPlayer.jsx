import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Clock, Flame, ChevronUp, ChevronDown, Coins, Upload, Heart, Music, AlertTriangle, Check, Award, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SabbathTone from './SabbathTone';

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
  return (
    <div className="min-h-screen relative overflow-hidden" data-testid="audio-player-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/7360548/pexels-photo-7360548.jpeg"
          alt="Walking with Christ"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-6 pb-8">
        
        {/* Header - Day Mode Indicator */}
        <div className="w-full max-w-md space-y-3">
          {/* Day Mode Badge */}
          <div className="flex justify-center">
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${
              dayMode === 'weekday' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
              dayMode === 'saturday' ? 'bg-green-500/20 text-green-400' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {dayMode === 'weekday' && '📖 Scripture Day'}
              {dayMode === 'saturday' && '🤝 Good Samaritan Day'}
              {dayMode === 'sunday' && '🙏 Sabbath Day'}
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="glass rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm text-[#A8A29E]">Session</span>
              <span className="font-mono text-[#FAFAF9]" data-testid="session-timer">
                {dayMode === 'sunday' ? formatMinSec(sabbathSeconds) : formatTime(sessionSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm" data-testid="streak-days">
                {ledgerData.track_streak_days || 0}d
              </span>
            </div>
          </div>
        </div>

        {/* Center Content - Changes based on day */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          
          {/* WEEKDAY VIEW */}
          {dayMode === 'weekday' && (
            <>
              <div className="text-center">
                <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#D4AF37] mb-2">
                  Progress to Payout
                </p>
                <p className="text-4xl font-light font-serif text-shadow" data-testid="hours-progress">
                  {currentProgress.toFixed(1)} / 33 hrs
                </p>
              </div>

              <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-500"
                  style={{ width: `${(currentProgress / 33) * 100}%` }}
                  data-testid="progress-bar"
                />
              </div>

              {/* TIV-TEK Verification Display */}
              {isPlaying && showVerification && (
                <div className={`glass rounded-2xl p-4 w-full text-center ${
                  verificationPhase === 'window_open' ? 'border-2 border-[#D4AF37] animate-pulse' :
                  verificationPhase === 'failed' ? 'border-2 border-red-500' :
                  verificationPhase === 'success' ? 'border-2 border-green-500' : ''
                }`} data-testid="tivtek-verification">
                  {verificationPhase === 'waiting' && (
                    <>
                      <p className="text-xs text-[#A8A29E] mb-1">Next verification in</p>
                      <p className="text-3xl font-mono text-[#D4AF37]">{verificationCountdown}s</p>
                    </>
                  )}
                  {verificationPhase === 'window_open' && (
                    <>
                      <p className="text-xs text-[#D4AF37] mb-1 font-bold">⚡ SLIDE NOW!</p>
                      <p className="text-3xl font-mono text-white">{slideWindowCountdown}s</p>
                      <p className="text-xs text-red-400 mt-1">Penalty at <span className="wb-num"><span className="wb-num">0</span></span>!</p>
                    </>
                  )}
                  {verificationPhase === 'success' && (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <Check className="w-6 h-6" />
                      <span>Verified!</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* SATURDAY VIEW - Good Samaritan */}
          {dayMode === 'saturday' && (
            <div className="w-full space-y-4">
              <div className="text-center">
                <Heart className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-serif text-shadow mb-2">Good Samaritan Day</h2>
                <p className="text-[#A8A29E] text-sm">
                  Perform one act of kindness and document it
                </p>
              </div>

              {samaritanTask ? (
                <div className="glass rounded-2xl p-6 space-y-4">
                  <p className="text-center text-green-400 font-semibold">Task in Progress</p>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe your Good Samaritan act..."
                    className="w-full bg-white/10 rounded-xl p-4 text-white placeholder-[#A8A29E] resize-none h-24"
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
                </div>
              ) : (
                <p className="text-center text-[#A8A29E]">Slide to begin your task</p>
              )}
            </div>
          )}

          {/* SUNDAY VIEW - Sabbath 528 Hz */}
          {dayMode === 'sunday' && (
            <div className="w-full space-y-4">
              {!sabbathActive ? (
                <div className="text-center">
                  <Music className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-serif text-shadow mb-2">Sabbath Restoration</h2>
                  <p className="text-[#A8A29E] text-sm mb-4">
                    <span className="wb-num">18</span>-minute <span className="wb-num">528</span> Hz DNA restoration tone
                  </p>
                  <p className="text-[#A8A29E]">Slide to begin Sabbath session</p>
                </div>
              ) : (
                <SabbathTone onComplete={completeSabbath} />
              )}
            </div>
          )}

          {/* WALK/SLIDE BUTTON */}
          <div className="w-full max-w-xs">
            <div 
              ref={sliderRef}
              className={`h-20 rounded-full relative flex items-center px-2 cursor-pointer ${
                isPlaying || sabbathActive || samaritanTask
                  ? 'bg-black/60 border-2 border-[#D4AF37]' 
                  : 'bg-black/40 border border-white/20'
              } backdrop-blur-md`}
              onMouseDown={handleSliderStart}
              onMouseMove={handleSliderMove}
              onMouseUp={handleSliderEnd}
              onMouseLeave={handleSliderEnd}
              onTouchStart={handleSliderStart}
              onTouchMove={handleSliderMove}
              onTouchEnd={handleSliderEnd}
              data-testid="walk-slider"
            >
              {/* Slider handle */}
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center absolute transition-none ${
                  verificationPhase === 'window_open' 
                    ? 'bg-gradient-to-b from-red-500 to-red-700 animate-pulse' 
                    : 'bg-gradient-to-b from-[#D4AF37] to-[#B48E2D]'
                } gold-glow`}
                style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.64}px + 8px)` }}
                data-testid="walk-button"
              >
                {isPlaying || sabbathActive ? (
                  <Pause className="w-8 h-8 text-black" />
                ) : (
                  <Play className="w-8 h-8 text-black ml-1" />
                )}
              </div>
              
              {/* Slide text */}
              <span className="absolute inset-0 flex items-center justify-center text-sm text-[#A8A29E] pointer-events-none pl-16">
                {sliderPosition < 30 && (
                  verificationPhase === 'window_open' ? 'SLIDE NOW! →' :
                  isPlaying || sabbathActive ? 'Slide to stop →' : 
                  'Slide to walk →'
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom - Ledger */}
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowLedger(!showLedger)}
            className="w-full glass rounded-2xl p-4 flex items-center justify-between"
            data-testid="ledger-toggle"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#A8A29E]"><span className="g5-gold">G5 GOLD</span> Balance</p>
                <p className="text-xl font-semibold text-[#D4AF37]" data-testid="gold-balance">
                  ${parseFloat(ledgerData.treasure_balance || 0).toFixed(2)}
                </p>
              </div>
            </div>
            {showLedger ? <ChevronDown className="w-6 h-6 text-[#A8A29E]" /> : <ChevronUp className="w-6 h-6 text-[#A8A29E]" />}
          </button>

          {showLedger && (
            <div className="glass rounded-2xl p-6 mt-4 space-y-4" data-testid="ledger-card">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <p className="text-xs text-[#A8A29E] mb-1">Total Hours</p>
                  <p className="text-2xl font-semibold">{totalHours.toFixed(1)}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <p className="text-xs text-[#A8A29E] mb-1">Hourly Rate</p>
                  <p className="text-2xl font-semibold text-[#D4AF37]">${ledgerData.hourly_rate}/hr</p>
                </div>
              </div>
              
              {/* Three Pillars */}
              <div className="space-y-2">
                <p className="text-xs text-[#A8A29E] text-center">TIV-TEK Trinity Pillars (<span className="wb-num"><span className="wb-num">90</span></span>-day streaks)</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-[#D4AF37]/10 rounded-xl">
                    <p className="text-xs text-[#A8A29E]">Verification</p>
                    <p className="text-lg font-semibold text-[#D4AF37]">{ledgerData.pillar_1_streak || 0}</p>
                  </div>
                  <div className="text-center p-2 bg-green-500/10 rounded-xl">
                    <p className="text-xs text-[#A8A29E]">Samaritan</p>
                    <p className="text-lg font-semibold text-green-400">{ledgerData.pillar_2_streak || 0}</p>
                  </div>
                  <div className="text-center p-2 bg-purple-500/10 rounded-xl">
                    <p className="text-xs text-[#A8A29E]">Sabbath</p>
                    <p className="text-lg font-semibold text-purple-400">{ledgerData.pillar_3_streak || 0}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-center text-[#A8A29E]">
                {ledgerData.perfect_90_day_count || 0} raises earned • Next at 90 perfect days
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Penalty Modal */}
      {showPenalty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="glass rounded-3xl p-8 w-full max-w-sm border-red-500/50 border-2" data-testid="penalty-modal">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-center text-red-500 mb-2">
              Repentance Penalty
            </h2>
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
