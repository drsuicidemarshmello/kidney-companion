import React from 'react';
import { Heart, Smile, Meh, Frown } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface FeelingsSectionProps {
  symptoms: HealthData['symptoms'];
  mood: HealthData['mood'];
  moodStreak: number;
  onSetSymptom: (symptom: keyof HealthData['symptoms'], level: 'none' | 'mild' | 'strong') => void;
  onSetMood: (mood: HealthData['mood']) => void;
}

const symptomConfig = [
  { id: 'swollenAnkles' as const, label: 'Swollen ankles', emoji: '👢' },
  { id: 'nausea' as const, label: 'Nausea', emoji: '🤢' },
  { id: 'tiredness' as const, label: 'Tiredness', emoji: '😴' },
  { id: 'darkPee' as const, label: 'Dark pee', emoji: '💧' },
];

const moods = [
  { id: 'sad' as const, label: 'Struggling', icon: Frown, color: 'bg-danger/20 text-danger' },
  { id: 'okay' as const, label: 'Okay', icon: Meh, color: 'bg-warning/20 text-warning-foreground' },
  { id: 'happy' as const, label: 'Good!', icon: Smile, color: 'bg-success/20 text-success' },
];

export const FeelingsSection: React.FC<FeelingsSectionProps> = ({
  symptoms,
  mood,
  moodStreak,
  onSetSymptom,
  onSetMood,
}) => {
  return (
    <div className="health-card">
      <div className="section-header">
        <Heart className="w-5 h-5 text-danger" />
        <span>How Are You Feeling?</span>
        {moodStreak >= 5 && (
          <span className="ml-auto text-sm">🎉 {moodStreak} day streak!</span>
        )}
      </div>

      {/* Mood selector */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Overall mood today:</div>
        <div className="flex gap-3">
          {moods.map((m) => {
            const Icon = m.icon;
            const isSelected = mood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onSetMood(m.id)}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all ${
                  isSelected
                    ? `${m.color} ring-2 ring-current ring-offset-2`
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                <Icon className={`w-7 h-7 ${isSelected ? '' : 'text-muted-foreground'}`} />
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <div className="text-sm text-muted-foreground mb-2">Any symptoms?</div>
        <div className="grid grid-cols-2 gap-2">
          {symptomConfig.map((symptom) => {
            const level = symptoms[symptom.id];
            return (
              <div key={symptom.id} className="bg-secondary/50 rounded-xl p-2">
                <div className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                  <span>{symptom.emoji}</span>
                  <span>{symptom.label}</span>
                </div>
                <div className="flex gap-1">
                  {(['none', 'mild', 'strong'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => onSetSymptom(symptom.id, lvl)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                        level === lvl
                          ? lvl === 'none' 
                            ? 'bg-success text-success-foreground' 
                            : lvl === 'mild'
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-danger text-danger-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {lvl === 'none' ? '✓' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Support message for sad mood */}
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
