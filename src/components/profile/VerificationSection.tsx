
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const VerificationSection = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    companyRegistration: true,
    identityVerification: true,
    emailVerification: true,
    phoneVerification: false,
    addressVerification: false
  });
  
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setVerificationStatus({
        ...verificationStatus,
        addressVerification: true
      });
    }, 2000);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Verification</h2>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>
              Complete all verifications to gain the "Verified Employer" badge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={verificationStatus.companyRegistration} id="company" disabled />
                  <label htmlFor="company" className="text-sm font-medium">
                    Company Registration
                  </label>
                </div>
                {verificationStatus.companyRegistration ? (
                  <Badge status="verified" />
                ) : (
                  <Badge status="pending" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={verificationStatus.identityVerification} id="identity" disabled />
                  <label htmlFor="identity" className="text-sm font-medium">
                    Identity Verification
                  </label>
                </div>
                {verificationStatus.identityVerification ? (
                  <Badge status="verified" />
                ) : (
                  <Badge status="pending" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={verificationStatus.emailVerification} id="email" disabled />
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Verification
                  </label>
                </div>
                {verificationStatus.emailVerification ? (
                  <Badge status="verified" />
                ) : (
                  <Badge status="pending" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={verificationStatus.phoneVerification} id="phone" disabled />
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Verification
                  </label>
                </div>
                {verificationStatus.phoneVerification ? (
                  <Badge status="verified" />
                ) : (
                  <Button size="sm" variant="outline">Verify Phone</Button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={verificationStatus.addressVerification} id="address" disabled />
                  <label htmlFor="address" className="text-sm font-medium">
                    Business Address Verification
                  </label>
                </div>
                {verificationStatus.addressVerification ? (
                  <Badge status="verified" />
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsUploading(true)}>
                    Upload Proof
                  </Button>
                )}
              </div>
              
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-500">
                  Verification status: {' '}
                  {Object.values(verificationStatus).every(Boolean) ? (
                    <span className="text-green-600 font-medium">Fully Verified</span>
                  ) : (
                    <span className="text-amber-600 font-medium">Partially Verified</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isUploading && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Verification Document</CardTitle>
              <CardDescription>
                Please upload a document that proves your business address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload}>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center mb-4">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-500 mb-4">
                    Drag and drop your document here, or click to browse
                  </p>
                  <Input
                    type="file"
                    className="max-w-sm mx-auto"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Acceptable documents: Business utility bill, lease agreement, or business registration with address (PDF, JPG, PNG)
                </p>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setIsUploading(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Upload Document
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Badge component for verification status
interface BadgeProps {
  status: 'verified' | 'pending' | 'rejected';
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  switch (status) {
    case 'verified':
      return (
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Verified</span>
        </div>
      );
    case 'pending':
      return (
        <div className="flex items-center gap-1 text-amber-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Pending</span>
        </div>
      );
    case 'rejected':
      return (
        <div className="flex items-center gap-1 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Rejected</span>
        </div>
      );
    default:
      return null;
  }
};

export default VerificationSection;
