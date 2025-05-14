
import React from 'react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white py-4 px-6 border-b border-gray-100/70">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-bold text-brand-blue"
          >
            <Link to="/">Spyer.app</Link>
          </motion.div>
        </div>
      </header>
      
      <main className="min-h-[calc(100vh-290px)]">
        <OnboardingForm />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Spyer.app. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
