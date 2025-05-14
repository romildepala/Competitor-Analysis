
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StepFive: React.FC = () => {
  const { onboardingData } = useOnboarding();
  
  // Function to get date 7 days from now
  const getNextReportDate = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return nextWeek.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Apple-inspired animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
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

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto p-8">
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={circleVariants}
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-brand-lightBlue flex items-center justify-center"
        >
          <CheckCircle className="h-8 w-8 text-brand-blue" />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-2xl font-semibold text-gray-900 mb-2"
        >
          You're All Set!
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-500 max-w-sm mx-auto text-sm"
        >
          Your competitive intelligence subscription has been activated.
        </motion.p>
      </motion.div>

      <motion.div 
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4"
        >
          <h3 className="font-medium text-gray-900 text-sm">What happens next?</h3>
          
          <div className="space-y-3">
            <div className="flex">
              <div className="mr-3 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-lightBlue text-brand-blue text-xs font-medium">
                1
              </div>
              <p className="text-xs text-gray-700">
                <span className="font-medium">Preliminary Report:</span> We're compiling your first insights report to be delivered to <span className="font-medium text-gray-900">{onboardingData.email}</span> within 24 hours.
              </p>
            </div>
            
            <div className="flex">
              <div className="mr-3 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-lightBlue text-brand-blue text-xs font-medium">
                2
              </div>
              <p className="text-xs text-gray-700">
                <span className="font-medium">Weekly Reports:</span> Your comprehensive weekly intelligence reports will begin on <span className="font-medium text-brand-blue">{getNextReportDate()}</span>.
              </p>
            </div>
            
            {onboardingData.interestedInPremium && (
              <div className="flex">
                <div className="mr-3 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-lightBlue text-brand-blue text-xs font-medium">
                  3
                </div>
                <p className="text-xs text-gray-700">
                  <span className="font-medium">Insider Insights:</span> Thank you for your interest! We'll notify you when this premium feature becomes available.
                </p>
              </div>
            )}
          </div>
          
          <div className="pt-3 mt-3 border-t border-gray-100 text-xs text-gray-600">
            <p>
              You'll receive a welcome email shortly with additional information about your subscription.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="mt-10 flex justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <p className="text-gray-500 text-sm text-center">
            You may close this page now. We'll contact you by email soon.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepFive;
