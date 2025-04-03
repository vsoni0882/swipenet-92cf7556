
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
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
        
        {isHome && (
          <div className="flex gap-2">
            <Link to="/job-seeker">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Job Seeker
              </Button>
            </Link>
            <Link to="/employer">
              <Button variant="outline" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Employer
              </Button>
            </Link>
          </div>
        )}
        
        {!isHome && (
          <div>
            {location.pathname.includes('job-seeker') ? (
              <span className="flex items-center gap-1 text-sm font-medium">
                <User className="h-4 w-4" /> Job Seeker Mode
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm font-medium">
                <Briefcase className="h-4 w-4" /> Employer Mode
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
