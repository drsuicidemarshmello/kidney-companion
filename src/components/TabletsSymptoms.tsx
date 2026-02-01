import React from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface TabletsSymptomsProps {
  medicationsTaken: number;
  medicationsTotal: number;
  symptoms: HealthData['symptoms'];
  onToggleMedication: (taken: number) => void;
  onSetSymptom: (symptom: keyof HealthData['symptoms'], level: 'none' | 'mild' | 'strong') => void;
}

const medications = [
  { name: 'Lisinopril', time: 'Morning' },
  { name: 'Furosemide', time: 'Morning' },
  { name: 'Calcium', time: 'Evening' },
];

const symptomConfig = [
  { id: 'swollenAnkles' as const, label: 'Swollen ankles', emoji: '👢' },
  { id: 'nausea' as const, label: 'Nausea', emoji: '🤢' },
  { id: 'tiredness' as const, label: 'Tiredness', emoji: '😴' },
  { id: 'darkPee' as const, label: 'Dark pee', emoji: '💧' },
];

export const TabletsSymptoms: React.FC<TabletsSymptomsProps> = ({
  medicationsTaken,
  medicationsTotal,
  symptoms,
  onToggleMedication,
  onSetSymptom,
}) => {
  const hasStrongSymptoms = Object.values(symptoms).some(s => s === 'strong');
  const allMedsTaken = medicationsTaken === medicationsTotal;

  return (
    <div className="health-card">
      <div className="section-header">
        <Pill className="w-5 h-5 text-primary" />
        <span>Tablets & Symptoms</span>
      </div>

      {/* Medications */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2 flex items-center justify-between">
          <span>Today's medications</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            allMedsTaken ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
          }`}>
            {medicationsTaken}/{medicationsTotal} taken
          </span>
        </div>
        <div className="space-y-2">
          {medications.map((med, index) => (
            <button
              key={med.name}
              onClick={() => {
                const newTaken = index < medicationsTaken 
                  ? index 
                  : index + 1;
                onToggleMedication(newTaken);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                index < medicationsTaken
                  ? 'bg-success/10 border-2 border-success'
                  : 'bg-secondary border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  index < medicationsTaken
                    ? 'bg-success border-success text-success-foreground'
                    : 'border-muted-foreground'
                }`}>
                  {index < medicationsTaken && <span className="text-xs">✓</span>}
                </div>
                <span className="font-medium text-sm">{med.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{med.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <div className="text-sm font-medium mb-2">How are you feeling?</div>
        <div className="grid grid-cols-2 gap-2">
          {symptomConfig.map((symptom) => {
            const level = symptoms[symptom.id];
            return (
              <div key={symptom.id} className="bg-secondary/50 rounded-xl p-2">
                <div className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                  <span>{symptom.emoji}</span>
                  <span>{symptom.label}</span>
                </div>
                <div className="flex gap-1">
                  {(['none', 'mild', 'strong'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => onSetSymptom(symptom.id, lvl)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                        level === lvl
                          ? lvl === 'none' 
                            ? 'bg-success text-success-foreground' 
                            : lvl === 'mild'
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-danger text-danger-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {lvl === 'none' ? '✓' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning for strong symptoms */}
      {hasStrongSymptoms && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-danger/10 text-danger">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-semibold">Strong symptoms detected</div>
            <div>Consider contacting your care team if symptoms persist.</div>
          </div>
        </div>
      )}
    </div>
  );
};
