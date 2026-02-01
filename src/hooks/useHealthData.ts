import { useState, useEffect, useCallback } from 'react';

export interface HealthData {
  // Water & Wee
  drinks: number;
  weeColor: 'pale' | 'straw' | 'amber' | 'dark';
  
  // Blood Pressure & Pulse
  bloodPressure: { systolic: number; diastolic: number; pulse: number } | null;
  weight: number | null;
  
  // Food & Drink
  saltyMeals: number;
  alcoholDays: number;
  lastFoodRating: 'good' | 'moderate' | 'poor' | null;
  
  // Exercise & Energy
  shortWalks: number;
  longWalks: number;
  otherExercise: number;
  energyLevel: 'low' | 'medium' | 'high';
  
  // Edema
  edemaLevel: 'none' | 'mild' | 'moderate' | 'severe';
  
  // Tablets & Symptoms
  medicationsTaken: number;
  medicationsTotal: number;
  symptoms: {
    swollenAnkles: 'none' | 'mild' | 'strong';
    nausea: 'none' | 'mild' | 'strong';
    tiredness: 'none' | 'mild' | 'strong';
    darkPee: 'none' | 'mild' | 'strong';
  };
  
  // eGFR
  eGFR: number;
  eGFRTrend: 'up' | 'stable' | 'down';
  
  // Mood
  mood: 'sad' | 'okay' | 'happy';
  
  // Streaks
  exerciseStreak: number;
  moodStreak: number;
  
  // Weekly data
  weeklyActiveDays: number;
  weeklySaltyMeals: number;
  weeklyAlcoholDays: number;
  
  // History for charts
  eGFRHistory: { date: string; value: number }[];
  bpHistory: { date: string; systolic: number; diastolic: number }[];
}

const getInitialData = (): HealthData => {
  const saved = localStorage.getItem('kidneyGardenData');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fall through to default
    }
  }
  
  // Demo data for hackathon
  return {
    drinks: 5,
    weeColor: 'straw',
    bloodPressure: { systolic: 128, diastolic: 78, pulse: 72 },
    weight: 75,
    saltyMeals: 1,
    alcoholDays: 0,
    lastFoodRating: null,
    shortWalks: 1,
    longWalks: 0,
    otherExercise: 0,
    energyLevel: 'medium',
    edemaLevel: 'mild',
    medicationsTaken: 2,
    medicationsTotal: 3,
    symptoms: {
      swollenAnkles: 'mild',
      nausea: 'none',
      tiredness: 'none',
      darkPee: 'none',
    },
    eGFR: 55,
    eGFRTrend: 'stable',
    mood: 'okay',
    exerciseStreak: 3,
    moodStreak: 5,
    weeklyActiveDays: 4,
    weeklySaltyMeals: 2,
    weeklyAlcoholDays: 1,
    eGFRHistory: [
      { date: '2024-01', value: 52 },
      { date: '2024-02', value: 54 },
      { date: '2024-03', value: 53 },
      { date: '2024-04', value: 55 },
      { date: '2024-05', value: 55 },
    ],
    bpHistory: [
      { date: 'Mon', systolic: 130, diastolic: 82 },
      { date: 'Tue', systolic: 128, diastolic: 80 },
      { date: 'Wed', systolic: 132, diastolic: 84 },
      { date: 'Thu', systolic: 126, diastolic: 78 },
      { date: 'Fri', systolic: 128, diastolic: 78 },
    ],
  };
};

export type PlantState = 'thriving' | 'healthy' | 'okay' | 'stressed' | 'wilted';

