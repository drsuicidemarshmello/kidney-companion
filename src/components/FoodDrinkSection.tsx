import React, { useState, useRef } from 'react';
import { Utensils, Camera, Wine, AlertCircle } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface FoodDrinkSectionProps {
  saltyMeals: number;
  alcoholDays: number;
  weeklySaltyMeals: number;
  weeklyAlcoholDays: number;
  lastFoodRating: HealthData['lastFoodRating'];
  onAddSaltyMeal: () => void;
  onAddAlcohol: () => void;
  onSetFoodRating: (rating: HealthData['lastFoodRating']) => void;
}

export const FoodDrinkSection: React.FC<FoodDrinkSectionProps> = ({
  saltyMeals,
  weeklySaltyMeals,
  weeklyAlcoholDays,
  lastFoodRating,
  onAddSaltyMeal,
  onAddAlcohol,
  onSetFoodRating,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate AI analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        const ratings = [
          { rating: 'good' as const, message: '🥗 Great choice! Low sodium, kidney-friendly meal.' },
          { rating: 'moderate' as const, message: '🍽️ Okay choice. Watch the portion size.' },
          { rating: 'poor' as const, message: '🍟 High sodium detected. Limit these meals.' },
        ];
        const result = ratings[Math.floor(Math.random() * ratings.length)];
        setAnalysisResult(result.message);
        onSetFoodRating(result.rating);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const showWarning = weeklySaltyMeals >= 3;

  return (
    <div className="health-card">
      <div className="section-header">
        <Utensils className="w-5 h-5 text-accent-foreground" />
        <span>Food & Drink</span>
      </div>

      {/* Photo analysis */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handlePhotoCapture}
        disabled={isAnalyzing}
        className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
      >
        <Camera className="w-4 h-4" />
        <span>{isAnalyzing ? 'Analyzing...' : 'Take photo of food'}</span>
      </button>

      {/* Analysis result */}
      {analysisResult && (
        <div className={`mb-3 p-3 rounded-xl text-sm ${
          lastFoodRating === 'good' ? 'bg-success/10 text-success' :
          lastFoodRating === 'moderate' ? 'bg-warning/10 text-warning-foreground' :
          'bg-danger/10 text-danger'
        }`}>
          {analysisResult}
        </div>
      )}

      {/* Quick log buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onSetFoodRating('good')}
          className="btn-secondary flex-1 text-xs py-2"
        >
          🥗 Normal meal
        </button>
        <button
          onClick={onAddSaltyMeal}
          className="btn-secondary flex-1 text-xs py-2"
        >
          🧂 Salty/takeaway
        </button>
        <button
          onClick={onAddAlcohol}
          className="btn-secondary flex-1 text-xs py-2"
        >
          <Wine className="w-3 h-3 inline mr-1" />
          Alcohol
        </button>
      </div>

      {/* Weekly summary */}
      <div className="bg-secondary/50 rounded-xl p-3">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salty meals this week:</span>
            <span className={`font-semibold ${weeklySaltyMeals >= 3 ? 'text-warning' : 'text-foreground'}`}>
              {weeklySaltyMeals}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Alcohol days:</span>
            <span className="font-semibold">{weeklyAlcoholDays}</span>
          </div>
        </div>

        {/* Warning message */}
        {showWarning && (
          <div className="mt-2 flex items-start gap-2 text-xs text-warning-foreground bg-warning/10 rounded-lg p-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>A bit salty – your kidneys are working harder this week</span>
          </div>
        )}
      </div>
    </div>
  );
};
