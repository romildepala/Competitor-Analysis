
import React, { useEffect } from 'react';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator.tsx';
import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';
import StepThree from './StepThree.tsx';
import StepFour from './StepFour.tsx';
import { supabase } from '@/integrations/supabase/client';

// Wrapping the OnboardingSteps in a separate function component ensures
// it only gets rendered inside the OnboardingProvider
const OnboardingStepsContent: React.FC = () => {
  const { currentStep, setCurrentStep } = useOnboarding();
  const navigate = useNavigate();

  // Refined animation variants inspired by Apple's smooth transitions
  const variants = {
    initial: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -8,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Redirect to complete page if we're on step 5
  useEffect(() => {
    if (currentStep === 5) {
      navigate('/complete');
    }
  }, [currentStep, navigate]);

  // Define which step component to render
  const renderStep = (step: number) => {
    switch (step) {
      case 1: return <StepOne />;
      case 2: return <StepTwo />;
      case 3: return <StepThree />;
      case 4: return <StepFour />;
      default: return <StepOne />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <ProgressIndicator />
      
      <div className="mt-10 relative min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
          >
            {renderStep(currentStep)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Moved OnboardingSteps into the OnboardingForm component to ensure proper context wrapping
const OnboardingForm: React.FC = () => {
  return (
    <OnboardingProvider>
      <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
          <OnboardingStepsContent />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingForm;
