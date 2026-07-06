import React from 'react';
import { Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

interface PromptHelperProps {
  onSelectPrompt: (promptText: string) => void;
}

export default function PromptHelper({ onSelectPrompt }: PromptHelperProps) {
  const suggestions = [
    {
      title: "Begging for Likes",
      text: "Write a catchy, pleading subtitle for a cute Ugandan kid character with adorable, big, teary cartoon eyes. Encourage people to click the heart icon and make the red heart pop! Make it fun, heartwarming, and include emojis.",
      badge: "Viral"
    },
    {
      title: "Encouraging Shares",
      text: "Create an engaging text overlay asking the viewer to 'copy the link' and share it with their best friends to show kindness. Emphasize that sharing is caring and brings good luck today!",
      badge: "Trending"
    },
    {
      title: "Playful Ugandan Kids",
      text: "Draft a lovely caption about a sweet 3D Ugandan child wearing vibrant Kitenge clothing, telling a short story about how happy they feel when people hit share and follow.",
      badge: "Joyful"
    }
  ];

  return (
    <div className="bg-neutral-900/60 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-pink-500" />
        <h3 className="font-semibold text-white text-sm">Gemini Post Prompting Helpers</h3>
      </div>
      <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
        Use these customized presets to feed the Gemini API and dynamically create highly engaging, customized, viral TikTok captions and catchy overlays.
      </p>

      <div className="space-y-3">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.text)}
            className="w-full text-left p-3 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/80 border border-white/5 hover:border-pink-500/30 transition-all group duration-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-pink-400 group-hover:text-pink-300 transition-colors">
                {item.title}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-700/60 text-neutral-300">
                {item.badge}
              </span>
            </div>
            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {item.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
