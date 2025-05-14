
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-lightBlue to-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Monitor Every Aspect of <span className="gradient-text">Any Company</span>
            </h1>
            <p className="text-xl text-gray-600">
              Track website changes, social media activity, employee updates, and more - all in one platform. Perfect for VCs, founders, and competitive intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-darkBlue text-lg px-6 rounded-full group transition-all" asChild>
                <Link to="/onboarding">
                  Get Reports Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="pt-4 text-sm text-muted-foreground">
              Already tracking over 10,000+ companies for industry leaders
            </div>
          </div>

          <div className="relative animate-float">
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
                  <div key={index} className="flex items-start gap-3">
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
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-blue rounded-full opacity-20 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
