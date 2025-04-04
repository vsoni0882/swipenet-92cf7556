
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, User } from 'lucide-react';
import ExperienceSection from '@/components/profile/ExperienceSection';
import EducationSection from '@/components/profile/EducationSection';
import SkillsSection from '@/components/profile/SkillsSection';
import ProjectsSection from '@/components/profile/ProjectsSection';
import AchievementsSection from '@/components/profile/AchievementsSection';
import CVUploadSection from '@/components/profile/CVUploadSection';
import { toast } from 'sonner';

// Mock user data
const mockUserProfile = {
  name: "Jane Doe",
  title: "Senior Frontend Developer",
  company: "Tech Innovations Inc.",
  location: "San Francisco, CA",
  email: "jane.doe@example.com",
  phone: "(123) 456-7890",
  website: "janedoe.dev",
  bio: "Passionate frontend developer with 8+ years of experience building responsive and accessible web applications. Specialized in React, TypeScript, and modern CSS frameworks."
};

const EmployeeProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setTimeout(() => {
        // Update localStorage to mark CV as uploaded
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            user.hasCV = true; // Mark CV as uploaded for demo
            localStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        }
        
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }, 500);
    } else {
      setIsEditing(true);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-swapnet-gray">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-swapnet-dark">My Profile</h1>
          
          <Button 
            variant={isEditing ? "default" : "outline"} 
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" /> Edit Profile
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto sm:mx-0">
                {isEditing ? (
                  <div className="relative cursor-pointer group">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Change Photo</span>
                    </div>
                  </div>
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input 
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <Input 
                        name="title"
                        value={profile.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <Input 
                          name="company"
                          value={profile.company}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input 
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-swapnet-dark">{profile.name}</h2>
                    <p className="text-lg text-gray-600 mt-1">{profile.title}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
                      {profile.company && <span>{profile.company}</span>}
                      {profile.location && <span>{profile.location}</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input 
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <Input 
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium text-gray-500">Email:</span>
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium text-gray-500">Phone:</span>
                    <span className="text-gray-900">{profile.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-medium text-gray-500">Website:</span>
                    <span className="text-gray-900">{profile.website}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">About Me</h3>
              
              {isEditing ? (
                <Textarea 
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <CVUploadSection isEditing={isEditing} />
          <SkillsSection isEditing={isEditing} />
          <ExperienceSection isEditing={isEditing} />
          <EducationSection isEditing={isEditing} />
          <ProjectsSection isEditing={isEditing} />
          <AchievementsSection isEditing={isEditing} />
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
