import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatusBandProps {
  eGFR: number;
  trend: 'up' | 'stable' | 'down';
  isAtRisk: boolean;
  onShowChart: () => void;
}

export const StatusBand: React.FC<StatusBandProps> = ({
  eGFR,
  trend,
  isAtRisk,
  onShowChart,
}) => {
  const getStageInfo = () => {
    if (eGFR >= 90) return { stage: '1', label: 'Normal', color: 'bg-success' };
    if (eGFR >= 60) return { stage: '2', label: 'Mildly reduced', color: 'bg-success' };
    if (eGFR >= 45) return { stage: '3a', label: 'Mild-Moderate', color: 'bg-warning' };
    if (eGFR >= 30) return { stage: '3b', label: 'Moderate-Severe', color: 'bg-warning' };
    if (eGFR >= 15) return { stage: '4', label: 'Severely reduced', color: 'bg-danger' };
    return { stage: '5', label: 'Kidney failure', color: 'bg-danger' };
  };

  const stageInfo = getStageInfo();
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${stageInfo.color}`} />
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Kidney Status</div>
            <div className="font-bold text-foreground">
              Stage {stageInfo.stage} • {stageInfo.label}
            </div>
          </div>
        </div>
        
        <button
          onClick={onShowChart}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <span className="text-sm font-semibold text-secondary-foreground">
            eGFR ~{eGFR}
          </span>
          <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        </button>
      </div>

      {/* Risk prediction banner */}
      <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl ${
        isAtRisk 
          ? 'bg-danger/10 text-danger' 
          : 'bg-success/10 text-success'
      }`}>
        {isAtRisk ? (
          <>
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">⚠️ You may be at risk of kidney stress. Consider speaking with your care team.</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">✓ Your readings look stable. Keep up the good work!</span>
          </>
        )}
      </div>
    </div>
  );
};