export const useHealthData = () => {
  const [data, setData] = useState<HealthData>(getInitialData);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('kidneyGardenData', JSON.stringify(data));
  }, [data]);
  
  // Calculate plant state based on all health factors
  const calculatePlantState = useCallback((): PlantState => {
    let score = 50; // Base score
    
    // Hydration (drinks)
    if (data.drinks >= 8) score += 10;
    else if (data.drinks >= 6) score += 5;
    else if (data.drinks < 4) score -= 15;
    
    // Wee color
    if (data.weeColor === 'pale' || data.weeColor === 'straw') score += 5;
    else if (data.weeColor === 'dark') score -= 10;
    
    // Blood pressure
    if (data.bloodPressure) {
      const { systolic, diastolic } = data.bloodPressure;
      if (systolic <= 130 && diastolic <= 80) score += 10;
      else if (systolic > 140 || diastolic > 90) score -= 15;
    }
    
    // Exercise
    const totalExercise = data.shortWalks + data.longWalks + data.otherExercise;
    if (totalExercise >= 2) score += 15;
    else if (totalExercise >= 1) score += 8;
    else score -= 5;
    
    // Energy
    if (data.energyLevel === 'high') score += 5;
    else if (data.energyLevel === 'low') score -= 5;
    
    // Mood
    if (data.mood === 'happy') score += 10;
    else if (data.mood === 'sad') score -= 10;
    
    // Salty meals
    if (data.saltyMeals >= 2) score -= 10;
    else if (data.saltyMeals === 0) score += 5;
    
    // Medications
    if (data.medicationsTaken === data.medicationsTotal) score += 10;
    else if (data.medicationsTaken < data.medicationsTotal / 2) score -= 10;
    
    // Symptoms
    const symptomValues = Object.values(data.symptoms);
    const strongSymptoms = symptomValues.filter(s => s === 'strong').length;
    const mildSymptoms = symptomValues.filter(s => s === 'mild').length;
    score -= strongSymptoms * 10;
    score -= mildSymptoms * 3;
    
    // Edema
    if (data.edemaLevel === 'severe') score -= 15;
    else if (data.edemaLevel === 'moderate') score -= 8;
    else if (data.edemaLevel === 'mild') score -= 3;
    
    // Streaks bonus
    if (data.exerciseStreak >= 3) score += 5;
    if (data.moodStreak >= 5) score += 5;
    
    // Map score to plant state
    if (score >= 80) return 'thriving';
    if (score >= 60) return 'healthy';
    if (score >= 40) return 'okay';
    if (score >= 20) return 'stressed';
    return 'wilted';
  }, [data]);
  
  const plantState = calculatePlantState();
  
  // Helper to check if we should show flowers (exercise streak + good overall)
  const showFlowers = data.exerciseStreak >= 3 && (plantState === 'thriving' || plantState === 'healthy');
  
  // Helper to check if we should show sunshine (exercise today + good mood)
  const showSunshine = (data.shortWalks + data.longWalks + data.otherExercise) > 0 && data.mood !== 'sad';
  
  // Update functions
  const addDrink = (size: 'small' | 'large') => {
    setData(prev => ({
      ...prev,
      drinks: prev.drinks + (size === 'small' ? 1 : 2),
    }));
  };
  
  const setWeeColor = (color: HealthData['weeColor']) => {
    setData(prev => ({ ...prev, weeColor: color }));
  };
  
  const updateBloodPressure = (systolic: number, diastolic: number, pulse: number) => {
    setData(prev => ({
      ...prev,
      bloodPressure: { systolic, diastolic, pulse },
      bpHistory: [
        ...prev.bpHistory.slice(-6),
        { date: new Date().toLocaleDateString('en-US', { weekday: 'short' }), systolic, diastolic }
      ],
    }));
  };
  
  const updateWeight = (weight: number) => {
    setData(prev => ({ ...prev, weight }));
  };
  
  const addSaltyMeal = () => {
    setData(prev => ({
      ...prev,
      saltyMeals: prev.saltyMeals + 1,
      weeklySaltyMeals: prev.weeklySaltyMeals + 1,
    }));
  };
  
  const addAlcohol = () => {
    setData(prev => ({
      ...prev,
      alcoholDays: prev.alcoholDays + 1,
      weeklyAlcoholDays: prev.weeklyAlcoholDays + 1,
    }));
  };
  
  const setFoodRating = (rating: HealthData['lastFoodRating']) => {
    setData(prev => ({ ...prev, lastFoodRating: rating }));
  };
  
  const addExercise = (type: 'short' | 'long' | 'other') => {
    setData(prev => {
      const newData = { ...prev };
      if (type === 'short') newData.shortWalks += 1;
      else if (type === 'long') newData.longWalks += 1;
      else newData.otherExercise += 1;
      
      // Update streak and weekly active days
      const totalExercise = newData.shortWalks + newData.longWalks + newData.otherExercise;
      if (totalExercise === 1) {
        newData.exerciseStreak += 1;
        newData.weeklyActiveDays += 1;
      }
      
      return newData;
    });
  };
  
  const setEnergyLevel = (level: HealthData['energyLevel']) => {
    setData(prev => ({ ...prev, energyLevel: level }));
  };
  
  const setEdemaLevel = (level: HealthData['edemaLevel']) => {
    setData(prev => ({ ...prev, edemaLevel: level }));
  };
  
  const toggleMedication = (taken: number) => {
    setData(prev => ({ ...prev, medicationsTaken: taken }));
  };
  
  const setSymptom = (symptom: keyof HealthData['symptoms'], level: 'none' | 'mild' | 'strong') => {
    setData(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: level },
    }));
  };
  
  const setMood = (mood: HealthData['mood']) => {
    setData(prev => {
      const newStreak = mood !== 'sad' ? prev.moodStreak + 1 : 0;
      return { ...prev, mood, moodStreak: newStreak };
    });
  };
  
  const resetDay = () => {
    setData(prev => ({
      ...prev,
      drinks: 0,
      saltyMeals: 0,
      alcoholDays: 0,
      shortWalks: 0,
      longWalks: 0,
      otherExercise: 0,
      medicationsTaken: 0,
      lastFoodRating: null,
    }));
  };
  
  // Risk prediction based on data
  const isAtRisk = 
    (data.bloodPressure && (data.bloodPressure.systolic > 140 || data.bloodPressure.diastolic > 90)) ||
    data.eGFRTrend === 'down' ||
    Object.values(data.symptoms).filter(s => s === 'strong').length >= 2 ||
    data.edemaLevel === 'severe';
  
  return {
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
  };
};
