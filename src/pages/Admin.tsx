
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Submission {
  id: string;
  user_email: string;
  company_name: string;
  current_step: number;
  competitors: any;
  monitoring_points: any;
  custom_subjects: any;
  interested_in_premium: boolean;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('onboarding_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setSubmissions(data as Submission[]);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepLabel = (step: number): string => {
    switch (step) {
      case 1: return 'Basic Information';
      case 2: return 'Competitors';
      case 3: return 'Monitoring Points';
      case 4: return 'Review & Payment';
      case 5: return 'Completed';
      default: return `Step ${step}`;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <header className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Onboarding Submissions</h1>
          <Button
            onClick={fetchSubmissions}
            variant="outline"
            className="text-sm"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">No submissions found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map(submission => (
              <div
                key={submission.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{submission.company_name || 'Unnamed Company'}</h2>
                    <p className="text-sm text-gray-600">{submission.user_email || 'No email provided'}</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      submission.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {submission.completed ? 'Completed' : `Stopped at ${getStepLabel(submission.current_step)}`}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Competitors</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {submission.competitors && submission.competitors.length > 0 ? (
                          submission.competitors
                            .filter((comp: any) => comp.name?.trim())
                            .map((comp: any) => (
                              <li key={comp.id}>{comp.name}</li>
                            ))
                        ) : (
                          <li className="text-gray-400">No competitors specified</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Monitoring Points</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {submission.monitoring_points && submission.monitoring_points.some((p: any) => p.selected) ? (
                          submission.monitoring_points
                            .filter((p: any) => p.selected)
                            .map((p: any) => (
                              <li key={p.id}>{p.name}</li>
                            ))
                        ) : (
                          <li className="text-gray-400">No monitoring points selected</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {submission.custom_subjects && submission.custom_subjects.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Monitoring Subjects</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {submission.custom_subjects
                          .filter((s: any) => s.content?.trim())
                          .map((s: any) => (
                            <li key={s.id}>{s.content}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <div>Created: {formatDate(submission.created_at)}</div>
                      <div>Last Updated: {formatDate(submission.updated_at)}</div>
                    </div>
                    <div>
                      {submission.interested_in_premium && (
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Interested in Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Admin;
