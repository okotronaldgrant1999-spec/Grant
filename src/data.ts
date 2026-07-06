import { ImageAsset, AudioTrack, OverlayPreset, CommentPreset } from './types';

// Let's find our generated images. We can use the actual saved locations!
// The generated paths are:
// /src/assets/images/ug_kid_cartoon_cute_1783375773191.jpg
// /src/assets/images/ug_kid_cartoon_excited_1783375785030.jpg
// /src/assets/images/ug_kid_cartoon_begging_1783375796274.jpg

export const IMAGE_ASSETS: ImageAsset[] = [
  {
    id: 'cute',
    name: 'Kawaii Ug Kid (Sunset Glow)',
    url: '/src/assets/images/ug_kid_cartoon_cute_1783375773191.jpg',
    description: 'A cute 3D cartoon Ugandan kid with massive sparkling puppy eyes wearing colorful kitenge patterns under a glowing sunset backdrop.'
  },
  {
    id: 'excited',
    name: 'Vibrant Wave (TikTok Style)',
    url: '/src/assets/images/ug_kid_cartoon_excited_1783375785030.jpg',
    description: 'Extremely cheerful animated Ugandan child smiling wide with raised waving hand, accented by glowing colorful shapes.'
  },
  {
    id: 'begging',
    name: 'Endearing Begging Eyes (Engagement Gold)',
    url: '/src/assets/images/ug_kid_cartoon_begging_1783375796274.jpg',
    description: 'An adorable kid character with hopeful eyes clasping hands together, looking directly into the soul of the viewer to ask for support.'
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'track1',
    title: 'Uganda Vibes Beat (Acoustic Folk Remix)',
    creator: 'TrendyAfricanBeats',
    duration: '0:15',
    useCount: '1.4M'
  },
  {
    id: 'track2',
    title: 'Cute & Playful Ukulele Whistle',
    creator: 'HappyVibesMusic',
    duration: '0:12',
    useCount: '840K'
  },
  {
    id: 'track3',
    title: 'Viral Upbeat Afro Synth Pop',
    creator: 'DJ Kampala Club',
    duration: '0:15',
    useCount: '3.1M'
  },
  {
    id: 'track4',
    title: 'Slightly Pleading Melodic Chords',
    creator: 'AestheticLoFiSound',
    duration: '0:18',
    useCount: '450K'
  }
];

export const OVERLAY_PRESETS: OverlayPreset[] = [
  {
    id: 'overlay1',
    text: 'PLZ double tap and copy link! 🥺🙏❤️',
    position: 'bottom',
    style: 'begging',
    color: '#FF2A54' // TikTok Red
  },
  {
    id: 'overlay2',
    text: 'Can we reach 10K shares today? Please help! 👇✨',
    position: 'top',
    style: 'trending',
    color: '#00F2FE' // TikTok Cyan
  },
  {
    id: 'overlay3',
    text: 'If you scroll without liking, my heart breaks 💔',
    position: 'middle',
    style: 'viral',
    color: '#FFD700' // Gold
  },
  {
    id: 'overlay4',
    text: 'Just 1 share makes me super happy! 🥰',
    position: 'bottom',
    style: 'cute',
    color: '#39FF14' // Neon Green
  }
];

export const COMMENT_PRESETS: CommentPreset[] = [
  {
    id: 'c1',
    user: 'tiktok_queen_99',
    avatar: '🌸',
    text: 'Oh my goodness, those sparkling eyes! I immediately copied link and double tapped 🥺❤️',
    likes: '14.2K',
    time: '2h'
  },
  {
    id: 'c2',
    user: 'afrobeats_fan',
    avatar: '🔥',
    text: 'Sharing this to all my group chats! The cute design is absolutely top-notch 🙌',
    likes: '8.1K',
    time: '4h'
  },
  {
    id: 'c3',
    user: 'kindness_ambassador',
    avatar: '🤝',
    text: 'Who could scroll past this adorable little angel without leaving a heart? Done! ✨',
    likes: '5.9K',
    time: '5h'
  }
];
