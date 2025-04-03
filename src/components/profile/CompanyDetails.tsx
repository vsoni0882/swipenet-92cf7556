
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface CompanyDetailsProps {
  isEditing: boolean;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [companyDetails, setCompanyDetails] = useState({
    mission: "To create innovative software solutions that solve real-world problems and improve people's lives.",
    vision: "To become a leading global technology company known for excellence, innovation, and positive impact.",
    culture: "We foster a collaborative, inclusive, and innovative environment where team members are empowered to do their best work. We value work-life balance, continuous learning, and personal growth.",
    benefits: [
      "Competitive salary and equity options",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Unlimited PTO",
      "Remote-friendly work environment",
      "Professional development budget",
      "Weekly team lunches",
      "Company retreats twice a year"
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/company/techinnovate",
      twitter: "https://twitter.com/techinnovate",
      facebook: "https://facebook.com/techinnovate",
      instagram: "https://instagram.com/techinnovate"
    }
  });
  
  const [editedDetails, setEditedDetails] = useState({ ...companyDetails });
  
  const handleSave = () => {
    setCompanyDetails(editedDetails);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Company Details</h2>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Mission & Vision</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mission Statement</label>
                  <Textarea
                    value={editedDetails.mission}
                    onChange={(e) => setEditedDetails({...editedDetails, mission: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Vision</label>
                  <Textarea
                    value={editedDetails.vision}
                    onChange={(e) => setEditedDetails({...editedDetails, vision: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Mission</h4>
                  <p className="text-sm">{companyDetails.mission}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Vision</h4>
                  <p className="text-sm">{companyDetails.vision}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Company Culture</h3>
            {isEditing ? (
              <Textarea
                value={editedDetails.culture}
                onChange={(e) => setEditedDetails({...editedDetails, culture: e.target.value})}
                rows={3}
              />
            ) : (
              <p className="text-sm">{companyDetails.culture}</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Benefits & Perks</h3>
            {isEditing ? (
              <div>
                <Textarea
                  value={editedDetails.benefits.join('\n')}
                  onChange={(e) => setEditedDetails({
                    ...editedDetails, 
                    benefits: e.target.value.split('\n').filter(b => b.trim() !== "")
                  })}
                  rows={8}
                  placeholder="Enter one benefit per line"
                />
                <p className="text-xs text-gray-500 mt-1">Enter one benefit per line</p>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {companyDetails.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Social Media</h3>
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <Input
                    value={editedDetails.socialMedia.linkedin}
                    onChange={(e) => setEditedDetails({
                      ...editedDetails,
                      socialMedia: {
                        ...editedDetails.socialMedia,
                        linkedin: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter</label>
                  <Input
                    value={editedDetails.socialMedia.twitter}
                    onChange={(e) => setEditedDetails({
                      ...editedDetails,
                      socialMedia: {
                        ...editedDetails.socialMedia,
                        twitter: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Facebook</label>
                  <Input
                    value={editedDetails.socialMedia.facebook}
                    onChange={(e) => setEditedDetails({
                      ...editedDetails,
                      socialMedia: {
                        ...editedDetails.socialMedia,
                        facebook: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Instagram</label>
                  <Input
                    value={editedDetails.socialMedia.instagram}
                    onChange={(e) => setEditedDetails({
                      ...editedDetails,
                      socialMedia: {
                        ...editedDetails.socialMedia,
                        instagram: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <a href={companyDetails.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                <a href={companyDetails.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
                <a href={companyDetails.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">Facebook</a>
                <a href={companyDetails.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Instagram</a>
              </div>
            )}
          </CardContent>
        </Card>
        
        {isEditing && (
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;
