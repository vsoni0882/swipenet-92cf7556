
import React, { ReactNode } from 'react';

interface AuthProtectedProps {
  children: ReactNode;
  userType?: 'employee' | 'employer' | 'any';
}

// This component now simply passes through children without any authentication check
const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthProtected;
