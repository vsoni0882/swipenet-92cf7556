
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployerProfile from "./pages/EmployerProfile";
import NotFound from "./pages/NotFound";
import AuthProtected from "./components/AuthProtected";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/job-seeker" element={
            <AuthProtected userType="employee">
              <JobSeekerDashboard />
            </AuthProtected>
          } />
          <Route path="/employer" element={
            <AuthProtected userType="employer">
              <EmployerDashboard />
            </AuthProtected>
          } />
          <Route path="/employee-profile" element={
            <AuthProtected userType="employee">
              <EmployeeProfile />
            </AuthProtected>
          } />
          <Route path="/employer-profile" element={
            <AuthProtected userType="employer">
              <EmployerProfile />
            </AuthProtected>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
