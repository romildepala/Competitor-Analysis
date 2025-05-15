
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
    
    // Prepare the data object with all the fields we need to update
    const dataToUpdate = {
      user_email: onboardingData.email,
      company_name: onboardingData.companyName,
      current_step: step,
      competitors: onboardingData.competitors,
      monitoring_points: onboardingData.monitoringPoints,
      custom_subjects: onboardingData.customSubjects,
      interested_in_premium: onboardingData.interestedInPremium,
      completed: step === 5,
      updated_at: new Date().toISOString()
    };
    
    console.log("Saving onboarding data to Supabase:", { step, submissionId: storedId, data: dataToUpdate });
    
    if (storedId) {
      submissionId = storedId;
      
      // Update the existing record
      const { data, error } = await supabase
        .from('onboarding_submissions')
        .update(dataToUpdate)
        .eq('id', submissionId);
      
      if (error) {
        console.error('Error updating submission:', error);
        return;
      }
      
      console.log("Successfully updated submission record:", data);
    } else {
      // Create a new record
      const { data, error } = await supabase
        .from('onboarding_submissions')
        .insert(dataToUpdate)
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
        console.log("Successfully created new submission record:", data[0]);
      }
    }
    
    return submissionId;
  } catch (error) {
    console.error('Error creating step record:', error);
    return null;
  }
};
