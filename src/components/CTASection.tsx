
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="bg-brand-blue rounded-2xl text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Monitoring Companies Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of business leaders who use Spyer.app to stay ahead of market changes, track competitors, and make data-driven decisions.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-6 rounded-full group transition-all" asChild>
                <Link to="/onboarding">
                  Get Reports Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
