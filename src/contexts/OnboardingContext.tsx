
import React, { createContext, useContext, useState } from 'react';
import { OnboardingContextType, OnboardingData, Competitor, CustomSubject } from './onboarding/types';
import { initialOnboardingData } from './onboarding/initialData';
import { createStepRecord as createStepRecordInSupabase } from './onboarding/supabaseUtils';

// Create the context with a default value
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Context provider component
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for the current step
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  
  // State for the onboarding data
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData);

  // Method to update onboarding data
  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Add a new competitor
  const addCompetitor = () => {
    if (onboardingData.competitors.length < 20) {
      const newId = (onboardingData.competitors.length + 1).toString();
      setOnboardingData(prevData => ({
        ...prevData,
        competitors: [...prevData.competitors, { id: newId, name: '' }]
      }));
    }
  };

  // Update a competitor
  const updateCompetitor = (id: string, name: string) => {
    setOnboardingData(prevData => ({
      ...prevData,
      competitors: prevData.competitors.map(comp => 
        comp.id === id ? { ...comp, name } : comp
      )
    }));
  };

  // Remove a competitor
  const removeCompetitor = (id: string) => {
    setOnboardingData(prevData => ({
      ...prevData,
      competitors: prevData.competitors.filter(comp => comp.id !== id)
    }));
  };

  // Add a new custom subject
  const addCustomSubject = () => {
    const newId = (onboardingData.customSubjects.length + 1).toString();
    setOnboardingData(prevData => ({
      ...prevData,
      customSubjects: [...prevData.customSubjects, { id: newId, content: '' }]
    }));
  };

  // Update a custom subject
  const updateCustomSubject = (id: string, content: string) => {
    setOnboardingData(prevData => ({
      ...prevData,
      customSubjects: prevData.customSubjects.map(subject => 
        subject.id === id ? { ...subject, content } : subject
      )
    }));
  };

  // Remove a custom subject
  const removeCustomSubject = (id: string) => {
    // Ensure we always have at least one custom subject field
    if (onboardingData.customSubjects.length > 1) {
      setOnboardingData(prevData => ({
        ...prevData,
        customSubjects: prevData.customSubjects.filter(subject => subject.id !== id)
      }));
    }
  };

  // Toggle a monitoring point
  const toggleMonitoringPoint = (id: string) => {
    setOnboardingData(prevData => ({
      ...prevData,
      monitoringPoints: prevData.monitoringPoints.map(point => 
        point.id === id ? { ...point, selected: !point.selected } : point
      )
    }));
  };

  // Toggle the "interested in premium" flag
  const toggleInterestedInPremium = () => {
    setOnboardingData(prevData => ({
      ...prevData,
      interestedInPremium: !prevData.interestedInPremium
    }));
  };

  // Validate the current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1: 
        // Validate email and company name
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(onboardingData.email) && onboardingData.companyName.trim() !== '';
      case 2:
        // Validate at least one competitor
        return onboardingData.competitors.length > 0 && 
               onboardingData.competitors[0].name.trim() !== '';
      default:
        return true;
    }
  };

  // Create a new record for the current step in Supabase
  const createStepRecord = async (step: number) => {
    return createStepRecordInSupabase(step, onboardingData, setSubmissionId);
  };

  // Handle step changes - now we add a competitor or custom subject if needed
  const handleStepChange = (step: number) => {
    // If moving to step 2 and there are no competitors, add one
    if (step === 2 && onboardingData.competitors.length === 0) {
      addCompetitor();
    }
    
    // If moving to step 3 and there are no custom subjects, add one
    if (step === 3 && onboardingData.customSubjects.length === 0) {
      addCustomSubject();
    }
    
    // Create a new record for this step asynchronously
    createStepRecord(currentStep).catch(err => console.error('Error creating step record:', err));
    
    setCurrentStep(step);
  };

  const value = {
    currentStep,
    onboardingData,
    updateOnboardingData,
    setCurrentStep: handleStepChange,
    addCompetitor,
    updateCompetitor,
    removeCompetitor,
    toggleMonitoringPoint,
    addCustomSubject,
    updateCustomSubject,
    removeCustomSubject,
    toggleInterestedInPremium,
    isStepValid,
    paymentSuccessful,
    setPaymentSuccessful,
    submissionId,
    createStepRecord
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook for using the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
