
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileUp, File, X, Check } from "lucide-react";

interface CVUploadSectionProps {
  isEditing: boolean;
}

const CVUploadSection: React.FC<CVUploadSectionProps> = ({ isEditing }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is PDF
      if (selectedFile.type !== 'application/pdf') {
        toast.error("Invalid file type", {
          description: "Please upload a PDF file",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Maximum file size is 5MB",
        });
        return;
      }
      
      setFile(selectedFile);
      setIsUploaded(false);
      setIsVerified(false);
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    // Mock upload process
    toast.info("Uploading CV...");
    
    setTimeout(() => {
      setIsUploaded(true);
      toast.success("CV uploaded successfully");
      
      // Mock verification process
      toast.info("Verifying skills...");
      setTimeout(() => {
        setIsVerified(true);
        toast.success("Skills verified successfully", {
          description: "Your skills have been verified based on your CV",
        });
      }, 2000);
    }, 2000);
  };
  
  const handleRemove = () => {
    setFile(null);
    setIsUploaded(false);
    setIsVerified(false);
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Resume / CV</h2>
      
      {isEditing ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          {!file ? (
            <div className="text-center">
              <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium mb-2">Upload your CV</h3>
              <p className="text-sm text-gray-500 mb-4">PDF format, max 5MB</p>
              
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Select File</span>
                </Button>
              </label>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <File className="h-10 w-10 text-swapnet-blue p-2 bg-blue-50 rounded-md mr-3" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" onClick={handleRemove} className="text-red-500 h-8 hover:bg-red-50 hover:text-red-600">
                  <X className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
              
              {!isUploaded ? (
                <Button onClick={handleUpload} className="w-full">
                  <FileUp className="h-4 w-4 mr-2" /> Upload CV
                </Button>
              ) : (
                <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <p className="font-medium">CV uploaded successfully</p>
                    {isVerified && <p className="text-sm">Skills verified ✓</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {isUploaded ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <File className="h-10 w-10 text-swapnet-blue p-2 bg-blue-50 rounded-md mr-3" />
                <div>
                  <p className="font-medium">My_Professional_CV.pdf</p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 mr-3">Uploaded on {new Date().toLocaleDateString()}</span>
                    {isVerified && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Skills Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="h-8">
                View CV
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No CV uploaded yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CVUploadSection;
