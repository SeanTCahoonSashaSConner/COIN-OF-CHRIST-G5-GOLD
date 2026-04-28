import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, Waves, Moon, Sun } from 'lucide-react';

const SabbathTone = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerData, setVisualizerData] = useState(new Array(32).fill(0));
  
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const timerRef = useRef(null);

  const DURATION = 18 * 60; // 18 minutes in seconds
  const FREQUENCY = 528; // Hz - The "Love Frequency"

  // Initialize Web Audio API
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for 528 Hz tone
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(FREQUENCY, audioContextRef.current.currentTime);

      // Create gain node for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);

      // Create analyser for visualization
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;

      // Connect nodes
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      // Start oscillator (it will be silent until we raise the gain)
      oscillatorRef.current.start();
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    initAudio();
    
    if (isPlaying) {
      // Pause - fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
      clearInterval(timerRef.current);
    } else {
      // Play - fade in with heartbeat-style pulsing
      startHeartbeatTone();
      startTimer();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Create heartbeat-style pulsing effect
  const startHeartbeatTone = () => {
    const now = audioContextRef.current.currentTime;
    const targetVolume = isMuted ? 0 : volume * 0.3; // Keep it gentle
    
    // Create a subtle heartbeat rhythm
    const pulseHeartbeat = () => {
      if (!gainNodeRef.current || !isPlaying) return;
      
      const currentTime = audioContextRef.current.currentTime;
      
      // Heartbeat pattern: lub-dub... lub-dub...
      // First beat (lub)
      gainNodeRef.current.gain.setValueAtTime(targetVolume * 0.6, currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, currentTime + 0.1);
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.6, currentTime + 0.2);
      
      // Second beat (dub)
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.8, currentTime + 0.3);
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.5, currentTime + 0.5);
      
      // Rest period
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.4, currentTime + 1.0);
    };

    // Initial fade in
    gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.4, now + 2);
    
    // Start heartbeat loop
    const heartbeatInterval = setInterval(pulseHeartbeat, 1200); // ~50 BPM
    
    // Store interval for cleanup
    animationRef.current = heartbeatInterval;
  };

  // Timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= DURATION) {
          handleComplete();
          return DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Handle completion
  const handleComplete = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    clearInterval(animationRef.current);
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
    }
    
    if (onComplete) onComplete();
  };

  // Update visualizer
  useEffect(() => {
    if (!isPlaying || !analyserRef.current) return;

    const updateVisualizer = () => {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      setVisualizerData(Array.from(dataArray));
      requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  }, [isPlaying]);

  // Volume control
  useEffect(() => {
    if (gainNodeRef.current && isPlaying) {
      const targetVolume = isMuted ? 0 : volume * 0.3;
      gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume * 0.4, audioContextRef.current.currentTime + 0.1);
    }
  }, [volume, isMuted, isPlaying]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(animationRef.current);
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / DURATION) * 100;

  return (
    <div className="glass rounded-3xl p-8 max-w-md mx-auto" data-testid="sabbath-tone">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-b from-purple-500 to-pink-600 flex items-center justify-center">
          <Waves className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-serif text-white mb-2">528 Hz Sabbath Tone</h2>
        <p className="text-[#A8A29E] text-sm">DNA Restoration Frequency</p>
        <p className="text-purple-400 text-xs mt-1">The "Love Frequency" • Heartbeat Style</p>
      </div>

      {/* Visualizer */}
      <div className="h-24 mb-6 flex items-end justify-center gap-1">
        {visualizerData.slice(0, 24).map((value, index) => (
          <div
            key={index}
            className="w-2 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t transition-all duration-75"
            style={{ 
              height: isPlaying ? `${Math.max(4, value / 3)}%` : '4px',
              opacity: isPlaying ? 0.6 + (value / 255) * 0.4 : 0.3
            }}
          />
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#A8A29E]">{formatTime(currentTime)}</span>
          <span className="text-[#A8A29E]">{formatTime(DURATION)}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-center text-xs text-purple-400 mt-2">
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        {/* Volume */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-[#A8A29E]" />
          ) : (
            <Volume2 className="w-6 h-6 text-purple-400" />
          )}
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isPlaying 
              ? 'bg-gradient-to-b from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30' 
              : 'bg-gradient-to-b from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600'
          }`}
          data-testid="play-button"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white" />
          ) : (
            <Play className="w-10 h-10 text-white ml-1" />
          )}
        </button>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 accent-purple-500"
          data-testid="volume-slider"
        />
      </div>

      {/* Info */}
      <div className="text-center space-y-2">
        <p className="text-sm text-[#A8A29E]">
          <Heart className="w-4 h-4 inline mr-1 text-pink-500" />
          {isPlaying ? 'Healing in progress...' : 'Press play to begin restoration'}
        </p>
        {currentTime >= DURATION && (
          <p className="text-green-400 font-semibold">
            ✓ Sabbath Session Complete!
          </p>
        )}
      </div>

      {/* Benefits */}
      <div className="mt-6 p-4 bg-purple-500/10 rounded-xl">
        <p className="text-xs text-center text-purple-300">
          528 Hz is known as the "Miracle Tone" — associated with DNA repair, 
          transformation, and bringing about positive change. Combined with 
          heartbeat rhythm for deep relaxation.
        </p>
      </div>
    </div>
  );
};

export default SabbathTone;
