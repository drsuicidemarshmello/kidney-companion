import React from 'react';
import { Smile, Meh, Frown, Heart } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface MoodSectionProps {
  mood: HealthData['mood'];
  moodStreak: number;
  onSetMood: (mood: HealthData['mood']) => void;
}

const moods = [
  { id: 'sad' as const, label: 'Struggling', icon: Frown, color: 'bg-danger/20 text-danger' },
  { id: 'okay' as const, label: 'Okay', icon: Meh, color: 'bg-warning/20 text-warning-foreground' },
  { id: 'happy' as const, label: 'Good!', icon: Smile, color: 'bg-success/20 text-success' },
];

export const MoodSection: React.FC<MoodSectionProps> = ({
  mood,
  moodStreak,
  onSetMood,
}) => {
  const currentMood = moods.find(m => m.id === mood);

  return (
    <div className="health-card">
      <div className="section-header">
        <Heart className="w-5 h-5 text-danger" />
        <span>Mood & Mind</span>
        {moodStreak >= 5 && (
          <span className="ml-auto text-sm">🎉 {moodStreak} day streak!</span>
        )}
      </div>

      <div className="text-xs text-muted-foreground mb-3">
        How are you feeling today?
      </div>

      <div className="flex gap-3">
        {moods.map((m) => {
          const Icon = m.icon;
          const isSelected = mood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSetMood(m.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl transition-all ${
                isSelected
                  ? `${m.color} ring-2 ring-current ring-offset-2`
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Icon className={`w-8 h-8 ${isSelected ? '' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>

      {mood === 'sad' && (
        <div className="mt-3 p-3 rounded-xl bg-secondary text-sm">
          <div className="font-medium mb-1">💜 We're here for you</div>
          <div className="text-xs text-muted-foreground">
            Tough days happen. Consider reaching out to your care team or a support line if you need to talk.
          </div>
        </div>
      )}
    </div>
  );
};
