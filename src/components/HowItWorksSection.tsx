import { ArrowRight } from "lucide-react";
const steps = [{
  number: "01",
  title: "Select Companies to Track",
  description: "Identify the companies you want to monitor - competitors, investments, or market leaders."
}, {
  number: "02",
  title: "Choose Monitoring Points",
  description: "Select which data points are most relevant to your needs from our comprehensive tracking options."
}, {
  number: "03",
  title: "Receive Intelligent Alerts",
  description: "Get notified of important changes and updates through customizable alerts."
}, {
  number: "04",
  title: "Access Detailed Insights",
  description: "Dive deeper into the data with our powerful analytics dashboard and reporting tools."
}];
const HowItWorksSection = () => {
  return <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container max-w-[1100px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How Spyer Works</h2>
          <p className="text-xl text-gray-600">
            Our streamlined process makes it easy to start tracking companies and gaining valuable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-brand-blue mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              {index < steps.length - 1 && <div className="hidden lg:block text-right">
                  <ArrowRight className="ml-auto text-brand-blue" />
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;