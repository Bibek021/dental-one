// Login page component

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { useAuth } from '../../contexts/AuthContext';

export function LoginPage() {

  const { isAuthenticated, login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already authenticated
  if (isAuthenticated && user) {
    // Redirect based on user role
    const redirectPath = user.role === 'super_admin' ? '/super-admin' : 
                        user.role === 'doctor' ? '/doctor' : 
                        '/admin';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Login successful - navigation will be handled by the redirect above
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link 
              to="/register" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
            
            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              label="Remember me"
              disabled={isLoading}
            />

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          {/* Demo Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Demo Accounts
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'super@admin.com',
                    password: 'demo123',
                    rememberMe: false
                  });
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Super Admin Demo
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'admin@clinic.com',
                    password: 'demo123',
                    rememberMe: false
                  });
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Clinic Admin Demo
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'doctor@clinic.com',
                    password: 'demo123',
                    rememberMe: false
                  });
                }}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Doctor Demo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}