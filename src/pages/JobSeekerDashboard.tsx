import React, { useState, useEffect } from 'react';
import SwipeInterface from '@/components/SwipeInterface';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import { Check, X } from 'lucide-react';
import { mockJobs, Job } from '@/data/mockData';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

const JobSeekerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [rejectedJobs, setRejectedJobs] = useState<Job[]>([]);
  
  const { user } = useAuthStore();
  const userHasCV = user?.hasCV || false;
  
  useEffect(() => {
    // In a real app, we would fetch personalized job recommendations here
    setJobs([...mockJobs]);
  }, []);

  const handleSwipeLeft = () => {
    if (currentIndex < jobs.length) {
      // Reject job
      setRejectedJobs([...rejectedJobs, jobs[currentIndex]]);
      toast('Job rejected', {
        description: `You passed on ${jobs[currentIndex].title} at ${jobs[currentIndex].company}`,
        icon: <X className="h-4 w-4 text-swapnet-red" />,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < jobs.length) {
      // Before applying, check if user has CV
      if (!userHasCV) {
        toast('CV required', {
          description: 'Please upload your CV in your profile before applying',
          icon: <X className="h-4 w-4 text-swapnet-red" />,
        });
        return;
      }
      
      // Apply to job
      setAppliedJobs([...appliedJobs, jobs[currentIndex]]);
      toast('Application sent!', {
        description: `You applied to ${jobs[currentIndex].title} at ${jobs[currentIndex].company}`,
        icon: <Check className="h-4 w-4 text-swapnet-green" />,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentJob = jobs[currentIndex];
  const isJobsEmpty = currentIndex >= jobs.length;

  return (
    <div className="min-h-screen flex flex-col bg-swapnet-gray">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-swapnet-dark mb-1">Find Your Next Role</h1>
          <p className="text-gray-600">Swipe through jobs that match your skills and experience</p>
          {!userHasCV && (
            <div className="mt-2 p-3 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
              Please upload your CV in your profile to apply for jobs. <a href="/employee-profile" className="underline font-medium">Go to Profile</a>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SwipeInterface
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              emptyMessage="No more jobs to show. Check back soon for new opportunities!"
              isEmpty={isJobsEmpty}
            >
              {!isJobsEmpty && <JobCard job={currentJob} />}
            </SwipeInterface>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Your Activity</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-swapnet-green flex items-center mb-2">
                <Check className="h-4 w-4 mr-1" /> 
                Applications ({appliedJobs.length})
              </h3>
              
              {appliedJobs.length === 0 ? (
                <p className="text-sm text-gray-500">No applications yet. Start swiping!</p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {appliedJobs.map((job) => (
                    <div key={job.id} className="bg-gray-50 p-3 rounded-md">
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.company}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-swapnet-red flex items-center mb-2">
                <X className="h-4 w-4 mr-1" /> 
                Passed ({rejectedJobs.length})
              </h3>
              
              {rejectedJobs.length === 0 ? (
                <p className="text-sm text-gray-500">No passed jobs yet.</p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {rejectedJobs.map((job) => (
                    <div key={job.id} className="bg-gray-50 p-3 rounded-md">
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.company}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;
