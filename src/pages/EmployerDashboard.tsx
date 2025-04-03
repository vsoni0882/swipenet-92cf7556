
import React, { useState, useEffect } from 'react';
import SwipeInterface from '@/components/SwipeInterface';
import CandidateCard from '@/components/CandidateCard';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';
import { mockCandidates, Candidate } from '@/data/mockData';

const EmployerDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [rejectedCandidates, setRejectedCandidates] = useState<Candidate[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch candidates that match the job requirement
    setCandidates([...mockCandidates]);
  }, []);

  const handleSwipeLeft = () => {
    if (currentIndex < candidates.length) {
      // Reject candidate
      setRejectedCandidates([...rejectedCandidates, candidates[currentIndex]]);
      toast('Candidate passed', {
        description: `You passed on ${candidates[currentIndex].name}`,
        icon: <X className="h-4 w-4 text-swapnet-red" />,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < candidates.length) {
      // Select candidate
      setSelectedCandidates([...selectedCandidates, candidates[currentIndex]]);
      toast('Candidate selected!', {
        description: `You selected ${candidates[currentIndex].name} for the next step`,
        icon: <Check className="h-4 w-4 text-swapnet-green" />,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentCandidate = candidates[currentIndex];
  const isCandidatesEmpty = currentIndex >= candidates.length;

  return (
    <div className="min-h-screen flex flex-col bg-swapnet-gray">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-swapnet-dark mb-1">Find Your Next Hire</h1>
          <p className="text-gray-600">Swipe through candidates that match your job requirements</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SwipeInterface
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              emptyMessage="No more candidates to show. Check back soon for new talent!"
              isEmpty={isCandidatesEmpty}
            >
              {!isCandidatesEmpty && <CandidateCard candidate={currentCandidate} />}
            </SwipeInterface>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Your Selections</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-swapnet-green flex items-center mb-2">
                <Check className="h-4 w-4 mr-1" /> 
                Selected ({selectedCandidates.length})
              </h3>
              
              {selectedCandidates.length === 0 ? (
                <p className="text-sm text-gray-500">No candidates selected yet. Start swiping!</p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {selectedCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-gray-50 p-3 rounded-md flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-gray-600">{candidate.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-swapnet-red flex items-center mb-2">
                <X className="h-4 w-4 mr-1" /> 
                Passed ({rejectedCandidates.length})
              </h3>
              
              {rejectedCandidates.length === 0 ? (
                <p className="text-sm text-gray-500">No passed candidates yet.</p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {rejectedCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-gray-50 p-3 rounded-md flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-gray-600">{candidate.title}</div>
                      </div>
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

export default EmployerDashboard;
