
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, Plus, Award, Calendar } from "lucide-react";

interface AchievementsSectionProps {
  isEditing: boolean;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Employee of the Year",
      issuer: "Tech Solutions Inc.",
      date: "Dec 2021",
      description: "Recognized for outstanding performance and contributions to the company's success."
    },
    {
      id: 2,
      title: "Google Cloud Certified Professional",
      issuer: "Google",
      date: "Jul 2020",
      description: "Earned certification demonstrating expertise in designing, developing, and managing Google Cloud solutions."
    },
    {
      id: 3,
      title: "Speaker at React Conference",
      issuer: "React Conf 2019",
      date: "Sep 2019",
      description: "Presented on 'Optimizing React Performance' to an audience of 500+ developers."
    }
  ]);
  
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    issuer: "",
    date: "",
    description: ""
  });
  
  const addAchievement = () => {
    if (!newAchievement.title) return;
    
    setAchievements([
      ...achievements,
      {
        id: Date.now(),
        title: newAchievement.title,
        issuer: newAchievement.issuer,
        date: newAchievement.date,
        description: newAchievement.description
      }
    ]);
    
    setNewAchievement({
      title: "",
      issuer: "",
      date: "",
      description: ""
    });
    
    setIsAddingAchievement(false);
  };
  
  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Achievements & Certifications</h2>
        
        {isEditing && !isAddingAchievement && (
          <Button onClick={() => setIsAddingAchievement(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Achievement
          </Button>
        )}
      </div>
      
      {isEditing && isAddingAchievement && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Achievement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Achievement or certification title"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Issuer</label>
                <Input
                  placeholder="Company or organization"
                  value={newAchievement.issuer}
                  onChange={(e) => setNewAchievement({...newAchievement, issuer: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  placeholder="Month Year"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Brief description of the achievement"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingAchievement(false)}>Cancel</Button>
            <Button onClick={addAchievement}>Add Achievement</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.issuer}</CardDescription>
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
                      onClick={() => removeAchievement(achievement.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                {achievement.date}
              </div>
              
              <p className="text-sm">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
