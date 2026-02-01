import React from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface MedicationSectionProps {
  medicationsTaken: number;
  medicationsTotal: number;
  symptoms: HealthData['symptoms'];
  onToggleMedication: (taken: number) => void;
}

const medications = [
  { name: 'Lisinopril', time: 'Morning' },
  { name: 'Furosemide', time: 'Morning' },
  { name: 'Calcium', time: 'Evening' },
];

export const MedicationSection: React.FC<MedicationSectionProps> = ({
  medicationsTaken,
  medicationsTotal,
  symptoms,
  onToggleMedication,
}) => {
  const hasStrongSymptoms = Object.values(symptoms).some(s => s === 'strong');
  const allMedsTaken = medicationsTaken === medicationsTotal;

  return (
    <div className="health-card">
      <div className="section-header">
        <Pill className="w-5 h-5 text-primary" />
        <span>Medication</span>
      </div>

      {/* Medications */}
      <div>
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
