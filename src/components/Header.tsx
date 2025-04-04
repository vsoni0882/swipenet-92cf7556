
import React, { useState } from 'react';
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
import { useAuthStore } from '@/store/authStore';
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
  const { user, logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-swapnet-blue">SwapNet</span>
          </Link>
        </div>
        
        {isHome && !user && (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
        
        {isHome && user && (
          <div className="flex gap-2">
            <Link to={user.userType === 'employee' ? '/job-seeker' : '/employer'}>
              <Button variant="outline" className="flex items-center gap-2">
                {user.userType === 'employee' ? (
                  <>
                    <User className="h-4 w-4" />
                    Job Seeker Dashboard
                  </>
                ) : (
                  <>
                    <Briefcase className="h-4 w-4" />
                    Employer Dashboard
                  </>
                )}
              </Button>
            </Link>
          </div>
        )}
        
        {!isHome && !user && (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        )}
        
        {!isHome && user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              {user.userType === 'employee' ? (
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
                    <AvatarImage src={user?.avatar || ''} alt={user?.name || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {user?.name?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(user?.userType === 'employee' ? '/employee-profile' : '/employer-profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/cold-mailing')}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Cold Mailing</span>
                </DropdownMenuItem>
                {user?.userType === 'employee' && (
                  <DropdownMenuItem onClick={() => navigate('/job-seeker')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Job Dashboard</span>
                  </DropdownMenuItem>
                )}
                {user?.userType === 'employer' && (
                  <DropdownMenuItem onClick={() => navigate('/employer')}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Employer Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
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
