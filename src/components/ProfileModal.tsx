
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Job, Candidate } from '@/data/mockData';
import JobCard from './JobCard';
import CandidateCard from './CandidateCard';

interface ProfileModalProps {
  type: 'job' | 'candidate';
  data: Job | Candidate;
  trigger: React.ReactNode;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ type, data, trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === 'job' ? (data as Job).title : (data as Candidate).name}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          {type === 'job' ? (
            <JobCard job={data as Job} />
          ) : (
            <CandidateCard candidate={data as Candidate} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
