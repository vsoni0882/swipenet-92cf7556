
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  FileText, 
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillsSection from '@/components/profile/SkillsSection';
import ProjectsSection from '@/components/profile/ProjectsSection';
import ExperienceSection from '@/components/profile/ExperienceSection';
import EducationSection from '@/components/profile/EducationSection';
import AchievementsSection from '@/components/profile/AchievementsSection';
import { Badge } from '@/components/ui/badge';

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Placeholder data - in a real app this would come from a database
  const profileData = {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://i.pravatar.cc/150?u=alex",
    about: "Passionate frontend developer with 5+ years of experience building responsive and accessible web applications. Specializing in React, TypeScript, and modern CSS frameworks.",
    joinedDate: "May 2021",
    isVerified: true
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {profileData.name}
                    {profileData.isVerified && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </h1>
                  <p className="text-lg text-gray-600">{profileData.title}</p>
                </div>
                
                <Button 
                  variant={isEditing ? "default" : "outline"} 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profileData.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">About</h3>
            <p className="text-gray-600">
              {profileData.about}
            </p>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:grid-cols-5 gap-2">
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden md:inline">Achievements</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <TabsContent value="skills">
              <SkillsSection isEditing={isEditing} />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectsSection isEditing={isEditing} />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceSection isEditing={isEditing} />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationSection isEditing={isEditing} />
            </TabsContent>
            
            <TabsContent value="achievements">
              <AchievementsSection isEditing={isEditing} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployeeProfile;
