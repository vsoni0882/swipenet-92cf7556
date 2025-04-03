
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface SkillsSectionProps {
  isEditing: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [skills, setSkills] = useState([
    { id: 1, name: "React", level: "Advanced" },
    { id: 2, name: "TypeScript", level: "Advanced" },
    { id: 3, name: "JavaScript", level: "Advanced" },
    { id: 4, name: "HTML/CSS", level: "Advanced" },
    { id: 5, name: "Node.js", level: "Intermediate" },
    { id: 6, name: "GraphQL", level: "Intermediate" },
    { id: 7, name: "Next.js", level: "Intermediate" },
    { id: 8, name: "Redux", level: "Advanced" },
    { id: 9, name: "Tailwind CSS", level: "Advanced" },
    { id: 10, name: "Jest", level: "Intermediate" },
  ]);
  
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("Intermediate");
  
  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    setSkills([
      ...skills,
      { 
        id: Date.now(), 
        name: newSkill, 
        level: newLevel 
      }
    ]);
    
    setNewSkill("");
  };
  
  const removeSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      
      {isEditing && (
        <div className="mb-6 flex flex-wrap gap-3 md:flex-nowrap">
          <Input
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full md:w-2/3"
          />
          <select 
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="w-full md:w-1/3 px-3 py-2 border rounded-md"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill.id} 
            variant="secondary"
            className="px-3 py-1 text-sm"
          >
            {skill.name}
            <span className="ml-1 text-xs opacity-70">• {skill.level}</span>
            
            {isEditing && (
              <button 
                onClick={() => removeSkill(skill.id)} 
                className="ml-1 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
