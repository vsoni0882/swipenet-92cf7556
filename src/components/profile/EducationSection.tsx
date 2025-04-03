
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, Plus, GraduationCap, Calendar } from "lucide-react";

interface EducationSectionProps {
  isEditing: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [education, setEducation] = useState([
    {
      id: 1,
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      startDate: "Aug 2014",
      endDate: "May 2018",
      location: "Berkeley, CA",
      description: "Graduated with honors. Coursework included Data Structures, Algorithms, Database Systems, and Web Development."
    },
    {
      id: 2,
      institution: "Coding Bootcamp",
      degree: "Full Stack Web Development",
      startDate: "Jan 2019",
      endDate: "Apr 2019",
      location: "San Francisco, CA",
      description: "Intensive 12-week program covering modern web development technologies including React, Node.js, and MongoDB."
    }
  ]);
  
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
    description: ""
  });
  
  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) return;
    
    setEducation([
      ...education,
      {
        id: Date.now(),
        institution: newEducation.institution,
        degree: newEducation.degree,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
        location: newEducation.location,
        description: newEducation.description
      }
    ]);
    
    setNewEducation({
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
      description: ""
    });
    
    setIsAddingEducation(false);
  };
  
  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        
        {isEditing && !isAddingEducation && (
          <Button onClick={() => setIsAddingEducation(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Education
          </Button>
        )}
      </div>
      
      {isEditing && isAddingEducation && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <Input
                  placeholder="University or school name"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <Input
                  placeholder="Degree or certificate"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  placeholder="Aug 2016"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <Input
                  placeholder="May 2020 or Present"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  placeholder="City, State"
                  value={newEducation.location}
                  onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Describe your studies, achievements, and relevant coursework"
                value={newEducation.description}
                onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingEducation(false)}>Cancel</Button>
            <Button onClick={addEducation}>Add Education</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <CardDescription className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {edu.institution}
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
                      onClick={() => removeEducation(edu.id)}
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
                  {edu.startDate} - {edu.endDate}
                </div>
                <div>{edu.location}</div>
              </div>
              
              <p className="text-sm">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
