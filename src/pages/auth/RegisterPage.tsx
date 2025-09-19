// Register page component

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    clinicName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock authentication check
  const isAuthenticated = false;
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!formData.agreeToTerms) {
        alert('You must agree to the terms and conditions');
        return;
      }

      // Mock registration logic
      console.log('Registration attempt:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Registration functionality will be implemented with backend integration');
    } catch (error) {
      console.error('Registration error:', error);
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
            Create your clinic account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Clinic Information */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Clinic Information
              </h3>
              <Input
                type="text"
                name="clinicName"
                label="Clinic Name"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Enter your clinic name"
                required
                disabled={isLoading}
              />
            </div>

            {/* Personal Information */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  required
                  disabled={isLoading}
                />
                <Input
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-4 mt-4">
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
                  type="tel"
                  name="phone"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Security
              </h3>
              <div className="space-y-4">
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-3">
            <Checkbox
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              label={
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              }
              disabled={isLoading}
              required
            />
            
            <Checkbox
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleInputChange}
              label="Subscribe to our newsletter for updates and tips"
              disabled={isLoading}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By creating an account, you'll get access to our dental clinic management platform with a 14-day free trial.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}