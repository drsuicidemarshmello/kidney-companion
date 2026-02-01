import React, { useState } from 'react';
import { Heart, Plus, Scale } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PressurePulseSectionProps {
  bloodPressure: HealthData['bloodPressure'];
  weight: number | null;
  onUpdateBP: (systolic: number, diastolic: number, pulse: number) => void;
  onUpdateWeight: (weight: number) => void;
}

export const PressurePulseSection: React.FC<PressurePulseSectionProps> = ({
  bloodPressure,
  weight,
  onUpdateBP,
  onUpdateWeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [systolic, setSystolic] = useState(bloodPressure?.systolic.toString() || '');
  const [diastolic, setDiastolic] = useState(bloodPressure?.diastolic.toString() || '');
  const [pulse, setPulse] = useState(bloodPressure?.pulse.toString() || '');
  const [newWeight, setNewWeight] = useState(weight?.toString() || '');

  const getBPStatus = () => {
    if (!bloodPressure) return { label: 'No reading', color: 'bg-muted text-muted-foreground' };
    const { systolic, diastolic } = bloodPressure;
    if (systolic <= 120 && diastolic <= 80) return { label: 'Optimal', color: 'bg-success/15 text-success' };
    if (systolic <= 130 && diastolic <= 85) return { label: 'OK', color: 'bg-success/15 text-success' };
    if (systolic <= 140 && diastolic <= 90) return { label: 'Elevated', color: 'bg-warning/15 text-warning' };
    return { label: 'High', color: 'bg-danger/15 text-danger' };
  };

  const status = getBPStatus();

  const handleSubmit = () => {
    const s = parseInt(systolic);
    const d = parseInt(diastolic);
    const p = parseInt(pulse);
    if (s && d && p) {
      onUpdateBP(s, d, p);
    }
    if (newWeight) {
      onUpdateWeight(parseFloat(newWeight));
    }
    setIsOpen(false);
  };

  return (
    <div className="health-card">
      <div className="section-header">
        <Heart className="w-5 h-5 text-danger" />
        <span>Blood Pressure & Pulse</span>
      </div>

      {/* Add reading button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="btn-primary w-full flex items-center justify-center gap-2 mb-4">
            <Plus className="w-4 h-4" />
            <span>Add reading</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log BP & Weight</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Systolic</label>
                <Input
                  type="number"
                  placeholder="120"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="text-center"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Diastolic</label>
                <Input
                  type="number"
                  placeholder="80"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="text-center"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pulse</label>
                <Input
                  type="number"
                  placeholder="72"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="text-center"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="75.0"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">Save Reading</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Current reading display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
          <div>
            <div className="text-xs text-muted-foreground">Latest BP</div>
            {bloodPressure ? (
              <div className="font-bold text-lg">
                {bloodPressure.systolic}/{bloodPressure.diastolic}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (Pulse {bloodPressure.pulse})
                </span>
              </div>
            ) : (
              <div className="text-muted-foreground">No reading yet</div>
            )}
          </div>
          <span className={`status-pill ${status.color}`}>
            {status.label}
          </span>
        </div>

        {weight && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-semibold">{weight}</span> kg
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
