import React, { useState, useRef } from 'react';
import { Utensils, Camera, AlertCircle, Lightbulb } from 'lucide-react';
import { HealthData } from '@/hooks/useHealthData';

interface FoodDrinkSectionProps {
  lastFoodRating: HealthData['lastFoodRating'];
  onSetFoodRating: (rating: HealthData['lastFoodRating']) => void;
}

export const FoodDrinkSection: React.FC<FoodDrinkSectionProps> = ({
  lastFoodRating,
  onSetFoodRating,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [nutritionTip, setNutritionTip] = useState<string>(
    '🥬 Too much potassium this week! Include more low-potassium vegetables like cabbage, cauliflower, and green beans in your meals.'
  );
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
        const analyses = [
          { 
            rating: 'good' as const, 
            message: '🥗 Great choice! Low sodium and potassium-friendly meal.',
            tip: '💚 Keep it up! Your kidney-friendly choices are paying off.'
          },
          { 
            rating: 'moderate' as const, 
            message: '🍽️ Moderate potassium content. Watch portion sizes.',
            tip: '🥬 Try pairing this with low-potassium veggies next time.'
          },
          { 
            rating: 'poor' as const, 
            message: '⚠️ High in potassium/phosphorus. Limit these foods.',
            tip: '🥬 Too much potassium this week! Include more low-potassium vegetables like cabbage, cauliflower, and green beans in your meals.'
          },
        ];
        const result = analyses[Math.floor(Math.random() * analyses.length)];
        setAnalysisResult(result.message);
        setNutritionTip(result.tip);
        onSetFoodRating(result.rating);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

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

      {/* Nutrition tip/advice */}
      <div className="bg-secondary/50 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-foreground mb-1">Weekly Nutrition Insight</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {nutritionTip}
            </p>
          </div>
        </div>
      </div>

      {/* Helpful tips */}
      <div className="mt-3 p-3 rounded-xl bg-primary/5">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">💡 Tip:</span> Take photos of your meals to get instant kidney-friendly feedback and track your nutrition patterns.
        </div>
      </div>
    </div>
  );
};
