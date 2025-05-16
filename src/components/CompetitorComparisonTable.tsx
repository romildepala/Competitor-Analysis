import React from "react";

// Custom tick and cross components with reduced padding
const CustomTick = () => (
  <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const CustomCross = () => (
  <div className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 border border-red-500 flex items-center justify-center">
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Add pricing information to the comparison data
const comparisonData = {
  features: [
    { name: "Is Instantaneous", description: "Analysis takes minutes, not days" },
    { name: "Includes All Data Sources", description: "Combines data from multiple platforms" },
    { name: "Provides Qualitative Insights", description: "Goes beyond numbers with context" },
    { name: "Offers Real-Time Notifications", description: "Get alerts as soon as changes happen" },
    { name: "Pricing", description: "Monthly subscription cost" },
  ],
  competitors: [
    {
      name: "Our Tool",
      logo: "https://via.placeholder.com/80x40/0080ff/FFFFFF/?text=OurTool",
      values: {
        "Is Instantaneous": { value: true },
        "Includes All Data Sources": { value: true },
        "Provides Qualitative Insights": { value: true },
        "Offers Real-Time Notifications": { value: true },
        "Pricing": { value: true, label: "$49/mo" },
      },
      highlighted: true,
    },
    {
      name: "Similar Web",
      logo: "https://via.placeholder.com/80x40/FF5733/FFFFFF/?text=SimilarWeb",
      values: {
        "Is Instantaneous": { value: false },
        "Includes All Data Sources": { value: false },
        "Provides Qualitative Insights": { value: false },
        "Offers Real-Time Notifications": { value: false },
        "Pricing": { value: false, label: "$199/mo" },
      },
    },
    {
      name: "Crayon",
      logo: "https://via.placeholder.com/80x40/33FF57/000000/?text=Crayon",
      values: {
        "Is Instantaneous": { value: false },
        "Includes All Data Sources": { value: false },
        "Provides Qualitative Insights": { value: true },
        "Offers Real-Time Notifications": { value: true },
        "Pricing": { value: false, label: "$99/mo" },
      },
    },
    {
      name: "SEMrush/HRFs",
      logo: "https://via.placeholder.com/80x40/5733FF/FFFFFF/?text=SEMrush",
      values: {
        "Is Instantaneous": { value: false },
        "Includes All Data Sources": { value: false },
        "Provides Qualitative Insights": { value: false },
        "Offers Real-Time Notifications": { value: false },
        "Pricing": { value: false, label: "$119.95/mo" },
      },
    },
    {
      name: "Manual Analysis",
      logo: "https://via.placeholder.com/80x40/808080/FFFFFF/?text=Manual",
      values: {
        "Is Instantaneous": { value: false },
        "Includes All Data Sources": { value: true },
        "Provides Qualitative Insights": { value: true },
        "Offers Real-Time Notifications": { value: false },
        "Pricing": { value: false, label: "$1,000+/mo" },
      },
    },
  ],
};

const CompetitorComparisonTable = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Competitor analysis, analysis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Multiple Products in One - No One Else Can Do Similar Web Sam Rush LinkedIn Sales Nav And Your Intern
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="p-6 text-left"></th>
                {comparisonData.competitors.map((competitor, index) => (
                  <th 
                    key={index} 
                    className={`p-4 text-center ${
                      competitor.highlighted
                        ? 'bg-brand-lightBlue dark:bg-blue-900/30'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <img 
                        src={competitor.logo} 
                        alt={competitor.name}
                        className="h-12 object-contain"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.features.map((feature, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-5">
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</div>
                  </td>
                  {comparisonData.competitors.map((competitor, colIndex) => {
                    const featureData = competitor.values[feature.name];
                    return (
                      <td 
                        key={colIndex} 
                        className={`p-4 text-center ${
                          competitor.highlighted
                            ? 'bg-brand-lightBlue/5 dark:bg-blue-900/10'
                            : ''
                        }`}
                      >
                        {feature.name === "Pricing" ? (
                          <div className="text-base font-semibold">
                            {featureData.label}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            {featureData.value ? <CustomTick /> : <CustomCross />}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparisonTable; 