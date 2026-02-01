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
        return { kidney: '#4ade80', kidneyDark: '#22c55e', kidneyEdge: '#16a34a' };
      case 'healthy':
        return { kidney: '#6ee7b7', kidneyDark: '#34d399', kidneyEdge: '#10b981' };
      case 'okay':
        return { kidney: '#86efac', kidneyDark: '#4ade80', kidneyEdge: '#22c55e' };
      case 'stressed':
        return { kidney: '#bef264', kidneyDark: '#a3e635', kidneyEdge: '#84cc16' };
      case 'wilted':
        return { kidney: '#d4d4aa', kidneyDark: '#a3a370', kidneyEdge: '#857d4d' };
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

  const getScale = () => {
    if (state === 'wilted') return 0.9;
    if (state === 'stressed') return 0.95;
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

      {/* The Kidney Plant SVG */}
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
          <linearGradient id="kidneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.kidney} />
            <stop offset="50%" stopColor={colors.kidneyDark} />
            <stop offset="100%" stopColor={colors.kidneyEdge} />
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
          d="M100 200 Q100 175 100 155"
          stroke="#4a9960"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Kidney-shaped body - actual kidney bean shape */}
        <g
          style={{
            transform: `scale(${getScale()})`,
            transformOrigin: '100px 110px',
            transition: 'transform 0.5s ease-out',
          }}
        >
          {/* Left kidney */}
          <g className="animate-leaf-wave" style={{ transformOrigin: '70px 100px' }}>
            <path
              d="M35 100
                 C35 60, 55 40, 75 45
                 C90 48, 95 65, 90 85
                 C85 100, 75 115, 60 120
                 C45 125, 35 115, 35 100
                 Z"
              fill="url(#kidneyGradient)"
              stroke={colors.kidneyEdge}
              strokeWidth="2"
            />
            {/* Kidney hilum (indent) */}
            <path
              d="M70 75 Q80 85, 75 100"
              stroke={colors.kidneyDark}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner detail lines */}
            <path
              d="M50 70 Q55 85, 50 105"
              stroke={colors.kidneyDark}
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            {/* Brown edges for stressed/wilted */}
            {(state === 'stressed' || state === 'wilted') && (
              <path
                d="M35 100 C35 60, 55 40, 75 45"
                stroke="#8b7355"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            )}
          </g>

          {/* Right kidney */}
          <g className="animate-leaf-wave" style={{ transformOrigin: '130px 100px', animationDelay: '0.5s' }}>
            <path
              d="M165 100
                 C165 60, 145 40, 125 45
                 C110 48, 105 65, 110 85
                 C115 100, 125 115, 140 120
                 C155 125, 165 115, 165 100
                 Z"
              fill="url(#kidneyGradient)"
              stroke={colors.kidneyEdge}
              strokeWidth="2"
            />
            {/* Kidney hilum (indent) */}
            <path
              d="M130 75 Q120 85, 125 100"
              stroke={colors.kidneyDark}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner detail lines */}
            <path
              d="M150 70 Q145 85, 150 105"
              stroke={colors.kidneyDark}
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
            {/* Brown edges for stressed/wilted */}
            {(state === 'stressed' || state === 'wilted') && (
              <path
                d="M165 100 C165 60, 145 40, 125 45"
                stroke="#8b7355"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            )}
          </g>

          {/* Connecting vessels/ureter representation */}
          <path
            d="M75 110 Q100 130, 125 110"
            stroke="#4a9960"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Flowers (when thriving) */}
        {showFlowers && (
          <>
            <g className="animate-flower-bloom" style={{ transformOrigin: '50px 40px' }}>
              <circle cx="50" cy="40" r="8" fill="#fca5a5" />
              <circle cx="45" cy="35" r="5" fill="#fecaca" />
              <circle cx="55" cy="35" r="5" fill="#fecaca" />
              <circle cx="50" cy="45" r="5" fill="#fecaca" />
              <circle cx="50" cy="40" r="3" fill="#fcd34d" />
            </g>
            <g className="animate-flower-bloom" style={{ transformOrigin: '150px 40px', animationDelay: '0.2s' }}>
              <circle cx="150" cy="40" r="7" fill="#c4b5fd" />
              <circle cx="145" cy="36" r="4" fill="#ddd6fe" />
              <circle cx="155" cy="36" r="4" fill="#ddd6fe" />
              <circle cx="150" cy="44" r="4" fill="#ddd6fe" />
              <circle cx="150" cy="40" r="2.5" fill="#fcd34d" />
            </g>
          </>
        )}

        {/* Health status tag in soil */}
        <g>
          <rect x="80" y="195" width="40" height="12" rx="2" fill="#f5f5f4" stroke="#d6d3d1" />
          <text x="100" y="204" textAnchor="middle" fontSize="6" fill="#57534e" fontWeight="600">
            KIDNEY
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
        {state === 'healthy' && '🫘 Healthy Kidneys'}
        {state === 'okay' && '🌱 Doing okay'}
        {state === 'stressed' && '😟 A bit stressed'}
        {state === 'wilted' && '🥀 Needs attention'}
      </div>
    </div>
  );
};
