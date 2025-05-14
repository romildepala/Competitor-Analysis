import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const StepFour: React.FC = () => {
  const { onboardingData, setCurrentStep, setPaymentSuccessful, createStepRecord } = useOnboarding();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    setCurrentStep(3);
  };

  // Generate a random customer ID
  const generateRandomCustomerId = () => {
    // Generate a random string that uses timestamp + random values to ensure uniqueness
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `customer_${timestamp}_${randomStr}`;
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      const apiKey = "am_pk_test_2x3ldHrgmNweqkG68YcMXcBggZb";
      const customerId = generateRandomCustomerId();

      const apiResponse = await fetch('https://api.useautumn.com/v1/attach', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: "standard",
          customer_id: customerId,
          force_checkout: true,
          metadata: {
            customerName: onboardingData.companyName,
            customerEmail: onboardingData.email,
          }
        }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({ message: 'Failed to parse error response from API' }));
        throw new Error(`API request failed with status ${apiResponse.status}: ${errorData.message || apiResponse.statusText}`);
      }

      const responseData = await apiResponse.json();
      
      // Create a record for step 4 (payment) asynchronously without blocking transition
      createStepRecord(4).catch(error => {
        console.error('Error creating step record:', error);
      });
      
      // Check if the response is successful and has data
      if (responseData && responseData.checkout_url) {
        window.location.href = responseData.checkout_url;
      } else {
        throw new Error(`Failed to get checkout URL from API response: ${JSON.stringify(responseData)}`);
      }
      
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
    }
  };

  // Count selected monitoring points
  const selectedPointsCount = onboardingData.monitoringPoints.filter(
    (point) => point.selected
  ).length;

  // Count non-empty custom subjects
  const customSubjectsCount = onboardingData.customSubjects.filter(
    (subject) => subject.content.trim() !== ''
  ).length;

  // Function to get next Monday date
  const getNextMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToAdd = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // If today is Sunday, add 1, otherwise add days until next Monday
    
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysToAdd);
    
    return nextMonday.toLocaleDateString('en-US', {
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
        delayChildren: 0.05,
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
        className="text-center mb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-2xl font-semibold text-gray-900 mb-2"
          variants={itemVariants}
        >
          Review Your Intelligence Package
        </motion.h1>
        <motion.p 
          className="text-gray-500 max-w-sm mx-auto text-sm"
          variants={itemVariants}
        >
          Confirm your subscription details before proceeding to payment.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/80">
            <h2 className="text-sm font-medium text-gray-800">Your CompIntel Pro Package</h2>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-800">Founder's Intelligence Package</h3>
                <span className="text-sm font-medium text-gray-900">$99/month</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Includes:</h4>
              <ul className="space-y-3">
                <motion.li variants={itemVariants} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Monitoring of {onboardingData.competitors.filter(c => c.name.trim() !== '').length} competitors
                  </span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {selectedPointsCount > 0 && customSubjectsCount > 0 ? (
                      <>Tracking of {selectedPointsCount} standard monitoring points and {customSubjectsCount} custom data points</>
                    ) : selectedPointsCount > 0 ? (
                      <>Tracking of {selectedPointsCount} standard monitoring points</>
                    ) : customSubjectsCount > 0 ? (
                      <>Tracking of {customSubjectsCount} custom data points</>
                    ) : (
                      <>No monitoring points selected</>
                    )}
                  </span>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Weekly comprehensive intelligence report</span>
                </motion.li>
                {onboardingData.interestedInPremium && (
                  <motion.li variants={itemVariants} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Consultation about our premium Insider Insights service</span>
                  </motion.li>
                )}
              </ul>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-4 pt-3 border-t border-gray-100"
            >
              <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                24hr Quick-Start Bonus
              </div>
              <p className="mt-2 text-sm text-gray-700">
                Subscribe now to receive your preliminary competitor insights report within the next 24 hours.
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants} 
              className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">Total</span>
              <span className="text-xl font-semibold text-gray-900">$99/month</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600"
        >
          <p>
            Payment is processed securely via Stripe. Your subscription can be managed or canceled anytime by contacting support.
          </p>
          <p className="mt-1.5">
            Your first full weekly report will be delivered on {getNextMonday()}.
          </p>
        </motion.div>
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
            disabled={isProcessing}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="group px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded-full text-sm shadow-sm transition-all duration-200"
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Subscribe - $99/month</span>
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepFour;
