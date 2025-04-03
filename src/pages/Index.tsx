
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-swapnet-gray">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <section className="container max-w-6xl mx-auto py-16 px-4 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-swapnet-dark">
                Find Your Perfect Match in the Job Market
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                SwapNet brings the simplicity of swipe-based interfaces to hiring. 
                Match with the right jobs or candidates instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/job-seeker">
                  <Button size="lg" className="bg-swapnet-blue hover:bg-swapnet-blue/90 w-full sm:w-auto">
                    <User className="mr-2 h-5 w-5" />
                    I'm a Job Seeker
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/employer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Briefcase className="mr-2 h-5 w-5" />
                    I'm an Employer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 rotate-3 z-10 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Frontend Developer</h3>
                      <p className="text-swapnet-blue">TechCorp</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-swapnet-blue px-2 py-1 rounded-full">
                      2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    We're looking for a talented Frontend Developer to join our growing team.
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      San Francisco
                    </span>
                    <span className="text-sm flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      $120-150k
                    </span>
                  </div>
                </div>
                
                <div className="absolute top-5 -left-3 w-full h-full bg-white rounded-lg shadow-lg p-6 border border-gray-200 -rotate-3 z-0">
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-white py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-swapnet-gray rounded-lg p-6 text-center">
                <div className="bg-swapnet-blue h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your profile with your skills, experience, and preferences.
                </p>
              </div>
              
              <div className="bg-swapnet-gray rounded-lg p-6 text-center">
                <div className="bg-swapnet-blue h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Swipe Through Matches</h3>
                <p className="text-gray-600">
                  Browse through AI-matched job listings or candidates with our intuitive swipe interface.
                </p>
              </div>
              
              <div className="bg-swapnet-gray rounded-lg p-6 text-center">
                <div className="bg-swapnet-blue h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Connect & Apply</h3>
                <p className="text-gray-600">
                  When you match, you can instantly connect or apply, streamlining the hiring process.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-swapnet-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold">SwapNet</span>
              <p className="text-sm text-gray-400">Reinventing hiring one swipe at a time</p>
            </div>
            
            <div className="flex gap-4">
              <Link to="/job-seeker" className="text-sm hover:underline">Job Seekers</Link>
              <Link to="/employer" className="text-sm hover:underline">Employers</Link>
              <a href="#" className="text-sm hover:underline">About</a>
              <a href="#" className="text-sm hover:underline">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SwapNet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
