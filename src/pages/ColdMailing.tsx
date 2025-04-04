
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import AuthProtected from '@/components/AuthProtected';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Trash, Plus, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type FormValues = {
  subject: string;
  messageTemplate: string;
  senderName: string;
  senderEmail: string;
};

const ColdMailing = () => {
  const [recipientEmails, setRecipientEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      subject: '',
      messageTemplate: '',
      senderName: '',
      senderEmail: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (recipientEmails.length === 0) {
      toast({
        title: 'No recipients',
        description: 'Please add at least one recipient email',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/email/send-cold-emails',
        {
          ...values,
          recipientEmails,
        },
        { withCredentials: true }
      );

      toast({
        title: 'Success!',
        description: `Cold emails sent to ${recipientEmails.length} recipients`,
      });

      // Clear form after successful send
      form.reset();
      setRecipientEmails([]);
    } catch (error: any) {
      console.error('Error sending emails:', error);
      toast({
        title: 'Failed to send emails',
        description: error.response?.data?.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const addRecipient = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail || !emailRegex.test(newEmail)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    if (recipientEmails.includes(newEmail)) {
      toast({
        title: 'Duplicate email',
        description: 'This email is already in the recipients list',
        variant: 'destructive',
      });
      return;
    }

    setRecipientEmails([...recipientEmails, newEmail]);
    setNewEmail('');
  };

  const removeRecipient = (email: string) => {
    setRecipientEmails(recipientEmails.filter(e => e !== email));
  };

  const clearAllRecipients = () => {
    setRecipientEmails([]);
  };

  return (
    <AuthProtected>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Cold Email Campaign</h1>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Recipients</h2>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add recipient email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addRecipient();
                    }
                  }}
                />
                <Button onClick={addRecipient} type="button">
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
                {recipientEmails.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllRecipients}
                    type="button"
                  >
                    <Trash className="h-4 w-4 mr-2" /> Clear All
                  </Button>
                )}
              </div>

              <div className="bg-gray-50 rounded-md p-2 min-h-[100px]">
                {recipientEmails.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">
                    No recipients added yet. Add recruiter or engineer emails to send your message.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {recipientEmails.map((email) => (
                      <div
                        key={email}
                        className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm flex items-center"
                      >
                        <span className="mr-1">{email}</span>
                        <button
                          onClick={() => removeRecipient(email)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {recipientEmails.length} recipient{recipientEmails.length !== 1 ? 's' : ''} added
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="senderName"
                    rules={{ required: 'Your name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="senderEmail"
                    rules={{ 
                      required: 'Your email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  rules={{ required: 'Subject is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer Application - Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageTemplate"
                  rules={{ required: 'Message is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Template</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Dear Hiring Manager,

I'm writing to express my interest in the [Position] role at your company. With [X years] of experience in [skills/technologies], I believe I would be a great addition to your team.

You can find my portfolio at: [link]
My resume is attached to this email.

I would appreciate the opportunity to discuss how my background and skills align with your needs.

Thank you for your consideration.

Best regards,
[Your Name]"
                          className="min-h-[300px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This message will be sent to all recipients in your list.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSending}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSending
                      ? `Sending to ${recipientEmails.length} recipient${
                          recipientEmails.length !== 1 ? 's' : ''
                        }...`
                      : `Send to ${recipientEmails.length} recipient${
                          recipientEmails.length !== 1 ? 's' : ''
                        }`}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </AuthProtected>
  );
};

export default ColdMailing;
