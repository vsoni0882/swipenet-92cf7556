
import React from 'react';
import { MapPin, Calendar, DollarSign, Building } from 'lucide-react';
import { Job } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <div className="flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.company}</span>
            </div>
          </div>
        </div>
        <span className="text-xs bg-blue-100 text-swapnet-blue px-2.5 py-1 rounded-full">
          {job.postedDate}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm">{job.salary}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-sm text-gray-700">{job.description}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Requirements</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        <Button className="bg-swapnet-blue hover:bg-swapnet-blue/90">
          Apply Now
        </Button>
        <Button variant="outline">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
