import React from 'react';

interface ReportSectionItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface ReportSectionProps {
  alternateLayout?: boolean;
  title?: string;
  subtitle?: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  alternateLayout = false,
  title = "Example Report Sections",
  subtitle,
}) => {
  const sections: ReportSectionItem[] = [
    {
      title: "Executive Summary",
      description: "Get a quick overview of your competitors' key metrics and performance indicators.",
      imageSrc: "/screenshots/exec-summary.jpg",
      imageAlt: "Executive Summary Dashboard"
    },
    {
      title: "LinkedIn Analysis",
      description: "Compare your LinkedIn presence with competitors and identify growth opportunities.",
      imageSrc: "/screenshots/linkedin-comparison.jpg",
      imageAlt: "LinkedIn Comparison Analysis"
    },
    {
      title: "Search Performance",
      description: "Analyze search rankings and visibility across major search engines.",
      imageSrc: "/screenshots/search-comparison.jpg",
      imageAlt: "Search Performance Analysis"
    },
    {
      title: "Website Comparison",
      description: "Compare website metrics, traffic, and engagement with your competitors.",
      imageSrc: "/screenshots/website-comparison.jpg",
      imageAlt: "Website Comparison Analysis"
    }
  ];

  // Render as a simple list (similar to original ReportSections)
  if (!alternateLayout) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              {subtitle}
            </p>
          )}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={index} className="mb-16 max-w-4xl mx-auto border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{section.title}</h3>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${section.imageSrc}`);
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="p-6">
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render with alternate layout (similar to ReportSectionsIndex)
  return (
    <section id="report-examples" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-20">
            {subtitle}
          </p>
        )}
        
        <div className="space-y-32">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-12 max-w-6xl mx-auto`}
            >
              {/* Image Section */}
              <div className="w-full md:w-3/5 transform transition-transform duration-500 hover:scale-[1.02]">
                <div className={`
                  bg-white rounded-xl shadow-xl overflow-hidden
                  ${index % 2 !== 0 ? 'md:ml-6' : 'md:mr-6'}
                  border-t-4 ${['border-blue-500', 'border-purple-500', 'border-green-500', 'border-orange-500'][index % 4]}
                `}>
                  <img
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${section.imageSrc}`);
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
              
              {/* Text Section */}
              <div className="w-full md:w-2/5 p-4">
                <div className={`w-20 h-1 mb-6 ${['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500'][index % 4]}`}></div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{section.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportSection; 