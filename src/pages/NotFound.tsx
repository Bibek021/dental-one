// 404 Not Found page component

import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" className="w-full">
              Go Back Home
            </Button>
          </Link>
          
          <Link to="/contact">
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            If you believe this is an error, please{' '}
            <Link 
              to="/contact" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}