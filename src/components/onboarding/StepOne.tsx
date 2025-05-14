import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StepOne: React.FC = () => {
  const { onboardingData, updateOnboardingData, setCurrentStep, isStepValid, createStepRecord } = useOnboarding();

  const handleNext = () => {
    if (isStepValid()) {
      // Create a record for step 1 asynchronously without blocking the transition
      createStepRecord(1).catch(err => console.error('Error creating step record:', err));
      setCurrentStep(2);
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
          Welcome to CompIntel Pro
        </motion.h1>
        <motion.p 
          className="text-gray-500 max-w-sm mx-auto text-sm"
          variants={itemVariants}
        >
          Let's tailor your competitive intelligence service to meet your specific needs.
        </motion.p>
      </motion.div>

      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address <span className="text-black">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={onboardingData.email}
              onChange={(e) => updateOnboardingData({ email: e.target.value })}
              placeholder="your.email@company.com"
              className="w-full p-2 rounded-lg border-gray-200 bg-gray-50 hover:border-gray-300 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-colors text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll use this email to deliver your intelligence reports.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company Name <span className="text-black">*</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              value={onboardingData.companyName}
              onChange={(e) => updateOnboardingData({ companyName: e.target.value })}
              placeholder="Your Company, Inc."
              className="w-full p-2 rounded-lg border-gray-200 bg-gray-50 hover:border-gray-300 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-colors text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This helps us contextualize the competitive landscape for your business.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="pt-6 flex justify-end"
          variants={itemVariants}
        >
          <Button
            onClick={handleNext}
            className={`group px-5 py-2 text-sm rounded-full shadow-sm transition-all duration-200 ${
              !isStepValid() 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 text-white'
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

export default StepOne;
