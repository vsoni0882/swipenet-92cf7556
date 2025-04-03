
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Plus, Building, Calendar } from "lucide-react";

interface ExperienceSectionProps {
  isEditing: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Frontend Developer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "Led the development of a React-based customer portal that increased user engagement by 35%. Collaborated with the design team to implement a new UI/UX that improved user satisfaction scores by 28%.",
      skills: ["React", "TypeScript", "Redux", "Jest"]
    },
    {
      id: 2,
      company: "Digital Innovations",
      position: "Frontend Developer",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
      location: "Austin, TX",
      description: "Developed and maintained multiple React applications with Redux state management. Implemented responsive designs and ensured cross-browser compatibility.",
      skills: ["React", "JavaScript", "CSS3", "Webpack"]
    },
  ]);
  
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    skills: ""
  });
  
  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) return;
    
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        company: newExperience.company,
        position: newExperience.position,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate,
        location: newExperience.location,
        description: newExperience.description,
        skills: newExperience.skills.split(",").map(s => s.trim())
      }
    ]);
    
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      skills: ""
    });
    
    setIsAddingExperience(false);
  };
  
  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        
        {isEditing && !isAddingExperience && (
          <Button onClick={() => setIsAddingExperience(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Experience
          </Button>
        )}
      </div>
      
      {isEditing && isAddingExperience && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input
                  placeholder="Company name"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <Input
                  placeholder="Job title"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  placeholder="Jan 2020"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  placeholder="Dec 2022 or Present"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  placeholder="City, State"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Describe your responsibilities and achievements"
                value={newExperience.description}
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills Used (comma separated)</label>
              <Input
                placeholder="React, JavaScript, CSS"
                value={newExperience.skills}
                onChange={(e) => setNewExperience({...newExperience, skills: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingExperience(false)}>Cancel</Button>
            <Button onClick={addExperience}>Add Experience</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{experience.position}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {experience.company}
                  </CardDescription>
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
                      onClick={() => removeExperience(experience.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {experience.startDate} - {experience.endDate}
                </div>
                <div>{experience.location}</div>
              </div>
              
              <p className="text-sm mb-3">{experience.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {experience.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
