
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  ChevronLeft, 
  LogOut, 
  Mail, 
  FileText,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/c1f1574d-186a-4296-b4ee-0033bf9af489.png" 
              alt="SwipeNet Logo" 
              className="h-10" 
            />
          </Link>
        </div>
        
        {isHome && (
          <div className="flex gap-3">
            <Link to="/job-seeker">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Job Seeker
              </Button>
            </Link>
            <Link to="/employer">
              <Button className="font-medium bg-swapnet-blue hover:bg-swapnet-blue/90 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Employer
              </Button>
            </Link>
          </div>
        )}
        
        {!isHome && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              {location.pathname.includes('job-seeker') || location.pathname.includes('employee-profile') ? (
                <span className="flex items-center gap-1 text-sm font-medium">
                  <User className="h-4 w-4" /> Job Seeker Mode
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm font-medium">
                  <Briefcase className="h-4 w-4" /> Employer Mode
                </span>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full flex items-center justify-center p-0 overflow-hidden">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      US
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Guest User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      guest@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(location.pathname.includes('job-seeker') ? '/employee-profile' : '/employer-profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/cold-mailing')}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Cold Mailing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/job-seeker')}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Job Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/employer')}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Employer Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
