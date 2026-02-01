import React from 'react';
import { Droplets, GlassWater } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface WaterWeeSectionProps {
  drinks: number;
  weeColor: HealthData['weeColor'];
  onAddDrink: (size: 'small' | 'large') => void;
  onSetWeeColor: (color: HealthData['weeColor']) => void;
}

const weeColors = [
  { id: 'pale' as const, label: 'Very pale', color: '#e8f4f8', textColor: '#6b7280' },
  { id: 'straw' as const, label: 'Straw', color: '#fef3c7', textColor: '#92400e' },
  { id: 'amber' as const, label: 'Amber', color: '#fcd34d', textColor: '#78350f' },
  { id: 'dark' as const, label: 'Dark', color: '#b45309', textColor: '#ffffff' },
];

export const WaterWeeSection: React.FC<WaterWeeSectionProps> = ({
  drinks,
  weeColor,
  onAddDrink,
  onSetWeeColor,
}) => {
  const goalMin = 8;
  const goalMax = 10;
  const isOnTrack = drinks >= goalMin;
  const currentWee = weeColors.find(w => w.id === weeColor);

  return (
    <div className="health-card">
      <div className="section-header">
        <Droplets className="w-5 h-5 text-hydration-good" />
        <span>Water & Wee</span>
      </div>

      {/* Drink buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onAddDrink('small')}
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
        >
          <GlassWater className="w-4 h-4" />
          <span>+ Small glass</span>
        </button>
        <button
          onClick={() => onAddDrink('large')}
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
        >
          <GlassWater className="w-5 h-5" />
          <span>+ Big glass</span>
        </button>
      </div>

      {/* Wee color selector */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Wee colour today:</div>
        <div className="flex justify-between gap-2">
          {weeColors.map((color) => (
            <button
              key={color.id}
              onClick={() => onSetWeeColor(color.id)}
              className={`wee-droplet flex-1 flex items-end justify-center pb-1 ${
                weeColor === color.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              style={{ backgroundColor: color.color }}
              aria-label={color.label}
            >
              <span className="text-[10px] font-medium" style={{ color: color.textColor }}>
                {color.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Status display */}
      <div className={`rounded-xl p-3 ${isOnTrack ? 'bg-success/10' : 'bg-warning/10'}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            <span className="font-bold">{drinks}</span> drinks / goal {goalMin}-{goalMax}
          </span>
          <span className={`text-xs font-semibold ${isOnTrack ? 'text-success' : 'text-warning'}`}>
            {isOnTrack ? '✓ On track!' : 'Keep hydrating'}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Wee: mostly {currentWee?.label.toLowerCase()}
        </div>
      </div>
    </div>
  );
};
