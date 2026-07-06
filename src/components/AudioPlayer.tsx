import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  trackId: string;
}

export default function AudioPlayer({ isPlaying, onTogglePlay, trackId }: AudioPlayerProps) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(16).fill(20));
  
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Audio Context on user interaction / playing
  const initAudio = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);
      return ctx;
    }
    return audioContext;
  };

  const startSynthesizer = (ctx: AudioContext) => {
    try {
      // Clean up past synthesis
      stopSynthesizer();

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create synthetic rhythmic TikTok tune using an oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure a joyful, catchy arpeggiated sound
      osc.type = 'triangle';
      
      // Determine base frequency by track ID
      let baseFreq = 261.63; // C4
      if (trackId === 'track1') baseFreq = 293.66; // D4
      if (trackId === 'track2') baseFreq = 329.63; // E4
      if (trackId === 'track3') baseFreq = 392.00; // G4
      if (trackId === 'track4') baseFreq = 220.00; // A3

      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      // Create a playful melodic arpeggio loop using parameter automation
      const playMelody = () => {
        const now = ctx.currentTime;
        // Rhythmic pattern: 4 notes of an arpeggio
        if (trackId === 'track1') {
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.setValueAtTime(baseFreq * 1.25, now + 0.2); // E4
          osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.4);  // G4
          osc.frequency.setValueAtTime(baseFreq * 1.875, now + 0.6); // B4
        } else if (trackId === 'track2') {
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.setValueAtTime(baseFreq * 1.33, now + 0.15); 
          osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.3);
          osc.frequency.setValueAtTime(baseFreq * 1.66, now + 0.45);
        } else if (trackId === 'track3') {
          // Energetic Afro-Beat style pentatonic scale jumps
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.setValueAtTime(baseFreq * 1.12, now + 0.1); 
          osc.frequency.setValueAtTime(baseFreq * 1.34, now + 0.2);
          osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.3);
          osc.frequency.setValueAtTime(baseFreq * 1.8, now + 0.4);
        } else {
          // Tender emotional pleading notes
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.setValueAtTime(baseFreq * 1.2, now + 0.3);
          osc.frequency.setValueAtTime(baseFreq * 1.4, now + 0.6);
        }
      };

      // Automate volume gain to simulate a playful percussive acoustic beat
      const playRhythm = () => {
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(isMuted ? 0 : 0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        gain.gain.setValueAtTime(isMuted ? 0 : 0.15, now + 0.15);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.27);
        gain.gain.setValueAtTime(isMuted ? 0 : 0.15, now + 0.3);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
        gain.gain.setValueAtTime(isMuted ? 0 : 0.2, now + 0.5);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.75);
      };

      // Periodic timer loops
      playMelody();
      playRhythm();
      
      const intervalId = setInterval(() => {
        if (ctx.state === 'running' && !isMuted) {
          playMelody();
          playRhythm();
        }
      }, 800);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      // Keep visualizer bouncing while audio runs
      const updateVisualizer = () => {
        const fakeData = Array.from({ length: 16 }, () => 
          Math.floor(Math.random() * 60) + 10
        );
        setFrequencyData(fakeData);
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();

      // Return cleanup function for intervals
      return () => {
        clearInterval(intervalId);
      };
    } catch (e) {
      console.warn('Audio synthesis failed to initialize:', e);
    }
  };

  const stopSynthesizer = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
      } catch (e) {}
      gainNodeRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setFrequencyData(new Array(16).fill(4));
  };

  useEffect(() => {
    let cleanupInterval: (() => void) | undefined;
    if (isPlaying) {
      let ctx = audioContext;
      if (!ctx) {
        ctx = initAudio();
      }
      if (ctx) {
        cleanupInterval = startSynthesizer(ctx);
      }
    } else {
      stopSynthesizer();
    }

    return () => {
      stopSynthesizer();
      if (cleanupInterval) cleanupInterval();
    };
  }, [isPlaying, trackId, isMuted, audioContext]);

  const handleTogglePlay = () => {
    initAudio();
    onTogglePlay();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#1a1a1a]/95 rounded-2xl p-4 border border-[#2c2c2c] shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF416C] via-[#FF4B2B] to-[#FFE53B] hover:scale-105 active:scale-95 transition-all text-white shadow-lg shadow-[#FF416C]/30"
          title={isPlaying ? "Pause Catchy Background Music" : "Play Catchy Background Music"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Visualizer bars */}
        <div className="flex-1 flex items-end justify-between h-8 px-2 gap-0.5">
          {frequencyData.map((val, idx) => (
            <div
              key={idx}
              style={{ height: isPlaying ? `${val}%` : '15%' }}
              className="w-1 bg-gradient-to-t from-[#FF416C] via-[#FF4B2B] to-[#00f2ea] rounded-full transition-all duration-150"
            />
          ))}
        </div>

        {/* Mute Control */}
        <button
          onClick={toggleMute}
          className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition"
          title={isMuted ? "Unmute" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-neutral-400 font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          {isPlaying ? "Active Synthesizer Loop" : "Audio Preview Off"}
        </span>
        <span className="text-neutral-500">24kHz PCM</span>
      </div>
    </div>
  );
}
