
import { CheckCircle } from "lucide-react";

const monitoringPoints = [
  {
    title: "Website and App Changes",
    description: "Track new features, pricing changes, and UX updates as they happen.",
    icon: "🖥️"
  },
  {
    title: "LinkedIn Company Page Activity",
    description: "Monitor content strategy and follower growth patterns.",
    icon: "👥"
  },
  {
    title: "Employee Profile Updates",
    description: "Get alerts on job changes and new hires in specific roles.",
    icon: "👤"
  },
  {
    title: "Marketing Email Campaigns",
    description: "Analyze competitor messaging and promotional strategies.",
    icon: "📧"
  },
  {
    title: "Social Media Activity",
    description: "Track posts and engagement across major platforms.",
    icon: "📱"
  },
  {
    title: "Glassdoor Reviews",
    description: "Monitor sentiment and identify emerging themes.",
    icon: "⭐"
  },
  {
    title: "GitHub Contributions",
    description: "Track public repository activity and development focus.",
    icon: "💻"
  },
  {
    title: "Employee Changes",
    description: "Stay updated on publicly announced hires and departures.",
    icon: "🔄"
  },
  {
    title: "PR & News Mentions",
    description: "Capture media coverage and press release activity.",
    icon: "📰"
  },
  {
    title: "Reddit & Forum Discussions",
    description: "Monitor public sentiment and community feedback.",
    icon: "💬"
  },
  {
    title: "Blindapp Discussions",
    description: "Access aggregated, anonymized public mentions.",
    icon: "🕵️"
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Monitoring Points
          </h2>
          <p className="text-xl text-gray-600">
            Our platform tracks every important signal about a company, providing you with real-time insights across multiple channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitoringPoints.map((point, index) => (
            <div key={index} className="feature-card">
              <div className="mb-4 text-2xl">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
