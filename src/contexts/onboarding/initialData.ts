
import { MonitoringPoint, OnboardingData } from "./types";

// Initial monitoring points
export const initialMonitoringPoints: MonitoringPoint[] = [
  { id: 'website', name: 'Website and App Changes', description: 'New features, pricing, UX updates', selected: false },
  { id: 'linkedin', name: 'LinkedIn Company Page Activity', description: 'Content, follower growth', selected: false },
  { id: 'linkedin-employees', name: 'Key LinkedIn Employee Profile Updates', description: 'Public job changes, new hires in specific roles', selected: false },
  { id: 'marketing-emails', name: 'Company-Sent Marketing Emails', description: 'Requires a method for you to share examples with us', selected: false },
  { id: 'social-media', name: 'Social Media Activity', description: 'Official channels: e.g., Twitter, Facebook', selected: false },
  { id: 'glassdoor', name: 'Glassdoor Reviews', description: 'Sentiment, emerging themes', selected: false },
  { id: 'github', name: 'GitHub Contributions', description: 'Public repository activity', selected: false },
  { id: 'employees', name: 'Employee Changes', description: 'Publicly announced hires/departures', selected: false },
  { id: 'pr', name: 'PR Announcements & News Mentions', description: '', selected: false },
  { id: 'reddit', name: 'Reddit & Niche Forum Mentions', description: '', selected: false },
  { id: 'blindapp', name: 'Blindapp Discussions', description: 'Aggregated, anonymized public mentions', selected: false },
];

// Initial onboarding data
export const initialOnboardingData: OnboardingData = {
  email: '',
  companyName: '',
  competitors: [],
  monitoringPoints: initialMonitoringPoints,
  customSubjects: [],
  interestedInPremium: false,
};
