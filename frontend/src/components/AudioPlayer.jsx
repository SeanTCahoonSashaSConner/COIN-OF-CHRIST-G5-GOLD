import React, { useState, useEffect, useRef } from 'react';
// Use your preferred audio package (e.g., expo-av or react-native-track-player)
import { Audio } from 'expo-av'; 

export default function BibleVerificationPlayer() {
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [sliderWindowSeconds, setSliderWindowSeconds] = useState(10);
  const [isSliderActive, setIsSliderActive] = useState(false);
  
  const playbackTimer = useRef(null);
  const sliderTimer = useRef(null);
  const soundRef = useRef(null);

  // 1. Load your commercially-safe public domain streaming link
  const audioUrl = "https://githubusercontent.com";

  const startLoop = async () => {
    // Initialize and play audio file
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
    soundRef.current = sound;
    await soundRef.current.playAsync();
    
    runListeningPhase();
  };

  // Phase 1: 20-Second Listening Counter
  const runListeningPhase = () => {
    setIsSliderActive(false);
    setPlaybackSeconds(0);

    playbackTimer.current = setInterval(() => {
      setPlaybackSeconds((prev) => {
        if (prev >= 19) {
          clearInterval(playbackTimer.current);
          handleListeningFinished(); // Move to slider phase
          return 20;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Phase 2: Pause Audio & Open 10-Second Slider Window
  const handleListeningFinished = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync(); // Pause exact spot
    }
    
    setIsSliderActive(true);
    setSliderWindowSeconds(10);

    sliderTimer.current = setInterval(() => {
      setSliderWindowSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(sliderTimer.current);
          handleSliderWindowClosed(); // Loop forces restart
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Phase 3: 30-Second Mark Hit -> Force Resume
  const handleSliderWindowClosed = async () => {
    setIsSliderActive(false);
    
    if (soundRef.current) {
      await soundRef.current.playAsync(); // Picks right back up
    }
    
    runListeningPhase(); // Restart the 30s cycle loop
  };

  const handleSliderComplete = () => {
    if (isSliderActive) {
      console.log("Slider verified within 10s window. Triggering points ledger...");
      // Your ledger verification function goes here
    }
  };
}
