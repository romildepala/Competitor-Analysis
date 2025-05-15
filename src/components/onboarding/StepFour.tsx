import React, { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle, ArrowLeft, CreditCard, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const StepFour: React.FC = () => {
  const { onboardingData, setCurrentStep, setPaymentSuccessful, createStepRecord } = useOnboarding();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    setCurrentStep(3);
  };

  // Determine recommended plan based on user responses
  const determineRecommendedPlan = () => {
    const { competitors, monitoringPoints, customSubjects } = onboardingData;
    
    // Count valid competitors (non-empty names)
    const validCompetitors = competitors.filter(c => c.name.trim() !== '').length;
    
    // Count selected monitoring points
    const selectedPoints = monitoringPoints.filter(p => p.selected).length;
    
    // Count valid custom subjects
    const validCustomSubjects = customSubjects.filter(s => s.content.trim() !== '').length;

    // Enterprise plan if user has more than 10 competitors
    if (validCompetitors > 10) {
      return 'enterprise';
    }
    
    // Professional plan if user has more competitors or many monitoring points
    if (validCompetitors > 1 || (selectedPoints + validCustomSubjects > 5)) {
      return 'professional';
    }
    
    // Default to starter plan
    return 'starter';
  };

  const recommendedPlan = determineRecommendedPlan();
  const isProfessional = recommendedPlan === 'professional';
  const isEnterprise = recommendedPlan === 'enterprise';

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
      
      // If enterprise plan, redirect to email instead of the contact form
      if (isEnterprise) {
        // Create a record for step 4 (enterprise interest) asynchronously without blocking transition
        createStepRecord(4).catch(error => {
          console.error('Error creating step record:', error);
        });
        
        // Redirect to email client
        window.location.href = "mailto:rayan.9896@gmail.com?subject=Spyer.app%20Enterprise%20Solution%20Inquiry&body=Hello,%0A%0AI'm%20interested%20in%20learning%20more%20about%20Spyer.app%20enterprise%20solutions%20for%20my%20company%20" + encodeURIComponent(onboardingData.companyName) + ".%0A%0APlease%20contact%20me%20at%20" + encodeURIComponent(onboardingData.email) + "%20to%20discuss%20our%20specific%20requirements.%0A%0AThank%20you.";
        return;
      }
      
      const apiKey = "am_pk_test_2x3ldHrgmNweqkG68YcMXcBggZb";
      const customerId = generateRandomCustomerId();

      // Use the correct product_id based on the recommended plan
      const productId = isProfessional ? "professional" : "starter";

      const apiResponse = await fetch('https://api.useautumn.com/v1/attach', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          customer_id: customerId,
          force_checkout: true,
          metadata: {
            customerName: onboardingData.companyName,
            customerEmail: onboardingData.email,
            recommendedPlan: recommendedPlan
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

  const validCompetitors = onboardingData.competitors.filter(c => c.name.trim() !== '').length;

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
          We've selected the best plan for your needs based on your answers.
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
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/80 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-800">Recommended Plan:</h2>
            {isProfessional && !isEnterprise && (
              <div className="bg-brand-lightBlue text-brand-blue text-xs font-medium px-2 py-0.5 rounded-full">
                Most Popular
              </div>
            )}
            {isEnterprise && (
              <div className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
                Custom Solution
              </div>
            )}
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {isEnterprise ? "Enterprise Plan" : isProfessional ? "Professional Plan" : "Starter Plan"}
                </h3>
                <span className="text-lg font-semibold text-gray-900">
                  {isEnterprise ? "Custom" : isProfessional ? "$99" : "$39"}
                  {!isEnterprise && <span className="text-sm font-normal text-gray-600">/month</span>}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {isEnterprise 
                  ? "For organizations with advanced needs" 
                  : isProfessional 
                    ? "Ideal for monitoring multiple competitors in detail" 
                    : "Monitor a single company in detail"}
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Includes:</h4>
              <ul className="space-y-3">
                {/* Enterprise Plan Features */}
                {isEnterprise && (
                  <>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Unlimited competitors</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">All monitoring points</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom reporting frequency</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Team access</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Dedicated account manager</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom integrations</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Private data sources</span>
                    </motion.li>
                  </>
                )}

                {/* Professional Plan Features */}
                {isProfessional && !isEnterprise && (
                  <>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Monitoring of up to 10 competitors</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">All monitoring points</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Daily email reports</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Advanced dashboard</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom alerts</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">API access</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Quarterly insights report</span>
                    </motion.li>
                  </>
                )}

                {/* Starter Plan Features */}
                {!isProfessional && !isEnterprise && (
                  <>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Monitoring of 1 competitor</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">7 monitoring points</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Weekly email reports</span>
                    </motion.li>
                    <motion.li variants={itemVariants} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Basic dashboard</span>
                    </motion.li>
                  </>
                )}
              </ul>
            </div>
            
            {!isEnterprise && (
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
            )}
            
            {isEnterprise && (
              <motion.div 
                variants={itemVariants}
                className="mt-4 pt-3 border-t border-gray-100"
              >
                <div className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                  Enterprise Advantage
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  Connect with our team to create a custom intelligence solution tailored to your organization's specific needs.
                </p>
              </motion.div>
            )}
            
            {!isEnterprise && (
              <motion.div
                variants={itemVariants} 
                className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">Total</span>
                <span className="text-xl font-semibold text-gray-900">
                  {isProfessional ? "$99" : "$39"}<span className="text-sm font-normal text-gray-600">/month</span>
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600"
        >
          {isEnterprise ? (
            <p>
              Our enterprise solutions are customized based on your specific needs. A dedicated account manager will work with you to develop a tailored package.
            </p>
          ) : (
            <>
              <p>
                Payment is processed securely via Stripe. Your subscription can be managed or canceled anytime by contacting support.
              </p>
              <p className="mt-1.5">
                Your first full report will be delivered on {getNextMonday()}.
              </p>
            </>
          )}
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
            className={`group px-4 py-2.5 ${
              isEnterprise ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-brand-blue hover:bg-brand-darkBlue'
            } text-white rounded-full text-sm shadow-sm transition-all duration-200`}
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
                {isEnterprise ? (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Contact Sales</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Subscribe - {isProfessional ? "$99/month" : "$39/month"}</span>
                  </>
                )}
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StepFour;
