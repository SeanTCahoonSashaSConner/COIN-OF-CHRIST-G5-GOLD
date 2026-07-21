// Corrected Timing Loop: 20s Audio / 30s Pause Cycle
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
        if (next === 20) {
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

// Resume Audio Engine ONLY when total 30-second pause window expires
const handleVerificationSuccess = () => {
  setIsVerified(true);
  setIsWindowOpen(false);
  setTokensEarned((prev) => Number((prev + 1.00).toFixed(2)));
  setSliderPos(0);

  // Wait remaining pause duration (total 30 seconds from start of pause)
  setTimeout(() => {
    setIsVerified(false);
    if (!cooldownStartTime && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      setCyclePlaytime(0); // Reset 20s play timer only after full 30s pause completes
    }
  }, 20000); // 10s window + 20s remaining pause = 30s total pause
};
