
import React, { useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface AuthProtectedProps {
  children: ReactNode;
  userType?: 'employee' | 'employer' | 'any';
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children, userType = 'any' }) => {
  const { user, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [checkAuth, user]);

  if (isLoading) {
    // You could show a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !user.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If userType is specified, check if user type matches
  if (userType !== 'any' && user.userType !== userType) {
    const redirectPath = user.userType === 'employee' ? '/job-seeker' : '/employer';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;
