import React from 'react';
import { HealthData } from '@/hooks/useHealthData';
import { X, Trophy, Flame, Heart, Footprints } from 'lucide-react';

interface WeeklyMotivationCardProps {
  data: HealthData;
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyMotivationCard: React.FC<WeeklyMotivationCardProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const goodMoodDays = data.moodStreak;
  const activeDays = data.weeklyActiveDays;
  const perfectMedsDays = data.medicationsTaken === data.medicationsTotal ? 1 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
      <div className="bg-card rounded-3xl shadow-glow w-full max-w-sm p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-sunshine" />
            <span className="font-bold text-lg">Weekly Highlights</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10">
            <Footprints className="w-8 h-8 text-success" />
            <div>
              <div className="font-semibold">{activeDays} active days</div>
              <div className="text-xs text-muted-foreground">Keep moving!</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-sunshine/10">
            <Heart className="w-8 h-8 text-danger" />
            <div>
              <div className="font-semibold">{goodMoodDays}/7 good moods</div>
              <div className="text-xs text-muted-foreground">Mental health matters</div>
            </div>
          </div>

          {data.exerciseStreak >= 3 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-danger/10">
              <Flame className="w-8 h-8 text-danger animate-streak" />
              <div>
                <div className="font-semibold">{data.exerciseStreak} day exercise streak!</div>
                <div className="text-xs text-muted-foreground">You're on fire!</div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-success/10">
          <div className="text-2xl mb-2">🌿💚</div>
          <div className="font-semibold text-foreground">
            Your plant's thriving!
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Keep nurturing yourself
          </div>
        </div>
      </div>
    </div>
  );
};
