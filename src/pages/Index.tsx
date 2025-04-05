
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ArrowRight, MapPin, DollarSign, Star, Users, Shield } from 'lucide-react';
import Header from '@/components/Header';
import { useAuthStore } from '@/store/authStore';
import { CirclePattern, WavyLines, GridPattern } from '@/components/ui/background-shapes';

const Index: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-swapnet-gray/30 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-0 text-swapnet-blue pointer-events-none">
        <CirclePattern />
      </div>
      <div className="absolute bottom-0 left-0 text-swapnet-dark pointer-events-none">
        <WavyLines />
      </div>
      <div className="absolute top-1/3 -left-1/4 text-swapnet-blue pointer-events-none opacity-10">
        <GridPattern />
      </div>
      
      <Header />
      
      <main className="flex-1 flex flex-col relative z-0">
        <section className="container max-w-7xl mx-auto py-16 px-4 md:py-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <div className="bg-gradient-to-r from-swapnet-blue/10 to-transparent p-1 rounded-lg inline-block mb-3">
                <span className="text-swapnet-blue font-medium text-sm px-3 py-1">Revolutionizing Hiring</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-swapnet-dark leading-tight">
                Find Your Perfect Match in the <span className="text-swapnet-blue">Job Market</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                SwipeNet brings the simplicity of swipe-based interfaces to hiring. 
                Match with the right jobs or candidates instantly and transform your career path.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="bg-swapnet-blue hover:bg-swapnet-blue/90 w-full sm:w-auto">
                        <User className="mr-2 h-5 w-5" />
                        I'm a Job Seeker
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <Link to="/signup">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <Briefcase className="mr-2 h-5 w-5" />
                        I'm an Employer
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to={user.userType === 'employee' ? '/job-seeker' : '/employer'}>
                    <Button size="lg" className="bg-swapnet-blue hover:bg-swapnet-blue/90">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full bg-gradient-to-r from-swapnet-blue/80 to-swapnet-blue border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-swapnet-dark">2,000+</span>
                  <span className="text-gray-500 ml-1">successful matches this month</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="absolute top-10 -right-5 w-32 h-32 bg-gradient-to-br from-swapnet-blue/20 to-swapnet-blue/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-5 left-10 w-40 h-40 bg-gradient-to-tr from-swapnet-blue/20 to-swapnet-green/10 rounded-full blur-xl"></div>
              
              <div className="relative w-full max-w-md mx-auto z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform rotate-3 z-10 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-xl">Senior Frontend Developer</h3>
                      <p className="text-swapnet-blue font-medium">TechVision Inc.</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-swapnet-blue px-3 py-1 rounded-full font-medium">
                      New
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      "Great company culture with competitive pay and excellent benefits package"
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-700">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        San Francisco, CA (Remote)
                      </span>
                      <span className="flex items-center font-medium">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        120-150k
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        Team of 12
                      </span>
                      <span className="flex items-center font-medium">
                        <Shield className="h-4 w-4 mr-1 text-gray-400" />
                        Benefits
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Skip</Button>
                    <Button className="flex-1 bg-swapnet-green hover:bg-swapnet-green/90">Match</Button>
                  </div>
                </div>
                
                <div className="absolute top-5 -left-3 w-full h-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200 -rotate-6 z-0">
                </div>
                
                <div className="absolute top-10 -left-5 w-full h-full bg-white rounded-2xl shadow-md p-6 border border-gray-200 -rotate-12 z-0 opacity-70">
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-swapnet-gray/40 relative">
          <div className="absolute top-0 right-1/4 translate-y-[-50%]">
            <CirclePattern />
          </div>
          
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-swapnet-dark">How SwipeNet Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform makes finding the perfect job or candidate as simple as swiping on your phone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-swapnet-blue/10 h-14 w-14 rounded-full flex items-center justify-center text-swapnet-blue font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-swapnet-dark">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your profile with your skills, experience, and preferences in minutes.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-swapnet-blue/10 h-14 w-14 rounded-full flex items-center justify-center text-swapnet-blue font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-swapnet-dark">Swipe Through Matches</h3>
                <p className="text-gray-600">
                  Browse through AI-matched job listings or candidates with our intuitive swipe interface.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-swapnet-blue/10 h-14 w-14 rounded-full flex items-center justify-center text-swapnet-blue font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-swapnet-dark">Connect & Apply</h3>
                <p className="text-gray-600">
                  When you match, you can instantly connect or apply, streamlining the hiring process.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to={user ? (user.userType === 'employee' ? '/job-seeker' : '/employer') : '/signup'}>
                <Button className="bg-swapnet-dark hover:bg-swapnet-dark/90">
                  {user ? 'Go to Dashboard' : 'Get Started Now'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-swapnet-dark">Why Choose SwipeNet</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're revolutionizing how job seekers and employers connect in the digital age
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Matching",
                  description: "Our algorithm learns your preferences to provide increasingly relevant matches",
                  icon: <div className="bg-blue-100 p-3 rounded-md text-swapnet-blue">AI</div>
                },
                {
                  title: "Time-Saving Interface",
                  description: "The intuitive swipe interface lets you review more opportunities in less time",
                  icon: <div className="bg-green-100 p-3 rounded-md text-swapnet-green">⏱️</div>
                },
                {
                  title: "Higher Match Quality",
                  description: "Both parties express interest, leading to more meaningful connections",
                  icon: <div className="bg-purple-100 p-3 rounded-md text-purple-600">🤝</div>
                },
                {
                  title: "Instant Communication",
                  description: "Connect directly with your matches through our built-in messaging system",
                  icon: <div className="bg-yellow-100 p-3 rounded-md text-yellow-600">💬</div>
                },
                {
                  title: "Company Insights",
                  description: "Get insider information about company culture and work environment",
                  icon: <div className="bg-red-100 p-3 rounded-md text-red-600">🔍</div>
                },
                {
                  title: "Privacy Controls",
                  description: "Manage who can see your profile with granular privacy settings",
                  icon: <div className="bg-indigo-100 p-3 rounded-md text-indigo-600">🔒</div>
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  {feature.icon}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-swapnet-dark">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-swapnet-dark text-white py-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-5">
          <WavyLines />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0 flex items-center">
              <img 
                src="/lovable-uploads/c1f1574d-186a-4296-b4ee-0033bf9af489.png" 
                alt="SwipeNet Logo" 
                className="h-10 invert mb-3" 
              />
              <p className="text-sm text-gray-400 ml-4">Reinventing hiring one swipe at a time</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              <div>
                <h4 className="font-medium mb-4 text-white">Platform</h4>
                <ul className="space-y-2">
                  <li><Link to="/job-seeker" className="text-sm text-gray-400 hover:text-white transition-colors">Job Seekers</Link></li>
                  <li><Link to="/employer" className="text-sm text-gray-400 hover:text-white transition-colors">Employers</Link></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-white">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Career Tips</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-white">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SwipeNet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
