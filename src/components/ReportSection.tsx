import React from 'react';
import { motion } from "framer-motion";

interface ReportSectionItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ReportSectionProps {
  alternateLayout?: boolean;
  title?: string;
  subtitle?: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  alternateLayout = false,
  title = "Example Report Sections",
  subtitle,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const reportItems: ReportSectionItem[] = [
    {
      title: "Executive Summary",
      description: "Get a bird's-eye view of your competitive landscape with clear, actionable insights.",
      imageSrc: "/screenshots/exec-summary.jpg",
      imageAlt: "Executive summary screenshot"
    },
    {
      title: "Website Comparison",
      description: "Compare website features, UX, and content strategy across competitors.",
      imageSrc: "/screenshots/website-comparison.jpg",
      imageAlt: "Website comparison screenshot"
    },
    {
      title: "LinkedIn Analysis",
      description: "Track competitor growth, content strategy, and employee activity on LinkedIn.",
      imageSrc: "/screenshots/linkedin-comparison.jpg",
      imageAlt: "LinkedIn comparison screenshot"
    },
    {
      title: "Search Performance",
      description: "See how your search visibility compares to competitors across key terms.",
      imageSrc: "/screenshots/search-comparison.jpg",
      imageAlt: "Search comparison screenshot"
    }
  ];

  return (
    <section className={`py-16 md:py-24 ${alternateLayout ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <motion.div 
          className="space-y-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reportItems.map((item, index) => (
            <motion.div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              variants={itemVariants}
            >
              <div className="w-full md:w-3/5">
                <img 
                  src={item.imageSrc} 
                  alt={item.imageAlt} 
                  className="w-full h-auto rounded-xl shadow-lg border border-gray-100"
                />
              </div>
              <div className="w-full md:w-2/5 space-y-5 md:px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-lg text-gray-700 max-w-md leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReportSection; 