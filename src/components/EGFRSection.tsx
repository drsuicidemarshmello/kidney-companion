import React from 'react';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EGFRSectionProps {
  eGFR: number;
  trend: 'up' | 'stable' | 'down';
  history: { date: string; value: number }[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EGFRSection: React.FC<EGFRSectionProps> = ({
  eGFR,
  trend,
  history,
  isOpen,
  onOpenChange,
}) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground';
  const trendLabel = trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable';

  return (
    <>
      <button
        onClick={() => onOpenChange(true)}
        className="health-card w-full text-left hover:shadow-glow transition-shadow"
      >
        <div className="section-header">
          <Activity className="w-5 h-5 text-primary" />
          <span>eGFR Reading</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">{eGFR}</div>
            <div className="text-xs text-muted-foreground">mL/min/1.73m²</div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{trendLabel}</span>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground text-center">
          Tap to view history chart →
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>eGFR History</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }} 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-secondary/50">
              <div className="text-sm">
                <span className="font-semibold">Understanding eGFR:</span>
                <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                  <li>• 90+ = Normal kidney function</li>
                  <li>• 60-89 = Mildly reduced</li>
                  <li>• 45-59 = Mild to moderately reduced</li>
                  <li>• 30-44 = Moderately to severely reduced</li>
                  <li>• 15-29 = Severely reduced</li>
                  <li>• &lt;15 = Kidney failure</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
