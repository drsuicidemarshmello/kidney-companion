import React from 'react';
import { HealthData, PlantState } from '@/hooks/useHealthData';
import { Sparkles } from 'lucide-react';

interface DailySummaryProps {
  data: HealthData;
  plantState: PlantState;
}

export const DailySummary: React.FC<DailySummaryProps> = ({ data, plantState }) => {
  const getMotivationalMessage = () => {
    const totalExercise = data.shortWalks + data.longWalks + data.otherExercise;
    
    if (plantState === 'thriving') {
      return "🌸 Amazing! Your kidney plant is absolutely thriving today!";
    }
    if (plantState === 'healthy' && totalExercise > 0) {
      return "☀️ Great job moving today – your plant's glowing!";
    }
    if (data.mood === 'happy' && data.medicationsTaken === data.medicationsTotal) {
      return "💚 Perfect meds and good mood – you're doing great!";
    }
    if (plantState === 'stressed' || plantState === 'wilted') {
      return "🌱 Every small step counts. Tomorrow is a new day.";
    }
    return "🌿 Keep nurturing yourself – your kidney plant appreciates it!";
  };

  const drinkStatus = data.drinks >= 8 ? '✓' : `${data.drinks}/8`;
  const bpStatus = data.bloodPressure && data.bloodPressure.systolic <= 130 ? '✓' : '–';
  const exerciseCount = data.shortWalks + data.longWalks + data.otherExercise;
  const moodEmoji = data.mood === 'happy' ? '🙂' : data.mood === 'okay' ? '😐' : '😔';

  const issues: string[] = [];
  if (data.saltyMeals > 0) issues.push(`${data.saltyMeals} salty meal${data.saltyMeals > 1 ? 's' : ''}`);
  if (data.edemaLevel !== 'none') issues.push(`${data.edemaLevel} swelling`);
  const hasStrongSymptoms = Object.values(data.symptoms).some(s => s === 'strong');
  if (hasStrongSymptoms) issues.push('symptoms present');

  return (
    <div className="health-card bg-gradient-to-br from-card to-primary-light/30">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-sunshine" />
        <span className="font-bold text-foreground">Daily Summary</span>
      </div>

      <div className="text-sm space-y-1 mb-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span>💧 {data.drinks} drinks {drinkStatus === '✓' && '✓'}</span>
          <span>❤️ BP {bpStatus}</span>
          {exerciseCount > 0 && <span>🚶 {exerciseCount} walk{exerciseCount > 1 ? 's' : ''} ☀️</span>}
          <span>{moodEmoji} {data.mood} mood</span>
          <span>💊 {data.medicationsTaken}/{data.medicationsTotal} meds</span>
        </div>
        
        {issues.length > 0 && (
          <div className="text-xs text-warning-foreground bg-warning/10 rounded px-2 py-1 mt-2">
            ⚠️ {issues.join(', ')}
          </div>
        )}
      </div>

      <div className={`text-sm font-medium p-3 rounded-xl ${
        plantState === 'thriving' || plantState === 'healthy'
          ? 'bg-success/10 text-success'
          : plantState === 'okay'
          ? 'bg-primary/10 text-primary'
          : 'bg-muted text-muted-foreground'
      }`}>
        {getMotivationalMessage()}
      </div>
    </div>
  );
};
