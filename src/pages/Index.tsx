import React, { useState } from 'react';
import { useHealthData } from '@/hooks/useHealthData';
import { KidneyPlant } from '@/components/KidneyPlant';
import { StatusBand } from '@/components/StatusBand';
import { WaterWeeSection } from '@/components/WaterWeeSection';
import { PressurePulseSection } from '@/components/PressurePulseSection';
import { FoodDrinkSection } from '@/components/FoodDrinkSection';
import { ExerciseEnergySection } from '@/components/ExerciseEnergySection';
import { EdemaSection } from '@/components/EdemaSection';
import { TabletsSymptoms } from '@/components/TabletsSymptoms';
import { EGFRSection } from '@/components/EGFRSection';
import { MoodSection } from '@/components/MoodSection';
import { DailySummary } from '@/components/DailySummary';
import { WeeklyMotivationCard } from '@/components/WeeklyMotivationCard';
import { SpeechInput } from '@/components/SpeechInput';
import { Leaf, Calendar, RotateCcw } from 'lucide-react';

const Index = () => {
  const {
    data,
    plantState,
    showFlowers,
    showSunshine,
    isAtRisk,
    addDrink,
    setWeeColor,
    updateBloodPressure,
    updateWeight,
    addSaltyMeal,
    addAlcohol,
    setFoodRating,
    addExercise,
    setEnergyLevel,
    setEdemaLevel,
    toggleMedication,
    setSymptom,
    setMood,
    resetDay,
  } = useHealthData();

  const [showEGFRChart, setShowEGFRChart] = useState(false);
  const [showWeeklyCard, setShowWeeklyCard] = useState(false);

  const handleVoiceTranscript = (text: string) => {
    const lower = text.toLowerCase();
    
    // Parse voice commands
    if (lower.includes('water') || lower.includes('drink') || lower.includes('glass')) {
      if (lower.includes('big') || lower.includes('large')) {
        addDrink('large');
      } else {
        addDrink('small');
      }
    }
    if (lower.includes('walk')) {
      if (lower.includes('long') || lower.includes('30')) {
        addExercise('long');
      } else {
        addExercise('short');
      }
    }
    if (lower.includes('exercise') || lower.includes('gym') || lower.includes('yoga')) {
      addExercise('other');
    }
    if (lower.includes('happy') || lower.includes('good') || lower.includes('great')) {
      setMood('happy');
    }
    if (lower.includes('okay') || lower.includes('fine') || lower.includes('alright')) {
      setMood('okay');
    }
    if (lower.includes('sad') || lower.includes('bad') || lower.includes('tired')) {
      setMood('sad');
    }
    if (lower.includes('medicine') || lower.includes('tablet') || lower.includes('pill') || lower.includes('medication')) {
      toggleMedication(data.medicationsTotal);
    }
    if (lower.includes('salty') || lower.includes('takeaway') || lower.includes('fast food')) {
      addSaltyMeal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Kidney Garden</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWeeklyCard(true)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Weekly summary"
            >
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={resetDay}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Reset day"
            >
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Status band */}
        <StatusBand
          eGFR={data.eGFR}
          trend={data.eGFRTrend}
          isAtRisk={isAtRisk}
          onShowChart={() => setShowEGFRChart(true)}
        />

        {/* Central Plant */}
        <div className="health-card flex flex-col items-center animate-glow">
          <KidneyPlant
            state={plantState}
            showFlowers={showFlowers}
            showSunshine={showSunshine}
            mood={data.mood}
          />
        </div>

        {/* Speech Input */}
        <SpeechInput onTranscript={handleVoiceTranscript} />

        {/* Health Tracking Sections */}
        <div className="space-y-4">
          {/* Section 1: Water & Wee */}
          <WaterWeeSection
            drinks={data.drinks}
            weeColor={data.weeColor}
            onAddDrink={addDrink}
            onSetWeeColor={setWeeColor}
          />

          {/* Section 2: Blood Pressure & Pulse */}
          <PressurePulseSection
            bloodPressure={data.bloodPressure}
            weight={data.weight}
            onUpdateBP={updateBloodPressure}
            onUpdateWeight={updateWeight}
          />

          {/* Section 3: Food & Drink */}
          <FoodDrinkSection
            saltyMeals={data.saltyMeals}
            alcoholDays={data.alcoholDays}
            weeklySaltyMeals={data.weeklySaltyMeals}
            weeklyAlcoholDays={data.weeklyAlcoholDays}
            lastFoodRating={data.lastFoodRating}
            onAddSaltyMeal={addSaltyMeal}
            onAddAlcohol={addAlcohol}
            onSetFoodRating={setFoodRating}
          />

          {/* Section 4: Exercise & Energy */}
          <ExerciseEnergySection
            shortWalks={data.shortWalks}
            longWalks={data.longWalks}
            otherExercise={data.otherExercise}
            energyLevel={data.energyLevel}
            exerciseStreak={data.exerciseStreak}
            weeklyActiveDays={data.weeklyActiveDays}
            onAddExercise={addExercise}
            onSetEnergy={setEnergyLevel}
          />

          {/* Section 5: Edema */}
          <EdemaSection
            edemaLevel={data.edemaLevel}
            onSetEdema={setEdemaLevel}
          />

          {/* Section 6: Tablets & Symptoms */}
          <TabletsSymptoms
            medicationsTaken={data.medicationsTaken}
            medicationsTotal={data.medicationsTotal}
            symptoms={data.symptoms}
            onToggleMedication={toggleMedication}
            onSetSymptom={setSymptom}
          />

          {/* Section 7: eGFR */}
          <EGFRSection
            eGFR={data.eGFR}
            trend={data.eGFRTrend}
            history={data.eGFRHistory}
            isOpen={showEGFRChart}
            onOpenChange={setShowEGFRChart}
          />

          {/* Mood Section */}
          <MoodSection
            mood={data.mood}
            moodStreak={data.moodStreak}
            onSetMood={setMood}
          />

          {/* Daily Summary */}
          <DailySummary data={data} plantState={plantState} />
        </div>

        {/* Footer spacing */}
        <div className="h-8" />
      </main>

      {/* Weekly Motivation Card Modal */}
      <WeeklyMotivationCard
        data={data}
        isOpen={showWeeklyCard}
        onClose={() => setShowWeeklyCard(false)}
      />
    </div>
  );
};

export default Index;
