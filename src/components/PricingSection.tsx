import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for monitoring multiple companies",
    features: [
      "10 companies",
      "All monitoring points",
      "Daily email reports",
      "Advanced dashboard",
      "Custom alerts",
      "API access",
      "Quarterly insights report"
    ],
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container max-w-[1100px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that fits your company monitoring needs
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 justify-items-center">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={'rounded-xl p-8 border border-brand-blue shadow-lg shadow-blue-100 dark:shadow-none dark:border-brand-blue/50 dark:bg-gray-800/30 md:max-w-md'}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-gray-500 dark:text-gray-400">/month</span>}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={"default"}
                className={'w-full rounded-full group transition-all bg-brand-blue hover:bg-brand-darkBlue'}
                asChild
              >
                {plan.price === "Custom" ? (
                  <a href="mailto:rayan.9896@gmail.com?subject=Spyer.app%20Enterprise%20Inquiry&body=I'm%20interested%20in%20learning%20more%20about%20Spyer.app%20enterprise%20solutions.">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Sales
                  </a>
                ) : (
                  <Link to="/onboarding">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
