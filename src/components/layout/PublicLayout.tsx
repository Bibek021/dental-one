// Public layout wrapper for non-authenticated pages

import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar isPublic />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Simple footer component
function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DentalOne
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Transform your dental practice with our comprehensive SaaS platform. 
              Manage patients, appointments, treatments, and billing all in one place.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
              <li><a href="/demo" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              <li><a href="#support" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
            © 2025 DentalOne. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}