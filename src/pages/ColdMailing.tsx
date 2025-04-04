
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SendHorizontal, Plus, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const ColdMailing: React.FC = () => {
  const { user } = useAuthStore();
  const [subject, setSubject] = useState('');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [senderEmail, setSenderEmail] = useState(user?.email || '');
  const [messageTemplate, setMessageTemplate] = useState('');
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleAddRecipient = () => {
    if (!newRecipient.trim()) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newRecipient)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (recipientEmails.includes(newRecipient)) {
      toast.error("This email is already in the list");
      return;
    }
    
    setRecipientEmails([...recipientEmails, newRecipient]);
    setNewRecipient('');
  };

  const handleRemoveRecipient = (email: string) => {
    setRecipientEmails(recipientEmails.filter(e => e !== email));
  };

  const handleSendEmails = async () => {
    // Validate form
    if (!subject.trim()) {
      toast.error("Subject is required");
      return;
    }
    
    if (!messageTemplate.trim()) {
      toast.error("Message template is required");
      return;
    }
    
    if (!senderName.trim() || !senderEmail.trim()) {
      toast.error("Sender name and email are required");
      return;
    }
    
    if (recipientEmails.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    setIsSending(true);
    
    try {
      await axios.post('http://localhost:5000/api/email/send-cold-emails', {
        subject,
        messageTemplate,
        senderName,
        senderEmail,
        recipientEmails
      }, {
        withCredentials: true
      });
      
      toast.success(`Emails sent successfully to ${recipientEmails.length} recipients`);
      
      // Clear form after successful send
      setSubject('');
      setMessageTemplate('');
      setRecipientEmails([]);
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error(error.response?.data?.message || "Failed to send emails");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Cold Mailing</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Template</CardTitle>
              <CardDescription>Create your cold email template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input 
                  id="subject" 
                  placeholder="e.g., Software Engineer Position Inquiry" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sender-name">Your Name</Label>
                  <Input 
                    id="sender-name" 
                    placeholder="Your Name" 
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender-email">Your Email</Label>
                  <Input 
                    id="sender-email" 
                    type="email"
                    placeholder="you@example.com" 
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message-template">Email Template</Label>
                <Textarea 
                  id="message-template" 
                  placeholder="Dear Hiring Manager,

I'm writing to express my interest in the [Position] role at your company. With my background in [Skills/Experience], I believe I could be a great fit for your team.

My resume is attached for your review. I would welcome the opportunity to discuss how my skills align with your needs.

Best regards,
[Your Name]" 
                  className="min-h-[200px]"
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recipients</CardTitle>
                <CardDescription>Add recruiters or hiring managers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="recipient@company.com" 
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddRecipient();
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleAddRecipient}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {recipientEmails.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No recipients added yet
                    </p>
                  ) : (
                    recipientEmails.map((email) => (
                      <div 
                        key={email} 
                        className="flex items-center justify-between p-2 bg-primary/5 rounded-md"
                      >
                        <span className="text-sm truncate">{email}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleRemoveRecipient(email)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Total recipients: {recipientEmails.length}
                </div>
              </CardFooter>
            </Card>
            
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSendEmails}
              disabled={isSending}
            >
              {isSending ? (
                "Sending emails..."
              ) : (
                <>
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Send to {recipientEmails.length} recipient{recipientEmails.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColdMailing;
