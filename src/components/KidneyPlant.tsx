import React from 'react';
import { PlantState } from '@/hooks/useHealthData';
import { Sun, AlertTriangle, Sparkles } from 'lucide-react';

interface KidneyPlantProps {
  state: PlantState;
  showFlowers: boolean;
  showSunshine: boolean;
  mood: 'sad' | 'okay' | 'happy';
}

export const KidneyPlant: React.FC<KidneyPlantProps> = ({
  state,
  showFlowers,
  showSunshine,
  mood,
}) => {
  const getPlantColors = () => {
    switch (state) {
      case 'thriving':
        return { leaf: '#4ade80', leafDark: '#22c55e', leafEdge: '#16a34a' };
      case 'healthy':
        return { leaf: '#6ee7b7', leafDark: '#34d399', leafEdge: '#10b981' };
      case 'okay':
        return { leaf: '#86efac', leafDark: '#4ade80', leafEdge: '#22c55e' };
      case 'stressed':
        return { leaf: '#bef264', leafDark: '#a3e635', leafEdge: '#84cc16' };
      case 'wilted':
        return { leaf: '#d4d4aa', leafDark: '#a3a370', leafEdge: '#857d4d' };
    }
  };

  const colors = getPlantColors();
  
  const getPlantAnimation = () => {
    switch (state) {
      case 'thriving':
      case 'healthy':
        return 'animate-sway';
      case 'okay':
        return 'animate-sway';
      case 'stressed':
      case 'wilted':
        return 'animate-droop';
    }
  };

  const getLeafRotation = () => {
    if (state === 'wilted' || state === 'stressed') return -8;
    return 0;
  };

  const getLeafScale = () => {
    if (state === 'wilted') return 0.85;
    if (state === 'stressed') return 0.92;
    if (state === 'thriving') return 1.05;
    return 1;
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Sunshine effect */}
      {showSunshine && (
        <div className="absolute -top-2 right-1/4 animate-sunshine">
          <div className="relative">
            <Sun className="w-12 h-12 text-sunshine fill-sunshine-glow" />
            {mood === 'happy' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg mt-0.5">😊</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sparkles for thriving state */}
      {state === 'thriving' && (
        <>
          <Sparkles className="absolute top-4 left-1/4 w-5 h-5 text-sunshine animate-sparkle" />
          <Sparkles className="absolute top-8 right-1/3 w-4 h-4 text-sunshine animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-1/3 left-1/3 w-4 h-4 text-sunshine animate-sparkle" style={{ animationDelay: '1s' }} />
        </>
      )}

      {/* Warning icon for wilted state */}
      {state === 'wilted' && (
        <div className="absolute -top-1 left-1/4 animate-bounce-gentle">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
      )}

      {/* The Plant SVG */}
      <svg
        viewBox="0 0 200 280"
        className={`w-48 h-64 ${getPlantAnimation()}`}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Pot */}
        <defs>
          <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4a77d" />
            <stop offset="50%" stopColor="#d4b896" />
            <stop offset="100%" stopColor="#b89b6a" />
          </linearGradient>
          <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b5344" />
            <stop offset="100%" stopColor="#4a3728" />
          </linearGradient>
        </defs>
        
        {/* Pot body */}
        <path
          d="M55 200 L60 260 Q60 270 70 270 L130 270 Q140 270 140 260 L145 200 Z"
          fill="url(#potGradient)"
        />
        {/* Pot rim */}
        <ellipse cx="100" cy="200" rx="48" ry="8" fill="#d4b896" />
        
        {/* Soil */}
        <ellipse cx="100" cy="200" rx="40" ry="6" fill="url(#soilGradient)" />

        {/* Plant stem */}
        <path
          d="M100 200 Q100 170 100 140"
          stroke="#4a9960"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Kidney-shaped leaves */}
        <g
          style={{
            transform: `rotate(${getLeafRotation()}deg) scale(${getLeafScale()})`,
            transformOrigin: '100px 140px',
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Left kidney leaf */}
          <g className="animate-leaf-wave" style={{ transformOrigin: '70px 120px' }}>
            <path
              d="M95 140 Q60 130 50 100 Q45 70 70 60 Q95 55 105 85 Q110 110 95 140"
              fill={colors.leaf}
              stroke={colors.leafEdge}
              strokeWidth="2"
            />
            {/* Leaf vein */}
            <path
              d="M95 140 Q80 110 75 80"
              stroke={colors.leafDark}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Brown edges for stressed/wilted */}
            {(state === 'stressed' || state === 'wilted') && (
              <path
                d="M50 100 Q45 70 70 60"
                stroke="#8b7355"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            )}
          </g>

          {/* Right kidney leaf */}
          <g className="animate-leaf-wave" style={{ transformOrigin: '130px 120px', animationDelay: '0.5s' }}>
            <path
              d="M105 140 Q140 130 150 100 Q155 70 130 60 Q105 55 95 85 Q90 110 105 140"
              fill={colors.leaf}
              stroke={colors.leafEdge}
              strokeWidth="2"
            />
            {/* Leaf vein */}
            <path
              d="M105 140 Q120 110 125 80"
              stroke={colors.leafDark}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Brown edges for stressed/wilted */}
            {(state === 'stressed' || state === 'wilted') && (
              <path
                d="M150 100 Q155 70 130 60"
                stroke="#8b7355"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            )}
          </g>

          {/* Center small leaf */}
          <path
            d="M100 135 Q100 110 90 90 Q85 75 100 70 Q115 75 110 90 Q100 110 100 135"
            fill={colors.leafDark}
            stroke={colors.leafEdge}
            strokeWidth="1.5"
          />
        </g>

        {/* Flowers (when thriving) */}
        {showFlowers && (
          <>
            <g className="animate-flower-bloom" style={{ transformOrigin: '65px 55px' }}>
              <circle cx="65" cy="55" r="8" fill="#fca5a5" />
              <circle cx="60" cy="50" r="5" fill="#fecaca" />
              <circle cx="70" cy="50" r="5" fill="#fecaca" />
              <circle cx="65" cy="60" r="5" fill="#fecaca" />
              <circle cx="65" cy="55" r="3" fill="#fcd34d" />
            </g>
            <g className="animate-flower-bloom" style={{ transformOrigin: '135px 55px', animationDelay: '0.2s' }}>
              <circle cx="135" cy="55" r="7" fill="#c4b5fd" />
              <circle cx="130" cy="51" r="4" fill="#ddd6fe" />
              <circle cx="140" cy="51" r="4" fill="#ddd6fe" />
              <circle cx="135" cy="59" r="4" fill="#ddd6fe" />
              <circle cx="135" cy="55" r="2.5" fill="#fcd34d" />
            </g>
          </>
        )}

        {/* Pressure gauge tag in soil */}
        <g>
          <rect x="85" y="195" width="30" height="12" rx="2" fill="#f5f5f4" stroke="#d6d3d1" />
          <text x="100" y="204" textAnchor="middle" fontSize="7" fill="#57534e" fontWeight="600">
            BP
          </text>
        </g>
      </svg>

      {/* Plant state label */}
      <div className={`mt-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
        state === 'thriving' ? 'bg-plant-thriving/20 text-plant-thriving' :
        state === 'healthy' ? 'bg-plant-healthy/20 text-plant-healthy' :
        state === 'okay' ? 'bg-plant-stressed/20 text-plant-stressed' :
        state === 'stressed' ? 'bg-warning/20 text-warning' :
        'bg-danger/20 text-danger'
      }`}>
        {state === 'thriving' && '🌸 Thriving!'}
        {state === 'healthy' && '🌿 Healthy'}
        {state === 'okay' && '🌱 Doing okay'}
        {state === 'stressed' && '😟 A bit stressed'}
        {state === 'wilted' && '🥀 Needs attention'}
      </div>
    </div>
  );
};
