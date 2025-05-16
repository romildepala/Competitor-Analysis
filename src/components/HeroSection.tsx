import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
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

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
      <div className="container max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              The world's first <span className="gradient-text">AI spy</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              variants={itemVariants}
            >
              Track competitors 24/7. Instantly detect website changes, social media activity, employee updates, and more. Stay ahead and save hours per week.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start items-center"
              variants={itemVariants}
            >
              <Button size="lg" className="bg-brand-blue hover:bg-brand-darkBlue text-lg px-6 rounded-full group transition-all" asChild>
                <Link to="/onboarding">
                  Hire AI Spy ($99)
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex items-center gap-1 ml-0 sm:ml-4 mt-2 sm:mt-0">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#444" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
                <span className="text-xl font-medium text-gray-600 ml-2">5.0</span>
              </div>
            </motion.div>
            <motion.div 
              className="pt-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              Already tracking over 10,000+ companies for industry leaders
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative max-w-[500px] mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-xl">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full rounded-lg"
              >
                <source src="/spyer-report-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-blue rounded-full opacity-20 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-20 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
