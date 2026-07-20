import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, Clock, Gem, ArrowRightLeft, BarChart3, 
  Play, Pause, Flame, ShieldCheck 
} from 'lucide-react';

export default function AudioPlayer() {
  const navigate = useNavigate();

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Time & Verification State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sliderPos, setSliderPos] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [tokensEarned, setTokensEarned] = useState(0.00);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
    }
  };

  // Handle Slider Movement
  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderPos(val);
    if (val >= 95 && !isVerified) {
      setIsVerified(true);
      setTokensEarned(prev => Number((prev + 1.00).toFixed(2)));
    }
  };

  return (
    <div className="min-h-screen bg-black text-amber-400 p-4 flex flex-col items-center justify-between font-mono">
      {/* Hidden Audio Element - Uses public radio or direct stream */}
      <audio 
        ref={audioRef} 
        src="https://stream.zeno.fm/f3wvbbqmdg8uv" 
        preload="none" 
      />

      {/* Header Symbol */}
      <div className="text-center my-4">
        <h1 className="text-xl tracking-widest text-amber-300 font-bold">
          Δ THE COIN OF CHRIST ∇
        </h1>
        <p className="text-xs text-amber-500/80 tracking-wider">G5 GOLD - VERIFIED HUMAN PRESENCE</p>
        
        {/* Coin Emblem */}
        <div 
          onClick={togglePlay}
          className={`w-36 h-36 mx-auto my-6 rounded-full border-4 ${isPlaying ? 'border-amber-400 animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.5)]' : 'border-amber-700'} flex items-center justify-center cursor-pointer transition-all`}
        >
          {isPlaying ? <Pause size={48} /> : <Play size={48} className="ml-2" />}
        </div>
      </div>

      {/* Atomic Clock */}
      <div className="w-full max-w-md bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-center my-2">
        <div className="text-xs text-amber-500">ATOMIC TIME / GPSDO</div>
        <div className="text-2xl font-bold text-sky-400 my-1">
          {currentTime.toUTCString().slice(17, 25)}.0
        </div>
        <div className="text-[10px] text-amber-600">UTC - FIXED DISCIPLINED OSCILLATOR</div>
      </div>

      {/* Human Verification Slider */}
      <div className="w-full max-w-md bg-amber-950/20 border border-amber-800/40 rounded-lg p-4 my-2">
        <div className="flex justify-between text-xs mb-2">
          <span>HUMAN VERIFICATION</span>
          <span className={isVerified ? "text-green-400 font-bold" : "text-amber-500"}>
            {isVerified ? "VERIFIED ✓" : "SLIDE TO VERIFY"}
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPos}
          onChange={handleSliderChange}
          className="w-full accent-amber-400 h-3 bg-amber-950 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Token Balance */}
      <div className="w-full max-w-md bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 text-center my-2">
        <div className="text-xs text-amber-500">OFFLINE TOKEN BALANCE</div>
        <div className="text-xl font-bold text-amber-300 my-1">${tokensEarned.toFixed(2)}</div>
        <div className="text-[10px] text-amber-600">G5 GOLD LOYALTY TOKENS</div>
      </div>

      {/* Hallways Navigation Tiles */}
      <div className="w-full max-w-md grid grid-cols-5 gap-2 my-4">
        <button 
          onClick={() => navigate('/closet')}
          className="flex flex-col items-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40 transition"
        >
          <Award size={18} />
          <span className="text-[9px] mt-1 font-bold">TALENT</span>
        </button>

        <button 
          onClick={() => navigate('/constitution')}
          className="flex flex-col items-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40 transition"
        >
          <Clock size={18} />
          <span className="text-[9px] mt-1 font-bold">TIME</span>
        </button>

        <button 
          onClick={() => navigate('/merchants')}
          className="flex flex-col items-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40 transition"
        >
          <Gem size={18} />
          <span className="text-[9px] mt-1 font-bold">TREASURE</span>
        </button>

        <button 
          onClick={() => navigate('/witness-jury')}
          className="flex flex-col items-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40 transition"
        >
          <ArrowRightLeft size={18} />
          <span className="text-[9px] mt-1 font-bold">TRANSACTION</span>
        </button>

        <button 
          onClick={() => navigate('/debt-exile')}
          className="flex flex-col items-center p-2 bg-amber-950/30 border border-amber-700/50 rounded hover:bg-amber-800/40 transition"
        >
          <BarChart3 size={18} />
          <span className="text-[9px] mt-1 font-bold">TRACK</span>
        </button>
      </div>

      <div className="text-[10px] text-amber-700 text-center my-2">
        G.O.D. — Great God Give Good Grace
      </div>
    </div>
  );
}
