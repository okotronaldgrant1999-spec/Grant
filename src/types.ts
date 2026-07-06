export interface ImageAsset {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  creator: string;
  duration: string;
  useCount: string;
  isPlaying?: boolean;
}

export interface OverlayPreset {
  id: string;
  text: string;
  position: 'top' | 'middle' | 'bottom';
  style: 'viral' | 'cute' | 'trending' | 'begging';
  color: string;
}

export interface CommentPreset {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: string;
  time: string;
}
