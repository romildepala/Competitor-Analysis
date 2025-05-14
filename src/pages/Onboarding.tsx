
import React from 'react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import { motion } from 'framer-motion';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white py-5 px-6 border-b border-gray-100/70">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-medium text-gray-900"
          >
            CompIntel Pro
          </motion.div>
        </div>
      </header>
      
      <main className="min-h-[calc(100vh-142px)]">
        <OnboardingForm />
      </main>
      
      <footer className="bg-white py-5 px-6 border-t border-gray-100/70">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CompIntel Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
