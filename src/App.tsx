import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Music, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Plus, 
  Check, 
  Sparkles, 
  Tv, 
  Send, 
  Maximize2,
  Copy,
  Link as LinkIcon,
  Play,
  RefreshCw
} from 'lucide-react';
import { ImageAsset, AudioTrack, OverlayPreset, CommentPreset } from './types';
import { IMAGE_ASSETS, AUDIO_TRACKS, OVERLAY_PRESETS, COMMENT_PRESETS } from './data';
import AudioPlayer from './components/AudioPlayer';
import PromptHelper from './components/PromptHelper';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Simulator Configurations
  const [selectedImage, setSelectedImage] = useState<ImageAsset>(IMAGE_ASSETS[0]);
  const [selectedAudio, setSelectedAudio] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayPreset>(OVERLAY_PRESETS[0]);
  
  // Custom customizer values
  const [customText, setCustomText] = useState(selectedOverlay.text);
  const [customOverlayColor, setCustomOverlayColor] = useState(selectedOverlay.color);
  const [customPosition, setCustomPosition] = useState<'top' | 'middle' | 'bottom'>(selectedOverlay.position);
  
  // Simulated Interaction Metrics
  const [likes, setLikes] = useState(245700);
  const [hasLiked, setHasLiked] = useState(false);
  const [shares, setShares] = useState(84900);
  const [hasShared, setHasShared] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState(41300);
  const [comments, setComments] = useState<CommentPreset[]>(COMMENT_PRESETS);
  const [newCommentText, setNewCommentText] = useState('');
  
  // AI Captions States
  const [geminiPrompt, setGeminiPrompt] = useState(
    "Write a catchy, pleading subtitle for a cute Ugandan kid character with adorable, big, teary cartoon eyes. Encourage people to click the heart icon and make the red heart pop! Make it fun, heartwarming, and include emojis."
  );
  const [generatedCaption, setGeneratedCaption] = useState(
    "🥺 PLEASE don't scroll away! Just one tap on the HEART makes my day shine! ❤️ Copying the link shares the love and brings good vibes to you! Let's reach 10K shares together! 🙏✨ #CuteCartoons #DoubleTap #ShareTheLove #UgKids"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Handle Preset Overlays
  const handleSelectPresetOverlay = (preset: OverlayPreset) => {
    setSelectedOverlay(preset);
    setCustomText(preset.text);
    setCustomOverlayColor(preset.color);
    setCustomPosition(preset.position);
  };

  // Handle Image click in preview to trigger heart animation and count
  const handleImageClick = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
    setShowHeartPop(true);
    setTimeout(() => {
      setShowHeartPop(false);
    }, 850);
  };

  // Generate Caption via Express Gemini Proxy endpoint
  const generateAICaption = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: geminiPrompt }),
      });
      const data = await response.json();
      if (data.caption) {
        setGeneratedCaption(data.caption);
      } else if (data.error) {
        console.error('Error from server:', data.error);
      }
    } catch (err) {
      console.error('API call failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Trigger quick click copy link trigger
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    if (!hasShared) {
      setShares(prev => prev + 1);
      setHasShared(true);
    }
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  // Handle adding a new mock comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment: CommentPreset = {
      id: Date.now().toString(),
      user: 'you_on_tiktok',
      avatar: '🌟',
      text: newCommentText.trim(),
      likes: '1',
      time: '1s'
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  // Quick Action Buttons directly in the dashboard
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div id="app" className="min-h-screen bg-[#121212] text-neutral-100 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Decorative Design Annotations from the Vibrant Palette Theme - Visible on large screens */}
      <div className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 space-y-4 z-0 pointer-events-none max-w-[220px]">
        <div className="w-48 h-1 bg-gradient-to-r from-[#FF4E50] to-transparent"></div>
        <h2 className="text-[#FFE53B] text-2xl font-black italic tracking-tight">MAX ENGAGEMENT</h2>
        <p className="text-white/50 text-xs leading-relaxed">Vibrant overlays designed to capture Gen-Z attention spans immediately.</p>
      </div>

      <div className="hidden xl:block absolute right-4 top-1/2 -translate-y-1/2 space-y-4 text-right z-0 pointer-events-none max-w-[220px]">
        <div className="w-48 h-1 bg-gradient-to-l from-[#21D4FD] to-transparent ml-auto"></div>
        <h2 className="text-[#00f2ea] text-2xl font-black italic tracking-tight">HIGH DENSITY</h2>
        <p className="text-white/50 text-xs leading-relaxed">9:16 layout optimized for social platform algorithm visibility.</p>
      </div>

      {/* Dynamic Visual Glowing Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF416C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f2ea]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Primary Header Bar */}
      <header id="header-bar" className="relative z-10 border-b border-[#282828] bg-[#1a1a1a]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF416C] via-[#FF4B2B] to-[#FFE53B] flex items-center justify-center shadow-lg shadow-[#FF416C]/30 animate-pulse">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#FF416C] uppercase bg-[#FF416C]/10 px-2 py-0.5 rounded-full">
                  TikTok viral
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#00f2ea] uppercase bg-[#00f2ea]/10 px-2 py-0.5 rounded-full">
                  high-res 3D
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                TikTok Kids Creator Studio
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              Aspect Ratio: <strong className="text-white">9:16 Portrait</strong>
            </span>
            <div className="h-2 w-2 rounded-full bg-[#FF416C] animate-ping" />
            <span className="text-xs font-semibold text-[#00f2ea] font-mono">Active Preview</span>
          </div>
        </div>
      </header>

      {/* Main Content Arena */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Interactive TikTok 9:16 Phone Simulator Window (4 Columns) */}
        <section id="phone-simulator" className="lg:col-span-5 flex flex-col items-center justify-start">
          <div className="relative w-full max-w-[360px] aspect-[9/16] bg-black rounded-[40px] shadow-[0_0_50px_rgba(236,72,153,0.15)] border-[10px] border-neutral-900 overflow-hidden flex flex-col group select-none">
            
            {/* Top Ear Speaker & Camera Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-black z-30 flex items-center justify-center">
              <div className="w-20 h-4 bg-neutral-900 rounded-b-xl flex items-center justify-center gap-1.5">
                <div className="w-8 h-1 bg-neutral-700 rounded-full" />
                <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
              </div>
            </div>

            {/* Simulated Live View Tag / Search bar */}
            <div className="absolute top-8 inset-x-0 flex items-center justify-center gap-4 z-20 font-semibold text-xs text-white/60">
              <span className="hover:text-white cursor-pointer">Following</span>
              <span className="text-white border-b-2 border-white pb-1 font-bold">For You</span>
            </div>

            {/* Main Interactive Screen Area */}
            <div 
              onClick={handleImageClick}
              className="relative flex-1 bg-[#1a1a1a] overflow-hidden cursor-pointer active:brightness-95 transition"
            >
              {/* Actual Generated Kid Image with high-resolution textures */}
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300 transform scale-100 group-hover:scale-[1.01]"
              />

              {/* Glowing Ambient Overlay Layer (Vivid playfulness) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

              {/* TikTok Heart Pop Animation Effect */}
              <AnimatePresence>
                {showHeartPop && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                    animate={{ scale: [1, 1.4, 1.2], opacity: [1, 1, 0], rotate: [0, 15, -10] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                  >
                    <div className="relative">
                      <Heart className="w-32 h-32 text-[#FF416C] fill-[#FF416C] drop-shadow-[0_0_30px_rgba(255,65,108,0.8)]" />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-black drop-shadow-md tracking-wider">
                        TAP TAP! ❤️
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Overlay Text Presets (Catchy Call to Actions) - Styled as high-contrast rotational sticker badges */}
              <div className="absolute inset-x-4 inset-y-12 pointer-events-none z-20 flex flex-col justify-center">
                {customPosition === 'top' && (
                  <motion.div 
                    key={customText + 'top'}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute top-16 left-0 right-0 text-center"
                  >
                    <span 
                      style={{ 
                        backgroundColor: customOverlayColor || '#FFE53B', 
                        color: customOverlayColor === '#FFE53B' ? '#FF2525' : '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                      className="inline-block px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide leading-snug max-w-[280px] mx-auto shadow-2xl border-4 border-white rotate-[-3deg] animate-bounce"
                    >
                      {customText} 🚀
                    </span>
                  </motion.div>
                )}

                {customPosition === 'middle' && (
                  <motion.div 
                    key={customText + 'middle'}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center"
                  >
                    <span 
                      style={{ 
                        backgroundColor: customOverlayColor || '#21D4FD', 
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                      className="inline-block px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wide leading-snug max-w-[280px] mx-auto shadow-2xl border-4 border-white rotate-[2deg]"
                    >
                      {customText} ✨
                    </span>
                  </motion.div>
                )}

                {customPosition === 'bottom' && (
                  <motion.div 
                    key={customText + 'bottom'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-36 left-0 right-0 text-center"
                  >
                    <span 
                      style={{ 
                        backgroundColor: customOverlayColor || '#FF4B2B', 
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                      className="inline-block px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide leading-snug max-w-[280px] mx-auto shadow-2xl border-4 border-white rotate-[-2deg]"
                    >
                      {customText} 🥺❤️
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Left Side Info Area: Creator info, Caption text & Trending Track indicator */}
              <div className="absolute bottom-4 left-3 right-12 z-20 pointer-events-none text-white text-xs select-text">
                <p className="font-bold text-sm flex items-center gap-1.5 mb-1 text-shadow-md">
                  @ug_kids_animation_studio 
                  <span className="bg-cyan-400 text-black font-black text-[9px] px-1 rounded">LIVE</span>
                </p>
                
                {/* Dynamically Generated TikTok Caption */}
                <div className="bg-black/40 backdrop-blur-sm p-2.5 rounded-lg border border-white/5 max-h-24 overflow-y-auto mb-2 text-[11px] leading-relaxed text-neutral-200">
                  {generatedCaption}
                </div>

                {/* Catchy Track Ticker */}
                <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
                  <Music className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="truncate max-w-[160px] text-[10px] uppercase font-semibold">
                    {selectedAudio.title} • {selectedAudio.creator}
                  </span>
                </div>
              </div>

              {/* Right Side Control Bar: TikTok Icons for engagement in the Vibrant Palette Theme */}
              <div className="absolute right-3.5 bottom-12 z-20 flex flex-col items-center gap-5 text-white">
                
                {/* Creator Profile Avatar */}
                <div className="relative mb-1">
                  <div className="w-11 h-11 rounded-full border-2 border-white bg-[#00f2ea] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition">
                    <span className="text-[#FF416C] font-black text-sm">UG</span>
                  </div>
                  <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#FF416C] rounded-full p-0.5 hover:scale-110 active:scale-90 transition pointer-events-auto border border-white">
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>

                {/* Like Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick();
                  }}
                  className="flex flex-col items-center pointer-events-auto group"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                    hasLiked 
                      ? 'bg-[#FF416C] border-2 border-white shadow-lg shadow-[#FF416C]/40 scale-105' 
                      : 'bg-white/15 backdrop-blur-md hover:bg-white/25'
                  }`}>
                    <span className="text-xl">❤️</span>
                  </div>
                  <span className="text-[10px] font-black mt-1 text-shadow-md text-white">{formatNumber(likes)}</span>
                </button>

                {/* Comment Mock Button */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 flex items-center justify-center transition-all">
                    <span className="text-xl">💬</span>
                  </div>
                  <span className="text-[10px] font-black mt-1 text-shadow-md text-white">{formatNumber(comments.length)}</span>
                </div>

                {/* Bookmark Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!hasBookmarked) {
                      setBookmarks(prev => prev + 1);
                      setHasBookmarked(true);
                    } else {
                      setBookmarks(prev => prev - 1);
                      setHasBookmarked(false);
                    }
                  }}
                  className="flex flex-col items-center pointer-events-auto"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    hasBookmarked 
                      ? 'bg-[#FFE53B] border-2 border-white scale-105' 
                      : 'bg-white/15 backdrop-blur-md hover:bg-white/25'
                  }`}>
                    <span className="text-xl">🔖</span>
                  </div>
                  <span className="text-[10px] font-black mt-1 text-shadow-md text-white">{formatNumber(bookmarks)}</span>
                </button>

                {/* Share Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink();
                  }}
                  className="flex flex-col items-center pointer-events-auto"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    hasShared 
                      ? 'bg-[#21D4FD] border-2 border-white scale-105' 
                      : 'bg-white/15 backdrop-blur-md hover:bg-white/25'
                  }`}>
                    <span className="text-xl">🔁</span>
                  </div>
                  <span className="text-[10px] font-black mt-1 text-shadow-md text-white">{formatNumber(shares)}</span>
                </button>

                {/* Mini Spinning Music Disc */}
                <div className="w-10 h-10 rounded-full border-2 border-[#333] bg-gradient-to-tr from-black via-[#555] to-black flex items-center justify-center overflow-hidden animate-spin mt-1" style={{ animationDuration: '4s' }}>
                  <div className="w-5 h-5 rounded-full bg-[#FF416C] animate-pulse"></div>
                </div>

              </div>

              {/* Progress Bar at bottom of screen view */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full z-20">
                <div className="h-full bg-white w-2/3 transition-all duration-300"></div>
              </div>

            </div>

            {/* Bottom Safe Area / Home Indicator */}
            <div className="h-4 bg-black z-30 flex items-center justify-center">
              <div className="w-24 h-1 bg-neutral-700 rounded-full" />
            </div>

          </div>

          {/* Prompt Suggestion / Helper Link Copy feedback */}
          <div className="mt-4 text-center w-full max-w-[360px]">
            {linkCopied ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/50 px-4 py-2 rounded-xl animate-bounce">
                <Check className="w-4 h-4" /> Link Copied! Pleading for shares counter increased!
              </span>
            ) : (
              <p className="text-[11px] text-neutral-400 italic">
                💡 Double tap the kid character to simulate liking, or click Share!
              </p>
            )}
          </div>
        </section>

        {/* Right Side: Configuration Station & AI Generation Deck (7 Columns) */}
        <section id="config-panel" className="lg:col-span-7 space-y-6">

          {/* Section 1: Character Selector (High-Res 3D Textures) */}
          <div className="bg-[#181818]/90 rounded-3xl p-6 border border-[#2a2a2a] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-[#00f2ea]" />
                <h2 className="font-extrabold text-white text-base">
                  1. Choose High-Resolution Character Style
                </h2>
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-[#111111] px-2.5 py-1 rounded-full border border-white/5">
                Ug Kids 3D
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              Select one of the super realistic, Pixar-style Ugandan kid cartoon character models optimized with vibrant palettes and playful color designs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {IMAGE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedImage(asset)}
                  className={`relative rounded-2xl overflow-hidden text-left border-2 p-1.5 transition-all group ${
                    selectedImage.id === asset.id 
                      ? 'border-[#FF416C] bg-[#1a1a1a] shadow-lg shadow-[#FF416C]/10' 
                      : 'border-[#2a2a2a] bg-[#111111]/40 hover:border-neutral-700'
                  }`}
                >
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-black mb-2">
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white truncate px-1">{asset.name}</h4>
                  <p className="text-[10px] text-neutral-400 truncate px-1">{asset.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Sound Selector (Catchy Background Beats) */}
          <div className="bg-[#181818]/90 rounded-3xl p-6 border border-[#2a2a2a] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#FF416C]" />
                <h2 className="font-extrabold text-white text-base">
                  2. Select Trending Audio Track
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#FF416C] uppercase tracking-widest bg-[#FF416C]/10 px-2.5 py-1 rounded-full animate-pulse border border-[#FF416C]/20">
                Catchy Synth
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              Pick the background melody. This synthesizes a beautiful algorithmic acoustic loop at runtime for simulation.
            </p>

            {/* Audio Synth Preview Controller */}
            <AudioPlayer 
              isPlaying={isMusicPlaying} 
              onTogglePlay={() => setIsMusicPlaying(!isMusicPlaying)} 
              trackId={selectedAudio.id} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {AUDIO_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedAudio(track);
                    setIsMusicPlaying(true);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    selectedAudio.id === track.id
                      ? 'border-[#FF416C] bg-[#FF416C]/10 text-white shadow-lg'
                      : 'border-[#2a2a2a] bg-[#111111]/40 hover:bg-[#222222] text-neutral-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold truncate">{track.title}</span>
                      {selectedAudio.id === track.id && (
                        <span className="w-2 h-2 rounded-full bg-[#FF416C] animate-ping shrink-0" />
                      )}
                    </div>
                    <span className="text-[9px] text-neutral-400 block font-mono">By {track.creator}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#111111] shrink-0 font-mono text-[#00f2ea]">
                    {track.useCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Overlay Preset Customizer */}
          <div className="bg-[#181818]/90 rounded-3xl p-6 border border-[#2a2a2a] shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFE53B]" />
              <h2 className="font-extrabold text-white text-base">
                3. Overlays & Pleading Call-to-Actions (CTAs)
              </h2>
            </div>

            <p className="text-xs text-neutral-400">
              Customize the overlay banners directly placed on top of the 3D kid character. Choose quick presets or edit manually.
            </p>

            {/* Presets List */}
            <div className="flex flex-wrap gap-2">
              {OVERLAY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPresetOverlay(preset)}
                  style={{ 
                    borderColor: selectedOverlay.id === preset.id ? preset.color : '#2a2a2a',
                    boxShadow: selectedOverlay.id === preset.id ? `0 0 12px ${preset.color}33` : 'none'
                  }}
                  className={`text-xs px-3.5 py-2 rounded-full border bg-[#111111]/80 hover:bg-[#222222] transition-all font-bold text-white`}
                >
                  {preset.text}
                </button>
              ))}
            </div>

            {/* Custom inputs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Custom Overlay Banner Text
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-black border border-[#2c2c2c] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF416C] text-white font-bold"
                  placeholder="Enter custom viral overlay text..."
                />
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Banner Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customOverlayColor}
                    onChange={(e) => setCustomOverlayColor(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-black border border-[#2c2c2c] cursor-pointer overflow-hidden p-0"
                  />
                  <span className="text-xs font-mono text-neutral-400">{customOverlayColor.toUpperCase()}</span>
                </div>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Screen Alignment
                </label>
                <select
                  value={customPosition}
                  onChange={(e: any) => setCustomPosition(e.target.value)}
                  className="w-full bg-black border border-[#2c2c2c] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF416C] text-white"
                >
                  <option value="top">Top</option>
                  <option value="middle">Middle</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Live Gemini Social Media Copywriter */}
          <div className="bg-[#181818]/90 rounded-3xl p-6 border border-[#FF416C]/25 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#FF416C]/10 text-[#FF416C]">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="font-extrabold text-white text-base">
                  4. Gemini AI Social Copywriter (Tiktok Captions)
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#FF416C] uppercase tracking-widest bg-[#FF416C]/15 px-2.5 py-1 rounded-full border border-[#FF416C]/20">
                Gemini 2.5 Flash
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              The caption plays a massive role in TikTok discoverability. Let Gemini craft adorable begging captions and SEO-optimized hashtags dynamically.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Instructions for the AI Copywriter
                </label>
                <textarea
                  value={geminiPrompt}
                  onChange={(e) => setGeminiPrompt(e.target.value)}
                  className="w-full h-20 bg-black border border-[#2c2c2c] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF416C] text-neutral-300 resize-none leading-relaxed"
                  placeholder="Tell Gemini what specific angle to use..."
                />
              </div>

              {/* Dynamic prompt helper presets */}
              <PromptHelper onSelectPrompt={(text) => setGeminiPrompt(text)} />

              <button
                onClick={generateAICaption}
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition bg-gradient-to-tr from-[#FF416C] via-[#FF4B2B] to-[#FFE53B] hover:brightness-110 active:scale-[0.98] text-white disabled:opacity-50 shadow-lg shadow-[#FF416C]/20 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Engagement Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FFE53B]" />
                    Generate Viral TikTok Caption
                  </>
                )}
              </button>
            </div>

            {/* Generated Caption Result Panel */}
            <div className="bg-black border border-[#2c2c2c] rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Live TikTok Caption Result
                </span>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
                  Characters: {generatedCaption.length}
                </span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed italic bg-[#111111]/40 p-2.5 rounded-lg border border-[#2c2c2c]">
                "{generatedCaption}"
              </p>
            </div>
          </div>

          {/* Section 5: TikTok Audience Simulator Comments Feed */}
          <div className="bg-[#181818]/90 rounded-3xl p-6 border border-[#2a2a2a] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#00f2ea]" />
                <h2 className="font-extrabold text-white text-base">
                  Audience Simulator Comments
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#00f2ea] uppercase bg-[#00f2ea]/10 px-2.5 py-1 rounded-full font-mono border border-[#00f2ea]/20">
                {comments.length} Comments
              </span>
            </div>

            <p className="text-xs text-neutral-400">
              See how the viewers react to the adorable Ugandan kid begging for support! Add custom mock responses.
            </p>

            {/* Form to submit new comment */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 bg-black border border-[#2c2c2c] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF416C] text-white placeholder-neutral-500"
                placeholder="Post a simulator comment..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF416C] hover:bg-[#FF4b2b] text-white rounded-xl text-xs font-bold transition flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Live interactive scroll comments list */}
            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 text-xs bg-[#111111]/40 p-3 rounded-xl border border-[#2c2c2c]">
                  <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-white/5">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-200">@{comment.user}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{comment.time} ago</span>
                    </div>
                    <p className="text-neutral-300 mt-1 leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-neutral-400 font-mono">
                      <Heart className="w-3 h-3 text-[#FF416C] fill-[#FF416C]" />
                      <span>{comment.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>

      {/* Aesthetic Footer */}
      <footer id="footer-branding" className="mt-auto py-6 border-t border-[#222] bg-[#141414] text-center text-xs text-neutral-500 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-medium text-neutral-400">
            🇺🇬 Cartoon Studio TikTok Simulator & Coprocessor
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-neutral-600 bg-neutral-900 px-2 py-1 rounded">
              Pixar 3D Mode
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#FF416C] bg-[#FF416C]/10 px-2 py-1 rounded">
              Coded via Google AI Studio
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
