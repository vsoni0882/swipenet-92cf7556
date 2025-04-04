
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthProtectedProps {
  children: ReactNode;
  userType?: 'employee' | 'employer' | 'any';
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children, userType = 'any' }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsAuthenticated(user.isAuthenticated === true);
          setCurrentUserType(user.userType);
        } catch (error) {
          setIsAuthenticated(false);
          setCurrentUserType(null);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUserType(null);
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
  }, []);

  if (isChecking) {
    // You could show a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If userType is specified, check if user type matches
  if (userType !== 'any' && currentUserType !== userType) {
    const redirectPath = currentUserType === 'employee' ? '/job-seeker' : '/employer';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;
