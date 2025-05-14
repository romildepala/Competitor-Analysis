
import React, { useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StepFive: React.FC = () => {
  const { setPaymentSuccessful } = useOnboarding();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isEnterprise = queryParams.get('plan') === 'enterprise';

  useEffect(() => {
    // Mark payment as successful
    setPaymentSuccessful(true);
  }, [setPaymentSuccessful]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <motion.div 
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-semibold text-gray-900 mb-2"
          variants={itemVariants}
        >
          {isEnterprise 
            ? "Thank You for Your Interest!" 
            : "Thank You for Your Subscription!"}
        </motion.h1>
        
        <motion.p 
          className="text-gray-500 max-w-sm mx-auto mb-8"
          variants={itemVariants}
        >
          {isEnterprise 
            ? "Our enterprise team will contact you shortly to discuss your specific requirements and build a custom solution." 
            : "Your competitive intelligence journey begins now! We're setting up your account and will be in touch soon."}
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-200 p-6 text-left mb-8"
        >
          <h2 className="font-medium text-gray-800 mb-4">What's Next:</h2>
          
          <div className="space-y-4">
            {isEnterprise ? (
              <>
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      A dedicated enterprise account manager will contact you within 1 business day.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      We'll schedule a consultation to understand your business goals and requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Our team will create a customized competitive intelligence solution tailored to your organization.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Check your email for account activation details.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      We'll send your preliminary report within 24 hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-6 h-6 rounded-full bg-brand-lightBlue flex items-center justify-center text-xs text-brand-blue font-medium mr-3 shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Complete onboarding with our team to fine-tune your monitoring.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            asChild
            className="group rounded-full px-5 py-2.5 bg-brand-blue hover:bg-brand-darkBlue text-white"
          >
            <Link to="/">
              <span>Return to Homepage</span>
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepFive;
