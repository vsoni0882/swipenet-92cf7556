
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  Globe,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import VerificationSection from '@/components/profile/VerificationSection';
import JobListings from '@/components/profile/JobListings';
import CompanyDetails from '@/components/profile/CompanyDetails';
import { Badge } from '@/components/ui/badge';

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Placeholder data - in a real app this would come from a database
  const profileData = {
    companyName: "TechInnovate Solutions",
    position: "HR Director",
    location: "New York, NY",
    email: "recruiting@techinnovate.com",
    phone: "+1 (555) 987-6543",
    website: "www.techinnovate.com",
    logo: "https://i.pravatar.cc/150?u=company",
    about: "TechInnovate Solutions is a leading software development company focused on cutting-edge technologies. We build scalable web and mobile applications for businesses across industries.",
    employeeCount: "50-200",
    foundedYear: "2010",
    isVerified: true,
    recruiterName: "Sarah Miller"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              <AvatarImage src={profileData.logo} alt={profileData.companyName} />
              <AvatarFallback>{profileData.companyName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {profileData.companyName}
                    {profileData.isVerified && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {profileData.recruiterName} • {profileData.position}
                  </p>
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
                  <Globe className="h-4 w-4" />
                  <span>{profileData.website}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{profileData.phone}</span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{profileData.employeeCount} employees</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Founded {profileData.foundedYear}</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">About Company</h3>
            <p className="text-gray-600">
              {profileData.about}
            </p>
          </div>
        </div>
        
        {/* Profile Content */}
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-3 gap-2">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Company Details</span>
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden md:inline">Verification</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Job Listings</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <TabsContent value="company">
              <CompanyDetails isEditing={isEditing} />
            </TabsContent>
            
            <TabsContent value="verification">
              <VerificationSection />
            </TabsContent>
            
            <TabsContent value="jobs">
              <JobListings isEditing={isEditing} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployerProfile;
