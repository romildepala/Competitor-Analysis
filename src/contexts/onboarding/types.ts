
// Types for our competitor
export type Competitor = {
  id: string;
  name: string;
};

// Types for monitoring points
export type MonitoringPoint = {
  id: string;
  name: string;
  description: string;
  selected: boolean;
};

// Types for custom subjects
export type CustomSubject = {
  id: string;
  content: string;
};

// Define the shape of our onboarding data
export interface OnboardingData {
  email: string;
  companyName: string;
  competitors: Competitor[];
  monitoringPoints: MonitoringPoint[];
  customSubjects: CustomSubject[];
  interestedInPremium: boolean;
}

// Context interface
export interface OnboardingContextType {
  currentStep: number;
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  setCurrentStep: (step: number) => void;
  addCompetitor: () => void;
  updateCompetitor: (id: string, name: string) => void;
  removeCompetitor: (id: string) => void;
  toggleMonitoringPoint: (id: string) => void;
  addCustomSubject: () => void;
  updateCustomSubject: (id: string, content: string) => void;
  removeCustomSubject: (id: string) => void;
  toggleInterestedInPremium: () => void;
  isStepValid: () => boolean;
  paymentSuccessful: boolean;
  setPaymentSuccessful: (success: boolean) => void;
  submissionId: string | null;
  createStepRecord: (step: number) => Promise<void>;
}
