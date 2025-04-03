
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Plus, Briefcase, DollarSign, MapPin, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface JobListingsProps {
  isEditing: boolean;
}

const JobListings: React.FC<JobListingsProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "New York, NY (Remote)",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      description: "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for developing and maintaining our web applications using React and TypeScript.",
      requirements: [
        "5+ years of experience with React",
        "Strong TypeScript skills",
        "Experience with state management libraries",
        "Experience with testing frameworks",
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with the design team",
        "Optimize applications for performance",
        "Write clean, maintainable code",
      ],
      status: "active",
      applications: 12,
      postedDate: "2 weeks ago"
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "San Francisco, CA",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      description: "We're seeking a Backend Developer to help build and maintain our APIs and services. You'll work with Node.js, Express, and MongoDB.",
      requirements: [
        "3+ years of experience with Node.js",
        "Experience with database design",
        "Knowledge of RESTful API design",
        "Familiarity with cloud services (AWS or GCP)",
      ],
      responsibilities: [
        "Design and develop APIs",
        "Optimize database queries",
        "Implement security best practices",
        "Collaborate with frontend developers",
      ],
      status: "active",
      applications: 8,
      postedDate: "3 days ago"
    },
  ]);
  
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    requirements: "",
    responsibilities: "",
  });
  
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  
  const toggleJobDetails = (id: number) => {
    setOpenJobId(openJobId === id ? null : id);
  };
  
  const addJob = () => {
    if (!newJob.title || !newJob.description) return;
    
    setJobs([
      ...jobs,
      {
        id: Date.now(),
        title: newJob.title,
        location: newJob.location,
        salary: newJob.salary,
        type: newJob.type,
        description: newJob.description,
        requirements: newJob.requirements.split("\n").filter(req => req.trim() !== ""),
        responsibilities: newJob.responsibilities.split("\n").filter(resp => resp.trim() !== ""),
        status: "active",
        applications: 0,
        postedDate: "Just now"
      }
    ]);
    
    setNewJob({
      title: "",
      location: "",
      salary: "",
      type: "Full-time",
      description: "",
      requirements: "",
      responsibilities: "",
    });
    
    setIsAddingJob(false);
  };
  
  const removeJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Job Listings</h2>
        
        {isEditing && !isAddingJob && (
          <Button onClick={() => setIsAddingJob(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Job
          </Button>
        )}
      </div>
      
      {isEditing && isAddingJob && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Post New Job</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  placeholder="e.g. New York, NY (Remote)"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salary Range</label>
                <Input
                  placeholder="e.g. $100,000 - $130,000"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <select 
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Description</label>
              <Textarea
                placeholder="Describe the job position"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Requirements (one per line)</label>
              <Textarea
                placeholder="e.g. 5+ years of experience with React"
                value={newJob.requirements}
                onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Responsibilities (one per line)</label>
              <Textarea
                placeholder="e.g. Develop and maintain web applications"
                value={newJob.responsibilities}
                onChange={(e) => setNewJob({...newJob, responsibilities: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingJob(false)}>Cancel</Button>
            <Button onClick={addJob}>Post Job</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <Collapsible 
            key={job.id} 
            open={openJobId === job.id}
            onOpenChange={() => toggleJobDetails(job.id)}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {job.salary}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-destructive" 
                        onClick={() => removeJob(job.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Posted {job.postedDate}
                  </div>
                  <div>{job.applications} applications</div>
                </div>
                
                <p className="text-sm">{job.description}</p>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    {openJobId === job.id ? "Hide Details" : "View Details"}
                  </Button>
                </CollapsibleTrigger>
                
                <Badge 
                  variant={job.status === 'active' ? 'default' : 'secondary'}
                >
                  {job.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </CardFooter>
              
              <CollapsibleContent>
                <div className="px-6 pb-6 pt-2 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Requirements</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Responsibilities</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
