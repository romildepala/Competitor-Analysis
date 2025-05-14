
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const plans = [
  {
    name: "Starter",
    price: "$39",
    description: "Monitor a single company in detail",
    features: [
      "1 company",
      "7 monitoring points",
      "Weekly email reports",
      "Basic dashboard",
      "Email alerts"
    ],
    chartData: [
      { name: "Website Changes", value: 30 },
      { name: "LinkedIn Activity", value: 25 },
      { name: "Social Media", value: 25 },
      { name: "Employee Updates", value: 20 },
    ],
    chartColors: ['#0057FF', '#33C3F0', '#7E69AB', '#D6BCFA']
  },
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
    highlighted: true,
    chartData: [
      { month: 'Jan', company1: 400, company2: 240, company3: 320 },
      { month: 'Feb', company1: 300, company2: 398, company3: 280 },
      { month: 'Mar', company1: 200, company2: 300, company3: 250 },
      { month: 'Apr', company1: 278, company2: 308, company3: 220 },
      { month: 'May', company1: 189, company2: 350, company3: 310 }
    ],
    chartLines: [
      { dataKey: 'company1', stroke: '#0057FF' },
      { dataKey: 'company2', stroke: '#33C3F0' },
      { dataKey: 'company3', stroke: '#7E69AB' }
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs",
    features: [
      "Unlimited companies",
      "All monitoring points",
      "Custom reporting frequency",
      "Team access",
      "Dedicated account manager",
      "Custom integrations",
      "Private data sources"
    ],
    chartData: [
      { category: 'Website', primary: 120, secondary: 80, tertiary: 40 },
      { category: 'Social', primary: 90, secondary: 60, tertiary: 30 },
      { category: 'LinkedIn', primary: 100, secondary: 70, tertiary: 50 },
      { category: 'Email', primary: 80, secondary: 50, tertiary: 30 },
      { category: 'Press', primary: 110, secondary: 75, tertiary: 45 }
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your company monitoring needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 border ${
                plan.highlighted 
                  ? 'border-brand-blue shadow-lg shadow-blue-100' 
                  : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-brand-lightBlue text-brand-blue text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              {/* Visualization for each plan */}
              <div className="h-48 w-full mb-6">
                {index === 0 && (
                  <ChartContainer config={{ chartColors: { theme: { light: '#0057FF' } } }}>
                    <PieChart>
                      <Pie
                        data={plan.chartData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {plan.chartData.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={plan.chartColors[i % plan.chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
                    </PieChart>
                  </ChartContainer>
                )}
                
                {index === 1 && (
                  <ChartContainer config={{ chartColors: { theme: { light: '#0057FF' } } }}>
                    <LineChart
                      data={plan.chartData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {plan.chartLines.map((line, i) => (
                        <Line 
                          key={i}
                          type="monotone"
                          dataKey={line.dataKey}
                          stroke={line.stroke}
                          activeDot={{ r: 8 }}
                        />
                      ))}
                    </LineChart>
                  </ChartContainer>
                )}
                
                {index === 2 && (
                  <ChartContainer config={{ chartColors: { theme: { light: '#0057FF' } } }}>
                    <BarChart
                      data={plan.chartData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="primary" fill="#0057FF" />
                      <Bar dataKey="secondary" fill="#33C3F0" />
                      <Bar dataKey="tertiary" fill="#7E69AB" />
                    </BarChart>
                  </ChartContainer>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.highlighted ? "default" : "outline"} 
                className={`w-full ${plan.highlighted ? 'bg-brand-blue hover:bg-brand-darkBlue' : ''}`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
