import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface StatusBandProps {
  eGFR: number;
  trend: 'up' | 'stable' | 'down';
  isAtRisk: boolean;
  weightChange?: number;
  swellingFrequent?: boolean;
  onShowChart: () => void;
}

export const StatusBand: React.FC<StatusBandProps> = ({
  eGFR,
  trend,
  isAtRisk,
  weightChange = 1.6,
  swellingFrequent = true,
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

  const getRiskLevel = () => {
    if (!isAtRisk) return 'Low';
    if (weightChange > 2 || swellingFrequent) return 'Moderate';
    return 'Elevated';
  };

  const stageInfo = getStageInfo();
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';
  const riskLevel = getRiskLevel();

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4 mb-4">
      {/* Greeting */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground">Good Morning, John! 👋</h1>
        <p className="text-sm text-muted-foreground">Log your progress today!</p>
      </div>

      <div className="flex items-center justify-between mb-3">
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

      {/* Risk Level Detail */}
      <div className={`p-3 rounded-xl mb-3 ${
        isAtRisk ? 'bg-warning/10' : 'bg-success/10'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Info className={`w-4 h-4 ${isAtRisk ? 'text-warning' : 'text-success'}`} />
          <span className={`font-semibold text-sm ${isAtRisk ? 'text-warning' : 'text-success'}`}>
            Risk Level: {riskLevel}
          </span>
        </div>
        
        {isAtRisk ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            Over the past 5 days, your weight has increased by {weightChange} kg and swelling has been reported more frequently. This pattern has previously been associated with fluid retention.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your recent readings have been stable with no significant changes in weight or swelling patterns.
          </p>
        )}
      </div>

      {/* Suggested Action */}
      <div className={`flex items-start gap-2 px-3 py-2 rounded-xl ${
        isAtRisk 
          ? 'bg-danger/10 text-danger' 
          : 'bg-success/10 text-success'
      }`}>
        {isAtRisk ? (
          <>
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium block">Suggested action</span>
              <span className="text-xs opacity-80">
                Consider monitoring fluid and salt intake closely and continue daily logging. Contact your care team if symptoms worsen.
              </span>
            </div>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium">✓ Your readings look stable. Keep up the good work!</span>
          </>
        )}
      </div>
    </div>
  );
};
