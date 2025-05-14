
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type PlanFeaturesProps = {
  planType: 'starter' | 'professional' | 'enterprise';
  itemVariants: any;
};

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ planType, itemVariants }) => {
  // Features for each plan type
  const features = {
    starter: [
      'Monitoring of 1 competitor',
      '7 monitoring points',
      'Weekly email reports',
      'Basic dashboard'
    ],
    professional: [
      'Monitoring of up to 10 competitors',
      'All monitoring points',
      'Daily email reports',
      'Advanced dashboard',
      'Custom alerts',
      'API access',
      'Quarterly insights report'
    ],
    enterprise: [
      'Unlimited competitors',
      'All monitoring points',
      'Custom reporting frequency',
      'Team access',
      'Dedicated account manager',
      'Custom integrations',
      'Private data sources'
    ]
  };

  return (
    <ul className="space-y-3">
      {features[planType].map((feature, index) => (
        <motion.li key={index} variants={itemVariants} className="flex items-start">
          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700">{feature}</span>
        </motion.li>
      ))}
    </ul>
  );
};

export default PlanFeatures;
