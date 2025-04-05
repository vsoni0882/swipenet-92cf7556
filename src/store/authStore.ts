
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'employee' | 'employer';
  isAuthenticated: boolean;
  hasCV?: boolean;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, userType: 'employee' | 'employer') => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  updateUserCV: (hasCV: boolean) => void;
}

// API base URL
const API_URL = 'http://localhost:5000/api';

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      
      // Login function
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_URL}/auth/login`, 
            { email, password },
            { withCredentials: true } // Important for cookies
          );
          
          // Ensure user has isAuthenticated flag
          const userData = {
            ...response.data.user,
            isAuthenticated: true,
            id: response.data.user._id || response.data.user.id, // Handle different id formats
          };
          
          set({ 
            user: userData,
            isLoading: false
          });
          
          // Set cookie as backup (JWT will be handled by HTTP-only cookie from server)
          Cookies.set('userType', userData.userType, { expires: 7 });
          
          return response.data;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Login failed' 
          });
          throw error;
        }
      },
      
      // Signup function
      signup: async (name: string, email: string, password: string, userType: 'employee' | 'employer') => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_URL}/auth/signup`, 
            { name, email, password, userType },
            { withCredentials: true }
          );
          
          // Ensure user has isAuthenticated flag
          const userData = {
            ...response.data.user,
            isAuthenticated: true,
            id: response.data.user._id || response.data.user.id, // Handle different id formats
          };
          
          set({ 
            user: userData,
            isLoading: false
          });
          
          // Set cookie as backup
          Cookies.set('userType', userData.userType, { expires: 7 });
          
          return response.data;
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Signup failed' 
          });
          throw error;
        }
      },
      
      // Logout function
      logout: async () => {
        set({ isLoading: true });
        try {
          await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
          
          // Clear cookies
          Cookies.remove('userType');
          
          set({ 
            user: null,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({ isLoading: false });
          console.error('Logout error:', error);
        }
      },
      
      // Check auth status
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`${API_URL}/auth/me`, { 
            withCredentials: true 
          });
          
          // Ensure user has isAuthenticated flag
          const userData = {
            ...response.data.user,
            isAuthenticated: true,
            id: response.data.user._id || response.data.user.id, // Handle different id formats
          };
          
          set({ 
            user: userData,
            isLoading: false
          });
        } catch (error) {
          // If the API call fails, fallback to localStorage
          const userData = localStorage.getItem('auth-storage');
          if (userData) {
            try {
              const parsedStorage = JSON.parse(userData);
              if (parsedStorage.state && parsedStorage.state.user) {
                set({ 
                  user: parsedStorage.state.user,
                  isLoading: false 
                });
              } else {
                set({ 
                  user: null,
                  isLoading: false 
                });
              }
            } catch (e) {
              set({ 
                user: null,
                isLoading: false 
              });
            }
          } else {
            set({ 
              user: null,
              isLoading: false 
            });
          }
        }
      },
      
      // Set user manually
      setUser: (user) => set({ user }),
      
      // Update user CV status
      updateUserCV: (hasCV) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, hasCV } });
        }
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      // Only store the user object in localStorage as backup
      partialize: (state) => ({ user: state.user }),
    }
  )
);
