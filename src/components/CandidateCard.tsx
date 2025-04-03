
import React from 'react';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Candidate } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col">
      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3">
          <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-center">{candidate.name}</h2>
        <p className="text-swapnet-blue font-medium">{candidate.title}</p>
      </div>
      
      <div className="flex justify-center items-center gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <Briefcase className="h-4 w-4" />
          <span className="text-sm">{candidate.experience} years</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">About</h3>
        <p className="text-sm text-gray-700">{candidate.bio}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Education</h3>
        <div className="flex items-center gap-1.5 text-gray-700">
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm">{candidate.education}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        <Button className="bg-swapnet-blue hover:bg-swapnet-blue/90">
          Contact
        </Button>
        <Button variant="outline">
          View Resume
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
