
import { supabase } from "@/integrations/supabase/client";
import { OnboardingData } from "./types";

// Create a new record for the current step in Supabase
export const createStepRecord = async (
  step: number, 
  onboardingData: OnboardingData,
  setSubmissionId: (id: string | null) => void
) => {
  try {
    // First, check if we already have a submission ID stored
    let submissionId = null;
    
    // Check if this browser has a stored submission ID in localStorage
    const storedId = localStorage.getItem('onboarding_submission_id');
    if (storedId) {
      submissionId = storedId;
      
      // Update the existing record
      const { error } = await supabase
        .from('onboarding_submissions')
        .update({
          user_email: onboardingData.email,
          company_name: onboardingData.companyName,
          current_step: step,
          competitors: onboardingData.competitors,
          monitoring_points: onboardingData.monitoringPoints,
          custom_subjects: onboardingData.customSubjects,
          interested_in_premium: onboardingData.interestedInPremium,
          completed: step === 5,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId);
      
      if (error) {
        console.error('Error updating submission:', error);
        return;
      }
    } else {
      // Create a new record
      const { data, error } = await supabase
        .from('onboarding_submissions')
        .insert({
          user_email: onboardingData.email,
          company_name: onboardingData.companyName,
          current_step: step,
          competitors: onboardingData.competitors,
          monitoring_points: onboardingData.monitoringPoints,
          custom_subjects: onboardingData.customSubjects,
          interested_in_premium: onboardingData.interestedInPremium,
          completed: step === 5
        })
        .select('id');
      
      if (error) {
        console.error('Error creating submission:', error);
        return;
      }
      
      // Store the submission ID and set it in state
      if (data && data.length > 0) {
        submissionId = data[0].id;
        localStorage.setItem('onboarding_submission_id', submissionId);
        setSubmissionId(submissionId);
      }
    }
  } catch (error) {
    console.error('Error creating step record:', error);
  }
};
