import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Clock, Gem, ArrowRightLeft, BarChart3, 
  Play, Pause, Lock, ShieldAlert 
} from 'lucide-react';

export default function AudioPlayer() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Constants (in seconds)
  const CAP_33_HOURS = 33 * 3600; // 118,800 seconds
  const COOLDOWN_48_HOURS = 48 * 3600; // 172,800 seconds

  // Persistent User State (localStorage)
  const [totalListenedSecs, setTotalListenedSecs] = useState(() => {
    return Number(localStorage.getItem('g5_total_listened_secs')) || 0;
  });
  const [cooldownStartTime, setCooldownStartTime] = useState(() => {
    return Number(localStorage.getItem('g5_cooldown_start_time')) || null;
  });
  const [savedAudioPosition, setSavedAudioPosition] = useState(() => {
    return Number(localStorage.getItem('g5_saved_audio_pos')) || 0;
  });

  // Player & Loop State
  const [isPlaying, setIsPlaying] = useState(false);
  const [cyclePlaytime, setCyclePlaytime] = useState(0); // 20s chunk tracker
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowTimeLeft, setWindowTimeLeft] = useState(10);
  const [sliderPos, setSliderPos] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [showPenalty, setShowPenalty] = useState(false);
  const [tokensEarned, setTokensEarned] = useState(() => {
    return Number(localStorage.getItem('g5_tokens_earned')) || 0.00;
  });

  // Atomic Clock / Cooldown Remaining
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cooldownRemainingSecs, setCooldownRemainingSecs] = useState(0);

  // Public Domain KJV Bible Stream Source
  const bibleAudioSrc = "https://ebible.org/eng-web/audio/01_Genesis/B01___01_Genesis_____ENGWEBO2DA.mp3";

  // 1. GPSDO Clock & 48-Hour Cooldown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(new Date());

      if (cooldownStartTime) {
        const elapsedSecs = Math.floor((now - cooldownStartTime) / 1000);
        const remaining = COOLDOWN_48_HOURS - elapsedSecs;

        if (remaining <= 0) {
          // 48 Hours Expired -> Unlock and reset 33-hour cap
          setCooldownStartTime(null);
          setTotalListenedSecs(0);
          setCooldownRemainingSecs(0);
          localStorage.removeItem('g5_cooldown_start_time');
          localStorage.setItem('g5_total_listened_secs', 0);
        } else {
          setCooldownRemainingSecs(remaining);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownStartTime]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('g5_total_listened_secs', totalListenedSecs);
    localStorage.setItem('g5_saved_audio_pos', savedAudioPosition);
    localStorage.setItem('g5_tokens_earned', tokensEarned);
  }, [totalListenedSecs, savedAudioPosition, tokensEarned]);

  // 2. Corrected Timing Loop: 20s Audio / 30s Pause Cycle
  useEffect(() => {
    let interval = null;

    if (isPlaying && !isWindowOpen && !cooldownStartTime) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setSavedAudioPosition(audioRef.current.currentTime);
        }

        setTotalListenedSecs((prev) => {
          const next = prev + 1;
          if (next >= CAP_33_HOURS) {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
            const now = Date.now();
            setCooldownStartTime(now);
            localStorage.setItem('g5_cooldown_start_time', now);
            return CAP_33_HOURS;
          }
          return next;
        });

        setCyclePlaytime((prev) => {
          const next = prev + 1;
          // At 20 seconds: Pause audio and open 10s slider window
          if (next >= 20) {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
            setIsWindowOpen(true);
            setWindowTimeLeft(10);
          }
          return next;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isWindowOpen, cooldownStartTime]);

  // 3. 10-Second Verification Window Countdown
  useEffect(() => {
    let timer = null;
    if (isWindowOpen && windowTimeLeft > 0) {
      timer = setInterval(() => setWindowTimeLeft((prev) => prev - 1), 1000);
    } else if (isWindowOpen && windowTimeLeft === 0) {
      // Missed Verification Penalty
      setIsWindowOpen(false);
      setShowPenalty(true);
      setSliderPos(0);

      // Wait out remainder of the 30s pause window before resuming
      setTimeout(() => {
        setShowPenalty(false);
        if (!cooldownStartTime && audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          setCyclePlaytime(0);
        }
      }, 20000);
    }

    return () => clearInterval(timer);
  }, [isWindowOpen, windowTimeLeft, cooldownStartTime]);

  // Toggle Play/Stop (Resumes strictly at saved position)
  const togglePlay = () => {
    if (cooldownStartTime) return; // Locked during 48-hr cooldown

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setSavedAudioPosition(audioRef.current.currentTime);
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = savedAudioPosition;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  // Lock Seeker (Anti-Rewind / Anti-Fast-Forward via GPSDO logic)
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const diff = Math.abs(audioRef.current.currentTime - savedAudioPosition);
    if (diff > 2 && isPlaying) {
      audioRef.current.currentTime = savedAudioPosition;
    }
  };

  // Verification Success Handler
  const handleSliderChange = (e) => {
    if (!isWindowOpen) return;

    const val = Number(e.target.value);
    setSliderPos(val);

    if (val >= 90) {
      setIsVerified(true);
      setIsWindowOpen(false);
      setTokensEarned((prev) => Number((prev + 1.00).toFixed(2)));
      setSliderPos(0);

      // Enforce remaining pause duration before restarting (30s total pause)
      setTimeout(() => {
        setIsVerified(false);
        if (!cooldownStartTime && audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          setCyclePlaytime(0);
        }
      }, 20000);
    }
  };

  // Helper formatting for seconds to HH:MM:SS
  const formatTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-amber-400 p-4 flex flex-col items-center justify-between font-mono select-none">
      
      {/* Anti-Tamper GPSDO Linked Audio Element */}
      <audio 
        ref={audioRef} 
        src={bibleAudioSrc} 
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Header Emblem */}
      <div className="text-center my-2">
        <div className="text-xs tracking-widest text-amber-500 mb-1">Δ THE COIN OF CHRIST ∇</div>
        <h1 className="text-lg font-bold tracking-wider text-amber-300">G5 GOLD</h1>
        <p className="text-[10px] text-amber-600 tracking-widest mt-1">VERIFIED HUMAN PRESENCE PROTOCOL</p>
        
        {/* Emblem Button */}
        <div 
          onClick={togglePlay}
          className={`w-40 h-40 mx-auto my-4 rounded-full border-4 ${
            cooldownStartTime 
              ? 'border-red-900 bg-red-950/20 cursor-not-allowed'
              : isPlaying 
              ? 'border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.6)] animate-pulse cursor-pointer bg-amber-950/20' 
              : 'border-amber-800 hover:border-amber-500 cursor-pointer bg-amber-950/20'
          } flex items-center justify-center transition-all duration-300`}
        >
          {cooldownStartTime ? (
            <Lock size={50} className="text-red-500" />
          ) : isPlaying ? (
            <Pause size={50} className="text-amber-300" />
          ) : (
            <Play size={50} className="text-amber-400 ml-2" />
          )}
        </div>

        {/* Dynamic Status Text */}
        <div className="text-[11px] font-semibold tracking-wider">
          {cooldownStartTime ? (
            <span className="text-red-400">33-HR CAP REACHED — 48-HR SPENDING WINDOW ACTIVE</span>
          ) : isPlaying ? (
            <span className="text-amber-300">STREAMING BIBLE ({20 - cyclePlaytime}s UNTIL VERIFY)</span>
          ) : isWindowOpen ? (
            <span className="text-amber-400 animate-pulse">PAUSED FOR VERIFICATION!</span>
          ) : (
            <span className="text-amber-500">TAP EMBLEM TO {savedAudioPosition > 0 ? "RESUME" : "START"} BIBLE</span>
          )}
        </div>
      </div>

      {/* 48-Hour Cooldown Banner */}
      {cooldownStartTime && (
        <div className="w-full max-w-sm bg-red-950/30 border border-red-700/60 rounded-lg p-3 text-center my-1 animate-pulse">
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-xs mb-1">
            <ShieldAlert size={16} />
            <span>48-HOUR COMMERCIAL & SPENDING WINDOW</span>
          </div>
          <div className="text-xl font-bold text-red-300 font-mono">
            {formatTime(cooldownRemainingSecs)}
          </div>
          <div className="text-[9px] text-red-400/80 mt-1">
            Spend earned tokens & watch commercial offers. Resumes automatically after 48 hours.
          </div>
        </div>
      )}

      {/* GPSDO Atomic Clock Banner */}
      <div className="w-full max-w-sm bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-center">
        <div className="text-[10px] text-amber-500">ATOMIC TIME / GPSDO SATELLITE SYNC</div>
        <div className="text-2xl font-bold text-sky-400 my-1 font-mono">
          {currentTime.toUTCString().slice(17, 25)}.0
        </div>
        <div className="flex justify-between text-[9px] text-amber-600 px-2 mt-1">
          <span>33-HR LISTENING BANK: {formatTime(totalListenedSecs)} / 33:00:00</span>
          <span>STATION: KJV BIBLE</span>
        </div>
      </div>

      {/* Human Verification Slider */}
      <div className={`w-full max-w-sm rounded-lg p-4 transition-all ${
        isWindowOpen 
          ? "bg-amber-900/40 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]" 
          : "bg-amber-950/20 border border-amber-800/40 opacity-70"
      }`}>
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-amber-300 font-bold">HUMAN VERIFICATION</span>
          <span className={`text-[11px] font-bold ${
            isVerified ? "text-green-400" : showPenalty ? "text-red-500" : isWindowOpen ? "text-amber-300 animate-pulse" : "text-amber-600"
          }`}>
            {isVerified ? "VERIFIED +$1.00 ✓" : showPenalty ? "PENALTY: MISSED WINDOW" : isWindowOpen ? `SLIDE NOW (${windowTimeLeft}s)` : "LOCKED"}
          </span>
        </div>

        <input 
          type="range" 
          min="0" 
          max="100" 
          disabled={!isWindowOpen || Boolean(cooldownStartTime)}
          value={sliderPos}
          onChange={handleSliderChange}
          className={`w-full h-3 rounded-lg appearance-none border border-amber-700/50 ${
            isWindowOpen ? "accent-amber-300 cursor-pointer bg-amber-950" : "accent-amber-800 cursor-not-allowed bg-black"
          }`}
        />
        <div className="text-[9px] text-amber-600 text-center mt-2">
          {cooldownStartTime 
            ? "Verification locked during 48-hour commercial window"
            : isWindowOpen 
            ? "Slide to verify human presence before timer hits 0s" 
            : "Audio pauses every 20s to trigger verification"}
        </div>
      </div>

      {/* Token Balance */}
      <div className="w-full max-w-sm bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-center">
        <div className="text-[10px] text-amber-500">OFFLINE TOKEN BALANCE</div>
        <div className="text-xl font-bold text-amber-300 my-1">${tokensEarned.toFixed(2)}</div>
        <div className="text-[9px] text-amber-600">G5 GOLD loyalty tokens earned</div>
      </div>

      {/* Hallways Navigation Tiles */}
      <div className="w-full max-w-sm grid grid-cols-5 gap-2 my-2">
        <button onClick={() => navigate('/closet')} className="flex flex-col items-center justify-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40">
          <Award size={18} className="text-amber-400" />
          <span className="text-[8px] mt-1 font-bold text-amber-300">TALENT</span>
        </button>

        <button onClick={() => navigate('/constitution')} className="flex flex-col items-center justify-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40">
          <Clock size={18} className="text-amber-400" />
          <span className="text-[8px] mt-1 font-bold text-amber-300">TIME</span>
        </button>

        <button onClick={() => navigate('/merchants')} className="flex flex-col items-center justify-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40">
          <Gem size={18} className="text-amber-400" />
          <span className="text-[8px] mt-1 font-bold text-amber-300">TREASURE</span>
        </button>

        <button onClick={() => navigate('/witness-jury')} className="flex flex-col items-center justify-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40">
          <ArrowRightLeft size={18} className="text-amber-400" />
          <span className="text-[8px] mt-1 font-bold text-amber-300">TRANSACTION</span>
        </button>

        <button onClick={() => navigate('/debt-exile')} className="flex flex-col items-center justify-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40">
          <BarChart3 size={18} className="text-amber-400" />
          <span className="text-[8px] mt-1 font-bold text-amber-300">TRACK</span>
        </button>
      </div>

      <div className="text-[10px] text-amber-600/80 text-center my-1 tracking-wider">
        G.O.D. — Great God Give Good Grace
      </div>
    </div>
  );
}
