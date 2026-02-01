import React from 'react';
import { Footprints, Sun, Dumbbell } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface ExerciseEnergySectionProps {
  shortWalks: number;
  longWalks: number;
  otherExercise: number;
  energyLevel: HealthData['energyLevel'];
  exerciseStreak: number;
  weeklyActiveDays: number;
  onAddExercise: (type: 'short' | 'long' | 'other') => void;
  onSetEnergy: (level: HealthData['energyLevel']) => void;
}

export const ExerciseEnergySection: React.FC<ExerciseEnergySectionProps> = ({
  shortWalks,
  longWalks,
  otherExercise,
  energyLevel,
  exerciseStreak,
  weeklyActiveDays,
  onAddExercise,
  onSetEnergy,
}) => {
  const totalExercise = shortWalks + longWalks + otherExercise;
  const hasExerciseToday = totalExercise > 0;
  const goodStreak = exerciseStreak >= 3;

  return (
    <div className="health-card">
      <div className="section-header">
        <Footprints className="w-5 h-5 text-primary" />
        <span>Movement & Energy</span>
        {goodStreak && (
          <span className="ml-auto text-sm animate-streak">🔥 {exerciseStreak} day streak!</span>
        )}
      </div>

      {/* Exercise buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => onAddExercise('short')}
          className={`btn-track flex flex-col items-center gap-1 py-3 ${
            shortWalks > 0 ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <span className="text-lg">🥾</span>
          <span className="text-xs font-medium">Short walk</span>
          {shortWalks > 0 && (
            <span className="text-xs font-bold">×{shortWalks}</span>
          )}
        </button>

        <button
          onClick={() => onAddExercise('long')}
          className={`btn-track flex flex-col items-center gap-1 py-3 ${
            longWalks > 0 ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <span className="text-lg">🚶</span>
          <span className="text-xs font-medium">Long walk</span>
          {longWalks > 0 && (
            <span className="text-xs font-bold">×{longWalks}</span>
          )}
        </button>

        <button
          onClick={() => onAddExercise('other')}
          className={`btn-track flex flex-col items-center gap-1 py-3 ${
            otherExercise > 0 ? 'bg-primary/20 text-primary' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          <span className="text-xs font-medium">Other</span>
          {otherExercise > 0 && (
            <span className="text-xs font-bold">×{otherExercise}</span>
          )}
        </button>
      </div>

      {/* Energy level */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Energy level:</div>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => onSetEnergy(level)}
              className={`flex-1 py-2 rounded-xl transition-all ${
                energyLevel === level
                  ? 'bg-sunshine/30 ring-2 ring-sunshine'
                  : 'bg-secondary'
              }`}
            >
              <span className="text-lg">
                {level === 'low' && '☀️'}
                {level === 'medium' && '☀️☀️'}
                {level === 'high' && '☀️☀️☀️'}
              </span>
              <div className="text-xs capitalize mt-1">{level}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Status display */}
      <div className={`rounded-xl p-3 ${hasExerciseToday ? 'bg-success/10' : 'bg-muted'}`}>
        <div className="text-sm">
          {hasExerciseToday ? (
            <>
              <span className="font-semibold text-success">Today: </span>
              {shortWalks > 0 && `${shortWalks} short walk${shortWalks > 1 ? 's' : ''}`}
              {longWalks > 0 && `${shortWalks > 0 ? ', ' : ''}${longWalks} long walk${longWalks > 1 ? 's' : ''}`}
              {otherExercise > 0 && `${(shortWalks > 0 || longWalks > 0) ? ', ' : ''}${otherExercise} workout${otherExercise > 1 ? 's' : ''}`}
              <span className="text-muted-foreground"> • Energy: {energyLevel}</span>
            </>
          ) : (
            <span className="text-muted-foreground">No exercise logged yet today</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          This week: {weeklyActiveDays} active day{weeklyActiveDays !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Motivation message */}
      {!hasExerciseToday && exerciseStreak === 0 && (
        <div className="mt-3 text-xs text-center text-muted-foreground bg-primary/5 rounded-lg p-2">
          🌤️ A short walk could really perk up those leaves today!
        </div>
      )}
      {weeklyActiveDays >= 3 && (
        <div className="mt-3 text-xs text-center text-success bg-success/10 rounded-lg p-2">
          🌸 Your plant loves the sunshine! Keep moving.
        </div>
      )}
    </div>
  );
};
