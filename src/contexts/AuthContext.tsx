// Authentication Context for managing user authentication state

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { BaseUser, UserRole } from '../types';
import { hasPermission } from '../utils';
import { allUsers } from '../data/users';

interface AuthContextType {
  user: BaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Storage keys
const AUTH_STORAGE_KEY = 'dental-one-auth-user';
const AUTH_TOKEN_KEY = 'dental-one-auth-token';

// Mock credentials for demo purposes
const DEMO_CREDENTIALS = {
  'super@admin.com': { password: 'demo123', userId: 'super-admin-001' },
  'admin@clinic.com': { password: 'demo123', userId: 'admin-001' },
  'doctor@clinic.com': { password: 'demo123', userId: 'doctor-001' },
  'staff@clinic.com': { password: 'demo123', userId: 'staff-001' },
  'receptionist@clinic.com': { password: 'demo123', userId: 'receptionist-001' },
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        const savedToken = localStorage.getItem(AUTH_TOKEN_KEY);

        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          // In a real app, you would validate the token with the server
          setUser(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check demo credentials
      const credentials = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS];
      
      if (!credentials || credentials.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Find user data
      const userData = allUsers.find(u => u.id === credentials.userId);
      
      if (!userData) {
        return { success: false, error: 'User not found' };
      }

      // Mock token generation
      const token = `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Save auth state
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear auth state
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
  };

  const hasRole = (role: UserRole): boolean => {
    return user ? hasPermission(user.role, role) : false;
  };

  const isAuthenticated = Boolean(user);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Demo user credentials for easy testing
export const DEMO_USERS = [
  { email: 'super@admin.com', password: 'demo123', role: 'Super Admin' },
  { email: 'admin@clinic.com', password: 'demo123', role: 'Clinic Admin' },
  { email: 'doctor@clinic.com', password: 'demo123', role: 'Doctor' },
  { email: 'staff@clinic.com', password: 'demo123', role: 'Staff' },
  { email: 'receptionist@clinic.com', password: 'demo123', role: 'Receptionist' },
];