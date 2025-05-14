
import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowLeft, ArrowRight, Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

const StepThree: React.FC = () => {
  const {
    onboardingData,
    toggleMonitoringPoint,
    updateCustomSubject,
    addCustomSubject,
    removeCustomSubject,
    toggleInterestedInPremium,
    setCurrentStep,
    createStepRecord
  } = useOnboarding();

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleNext = () => {
    // Create a record for step 3 asynchronously without blocking transition
    createStepRecord(3).catch(err => console.error('Error creating step record:', err));
    // Move to next step immediately
    setCurrentStep(4);
  };

  // Count selected monitoring points and non-empty custom subjects
  const selectedPoints = onboardingData.monitoringPoints.filter(point => point.selected).length;
  const customPoints = onboardingData.customSubjects.filter(subject => subject.content.trim() !== '').length;
  const hasSelection = selectedPoints > 0 || customPoints > 0;

  // Apple-inspired animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
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
      <motion.div className="text-center mb-10" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="text-2xl font-semibold text-gray-900 mb-2" variants={itemVariants}>
          Customize Your Intelligence
        </motion.h1>
        <motion.p className="text-gray-500 max-w-sm mx-auto text-sm" variants={itemVariants}>
          Select the information categories you'd like us to track for your competitors.
        </motion.p>
      </motion.div>

      <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-medium text-gray-800 mb-4">Standard Monitoring Points</h2>
          
          <div className="space-y-3.5">
            {onboardingData.monitoringPoints.map(point => (
              <div key={point.id} className="flex items-start space-x-3 group">
                <div className="pt-0.5">
                  <Checkbox 
                    id={`point-${point.id}`} 
                    checked={point.selected} 
                    onCheckedChange={() => toggleMonitoringPoint(point.id)} 
                    className="border-gray-300 data-[state=checked]:border-brand-blue data-[state=checked]:bg-brand-blue transition-colors" 
                  />
                </div>
                <div className="space-y-1">
                  <Label 
                    htmlFor={`point-${point.id}`} 
                    className="text-sm font-medium text-gray-800 cursor-pointer group-hover:text-gray-900 transition-colors"
                  >
                    {point.name}
                  </Label>
                  {point.description && (
                    <p className="text-xs text-gray-500">{point.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-800">Custom Monitoring Subjects</h2>
            <Button 
              type="button" 
              onClick={addCustomSubject} 
              variant="outline" 
              className="h-8 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-full" 
              size="icon"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {onboardingData.customSubjects.map(subject => (
              <div key={subject.id} className="flex items-center gap-2">
                <div className="flex-grow">
                  <Input 
                    placeholder="E.g. Competitor's pricing strategy" 
                    value={subject.content} 
                    onChange={e => updateCustomSubject(subject.id, e.target.value)} 
                    className="w-full p-2 rounded-lg border-gray-200 bg-white hover:border-gray-300 focus-visible:ring-1 focus-visible:ring-brand-blue focus-visible:border-brand-blue transition-colors text-sm" 
                  />
                </div>
                {onboardingData.customSubjects.length > 1 && (
                  <Button 
                    type="button" 
                    onClick={() => removeCustomSubject(subject.id)} 
                    variant="outline" 
                    className="h-8 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors duration-200 rounded-full" 
                    size="icon"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="pt-0.5">
              <Checkbox 
                id="premium-interest" 
                checked={onboardingData.interestedInPremium} 
                onCheckedChange={toggleInterestedInPremium} 
                className="border-gray-300 data-[state=checked]:border-brand-blue data-[state=checked]:bg-brand-blue transition-colors" 
              />
            </div>
            <div>
              <Label htmlFor="premium-interest" className="text-sm font-medium text-gray-800 cursor-pointer">
                I'd like to hear about Expert Interviews when it launches
              </Label>
              <p className="text-xs text-gray-600 mt-1">
                We're developing a premium service for ethically sourced, in-depth insider intelligence via specialized industry interviews.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="mt-10 flex justify-between" variants={containerVariants} initial="hidden" animate="visible">
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
            disabled={!hasSelection} 
            className={`group px-5 py-2 text-sm rounded-full shadow-sm transition-all duration-200 ${
              !hasSelection 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-brand-blue hover:bg-brand-darkBlue text-white'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepThree;
