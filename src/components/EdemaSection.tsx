import React from 'react';
import { Waves } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface EdemaSectionProps {
  edemaLevel: HealthData['edemaLevel'];
  onSetEdema: (level: HealthData['edemaLevel']) => void;
}

const edemaLevels = [
  { id: 'none' as const, label: 'None', emoji: '✓', color: 'bg-success/20 text-success' },
  { id: 'mild' as const, label: 'Mild', emoji: '💧', color: 'bg-warning/20 text-warning-foreground' },
  { id: 'moderate' as const, label: 'Moderate', emoji: '💧💧', color: 'bg-warning/30 text-warning-foreground' },
  { id: 'severe' as const, label: 'Severe', emoji: '💧💧💧', color: 'bg-danger/20 text-danger' },
];

export const EdemaSection: React.FC<EdemaSectionProps> = ({
  edemaLevel,
  onSetEdema,
}) => {
  const currentLevel = edemaLevels.find(l => l.id === edemaLevel);

  return (
    <div className="health-card">
      <div className="section-header">
        <Waves className="w-5 h-5 text-hydration-good" />
        <span>Swelling (Edema)</span>
      </div>

      <div className="text-xs text-muted-foreground mb-3">
        Check your ankles, feet, and legs for swelling
      </div>

      <div className="grid grid-cols-4 gap-2">
        {edemaLevels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSetEdema(level.id)}
            className={`btn-track flex flex-col items-center gap-1 py-3 ${
              edemaLevel === level.id
                ? `${level.color} ring-2 ring-offset-1 ring-current`
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <span className="text-base">{level.emoji}</span>
            <span className="text-xs font-medium">{level.label}</span>
          </button>
        ))}
      </div>

      {edemaLevel !== 'none' && (
        <div className={`mt-3 text-xs p-2 rounded-lg ${currentLevel?.color}`}>
          {edemaLevel === 'mild' && '👢 Some swelling noticed. Keep feet elevated when resting.'}
          {edemaLevel === 'moderate' && '⚠️ Noticeable swelling. Reduce salt intake and monitor closely.'}
          {edemaLevel === 'severe' && '🚨 Significant swelling. Contact your care team today.'}
        </div>
      )}
    </div>
  );
};
