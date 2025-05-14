
import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowLeft, ArrowRight, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const StepTwo: React.FC = () => {
  const {
    onboardingData,
    updateCompetitor,
    addCompetitor,
    removeCompetitor,
    setCurrentStep,
    isStepValid,
    createStepRecord
  } = useOnboarding();

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (isStepValid()) {
      // Create a record for step 2 asynchronously without blocking transition
      createStepRecord(2).catch(err => console.error('Error creating step record:', err));
      // Move to next step immediately
      setCurrentStep(3);
    }
  };

  // Apple-inspired animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-2xl font-semibold text-gray-900 mb-2"
          variants={itemVariants}
        >
          Who are your competitors?
        </motion.h1>
        <motion.p 
          className="text-gray-500 max-w-sm mx-auto text-sm"
          variants={itemVariants}
        >
          Specify up to 3 key competitors you want to monitor for the most relevant insights.
        </motion.p>
      </motion.div>

      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {onboardingData.competitors.map((competitor, index) => (
          <motion.div 
            key={competitor.id} 
            variants={itemVariants}
            className="flex items-center space-x-3"
          >
            <div className="flex-grow space-y-2">
              <Label htmlFor={`competitor-${competitor.id}`} className="text-sm font-medium text-gray-700">
                Competitor {index + 1} {index === 0 && <span className="text-brand-blue">*</span>}
              </Label>
              <Input
                id={`competitor-${competitor.id}`}
                type="text"
                value={competitor.name}
                onChange={(e) => updateCompetitor(competitor.id, e.target.value)}
                placeholder={`E.g. CompetitorX.com`}
                className="w-full p-2 rounded-lg border-gray-200 bg-gray-50 hover:border-gray-300 focus-visible:ring-1 focus-visible:ring-brand-blue focus-visible:border-brand-blue transition-colors text-sm"
                required={index === 0}
              />
            </div>
            {index === onboardingData.competitors.length - 1 && onboardingData.competitors.length < 3 ? (
              <Button
                type="button"
                onClick={addCompetitor}
                variant="outline"
                className="mt-8 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-full"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            ) : (
              index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeCompetitor(competitor.id)}
                  variant="outline"
                  className="mt-8 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-full"
                  size="icon"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="text-xs text-gray-500"
          variants={itemVariants}
        >
          Choose the competitors most critical to your strategy. You can request changes later if needed.
        </motion.p>
      </motion.div>

      <motion.div 
        className="mt-10 flex justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleBack}
            className="group px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-full text-sm shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleNext}
            className={`group px-5 py-2 text-sm rounded-full shadow-sm transition-all duration-200 ${
              !isStepValid() 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-brand-blue hover:bg-brand-darkBlue text-white'
            }`}
            disabled={!isStepValid()}
          >
            <span>Continue</span>
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepTwo;
