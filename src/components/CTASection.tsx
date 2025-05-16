import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-[1100px] mx-auto">
        <div className="bg-gray-900 rounded-2xl text-white p-8 md:p-12 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Image side */}
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 z-10 rounded-lg"></div>
                <img 
                  src="/picasso.jpg" 
                  alt="Older Pablo Picasso" 
                  className="rounded-lg shadow-2xl max-h-[400px] object-cover"
                />
              </div>
            </div>
            
            {/* Content side */}
            <div className="order-1 md:order-2 flex flex-col">
              <div className="mb-8">
                <svg className="h-12 w-12 text-indigo-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl md:text-3xl font-light italic mb-4 text-indigo-100">
                  Good artists copy, great artists steal.
                </p>
                <p className="text-lg text-indigo-300 font-medium">
                  — Pablo Picasso
                </p>
              </div>
              
              <div className="mt-auto">
                <p className="text-xl mb-6 text-gray-300">
                  Don't just observe your competitors, learn from them. Your competitive edge starts here.
                </p>
                <Button 
                  size="lg" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 rounded-full group transition-all w-full md:w-auto"
                  asChild
                >
                  <Link to="/onboarding">
                    Copy Your Competitors
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;