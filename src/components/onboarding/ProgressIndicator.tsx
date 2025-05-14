
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  'Basic Info',
  'Competitors',
  'Monitoring',
  'Review',
  'Complete'
];

const ProgressIndicator: React.FC = () => {
  const { currentStep } = useOnboarding();

  // Clean, Apple-like animation variants
  const circleVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: [1, 1.02, 1],
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    complete: { scale: 1 }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4">
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isComplete = stepNumber < currentStep;
          
          // Determine the state for animations
          const circleState = isActive ? 'active' : isComplete ? 'complete' : 'inactive';
          
          return (
            <React.Fragment key={step}>
              {/* Step circle */}
              <div className="flex flex-col items-center relative z-10">
                <motion.div
                  variants={circleVariants}
                  animate={circleState}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isActive
                      ? 'bg-black text-white'
                      : isComplete
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-400 border border-gray-200'
                  } transition-colors duration-200`}
                >
                  {isComplete ? (
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  ) : (
                    <span className="text-xs">{stepNumber}</span>
                  )}
                </motion.div>
                <div className={`text-xs mt-2 text-center w-16 font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step}
                </div>
              </div>
              
              {/* Connector line (not after the last step) */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 relative z-0 mx-1">
                  <motion.div
                    className="absolute inset-0 bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: isComplete ? 1 : 0,
                      transition: { 
                        duration: 0.4, 
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1
                      }
                    }}
                  ></motion.div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
