
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
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-lightBlue to-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              Monitor Every Aspect of <span className="gradient-text">Any Company</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600"
              variants={itemVariants}
            >
              Track website changes, social media activity, employee updates, and more - all in one platform. Perfect for VCs, founders, and competitive intelligence.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button size="lg" className="bg-brand-blue hover:bg-brand-darkBlue text-lg px-6 rounded-full group transition-all" asChild>
                <Link to="/onboarding">
                  Get Reports Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="pt-4 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              Already tracking over 10,000+ companies for industry leaders
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative animate-float"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="text-2xl font-bold mb-6">Standard Monitoring Points</div>
              <div className="space-y-5">
                {[
                  { name: 'Website and App Changes', desc: 'New features, pricing, UX updates', active: false },
                  { name: 'LinkedIn Company Page Activity', desc: 'Content, follower growth', active: true },
                  { name: 'Key LinkedIn Employee Profile Updates', desc: 'Public job changes, new hires in specific roles', active: false },
                  { name: 'Company-Sent Marketing Emails', desc: 'Requires a method for you to share examples with us', active: false },
                  { name: 'Social Media Activity', desc: 'Official channels: e.g., Twitter, Facebook', active: false },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      item.active 
                        ? 'bg-brand-blue border-brand-blue' 
                        : 'border-gray-300'
                    }`}>
                      {item.active && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
