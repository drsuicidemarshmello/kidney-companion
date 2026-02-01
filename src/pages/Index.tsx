import React, { useState } from 'react';
import { useHealthData } from '@/hooks/useHealthData';
import { KidneyPlant } from '@/components/KidneyPlant';
import { StatusBand } from '@/components/StatusBand';
import { FeelingsSection } from '@/components/FeelingsSection';
import { PressurePulseSection } from '@/components/PressurePulseSection';
import { FoodDrinkSection } from '@/components/FoodDrinkSection';
import { ExerciseEnergySection } from '@/components/ExerciseEnergySection';
import { EdemaSection } from '@/components/EdemaSection';
import { MedicationSection } from '@/components/MedicationSection';
import { EGFRSection } from '@/components/EGFRSection';
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
    updateBloodPressure,
    updateWeight,
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
    if (lower.includes('walk')) {
      if (lower.includes('long')) {
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
        {/* Status band with greeting */}
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

        {/* Daily Summary - moved below plant */}
        <DailySummary data={data} plantState={plantState} />

        {/* Speech Input */}
        <SpeechInput onTranscript={handleVoiceTranscript} />

        {/* Health Tracking Sections */}
        <div className="space-y-4">
          {/* Section 1: How Are You Feeling (replaced Water & Wee) */}
          <FeelingsSection
            symptoms={data.symptoms}
            mood={data.mood}
            moodStreak={data.moodStreak}
            onSetSymptom={setSymptom}
            onSetMood={setMood}
          />

          {/* Section 2: Blood Pressure, Pulse & Weight */}
          <PressurePulseSection
            bloodPressure={data.bloodPressure}
            weight={data.weight}
            onUpdateBP={updateBloodPressure}
            onUpdateWeight={updateWeight}
          />

          {/* Section 3: Food & Drink */}
          <FoodDrinkSection
            lastFoodRating={data.lastFoodRating}
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

          {/* Section 6: Medication (renamed from Tablets & Symptoms) */}
          <MedicationSection
            medicationsTaken={data.medicationsTaken}
            medicationsTotal={data.medicationsTotal}
            symptoms={data.symptoms}
            onToggleMedication={toggleMedication}
          />

          {/* Section 7: eGFR */}
          <EGFRSection
            eGFR={data.eGFR}
            trend={data.eGFRTrend}
            history={data.eGFRHistory}
            isOpen={showEGFRChart}
            onOpenChange={setShowEGFRChart}
          />
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
