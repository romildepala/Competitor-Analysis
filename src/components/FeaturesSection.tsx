import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const monitoringPoints = [
  {
    title: "Website and App Changes",
    description: "Track new features, pricing changes, and UX updates as they happen.",
    icon: "🖥️"
  },
  {
    title: "LinkedIn Company Page Activity",
    description: "Monitor content strategy and follower growth patterns.",
    icon: <svg className="h-6 w-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  },
  {
    title: "Employee Profile Updates",
    description: "Get alerts on job changes and new hires in specific roles.",
    icon: <svg className="h-6 w-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  },
  {
    title: "Marketing Email Campaigns",
    description: "Analyze competitor messaging and promotional strategies.",
    icon: "📧"
  },
  {
    title: "Social Media Activity",
    description: "Track posts and engagement across major platforms.",
    icon: <svg className="h-6 w-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  },
  {
    title: "Glassdoor Reviews",
    description: "Monitor sentiment and identify emerging themes.",
    icon: <svg className="h-6 w-6 text-[#0CAA41]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" />
      <path d="M14.5 16.2H7.7c0 .94.76 1.7 1.7 1.7h5.1c.94 0 1.7-.76 1.7-1.7V9.2c0-.03-.03-.06-.06-.06h-1.58c-.03 0-.06.03-.06.06v7h.2zm0-10.2c.94 0 1.7.76 1.7 1.7H9.4v7c0 .03-.03.06-.06.06H7.76c-.03 0-.06-.03-.06-.06V7.7c0-.94.76-1.7 1.7-1.7h5.1z" fill="#FFF" />
    </svg>
  },
  {
    title: "GitHub Contributions",
    description: "Track public repository activity and development focus.",
    icon: <svg className="h-6 w-6 text-[#181717]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  },
  {
    title: "Employee Changes",
    description: "Stay updated on publicly announced hires and departures.",
    icon: <svg className="h-6 w-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  },
  {
    title: "PR & News Mentions",
    description: "Capture media coverage and press release activity.",
    icon: <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0C9D58" />
      <text x="4.5" y="17" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white">TC</text>
    </svg>
  },
  {
    title: "Reddit & Forum Discussions",
    description: "Monitor public sentiment and community feedback.",
    icon: <svg className="h-6 w-6 text-[#FF4500]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  },
  {
    title: "Blindapp Discussions",
    description: "Access aggregated, anonymized public mentions.",
    icon: <svg className="h-6 w-6 text-[#020810]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.31 15.75C15.31 16.54 14.67 17.18 13.88 17.18H10.13C9.34 17.18 8.7 16.53 8.7 15.75V12.61C8.7 11.82 9.34 11.18 10.13 11.18H13.88C14.67 11.18 15.31 11.83 15.31 12.61V15.75ZM10.63 13.81C10.05 13.81 9.58 14.28 9.58 14.86C9.58 15.44 10.05 15.91 10.63 15.91C11.21 15.91 11.68 15.44 11.68 14.86C11.68 14.28 11.21 13.81 10.63 13.81ZM13.78 7.51C13.78 7.15 13.49 6.86 13.13 6.86H10.87C10.51 6.86 10.22 7.15 10.22 7.51V9.77C10.22 10.13 10.51 10.42 10.87 10.42H13.13C13.49 10.42 13.78 10.13 13.78 9.77V7.51Z"/>
    </svg>
  }
];

const FeaturesSection = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-[1100px] mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Monitoring Points
          </h2>
          <p className="text-xl text-gray-600">
            Our platform tracks every important signal about a company, providing you with real-time insights across multiple channels.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {monitoringPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="feature-card bg-brand-blue p-6 rounded-xl shadow-sm border border-brand-blue text-gray-900"
              variants={itemVariants}
            >
              <div className="mb-4 text-2xl">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{point.title}</h3>
              <p className="text-gray-700">{point.description}</p>
            </motion.div>
          ))}
          
          {/* Separate "Monitor pretty much anything" button */}
          <motion.div 
            className="feature-card !bg-brand-blue p-6 rounded-xl shadow-md border border-brand-blue text-white cursor-pointer hover:bg-brand-darkBlue transition-colors duration-300 transform hover:scale-105"
            variants={itemVariants}
            onClick={handleStartOnboarding}
          >
            <div className="mb-4 text-2xl">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Monitor pretty much anything</h3>
            <p className="text-blue-100">Flexible enough to track custom data sources based on your needs.</p>
            <div className="mt-4 inline-flex items-center text-white font-medium">
              <span>Get started</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
