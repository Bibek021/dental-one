// Mobile Sidebar component for responsive navigation

import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types/components';
import { cn } from '../../utils';
import { useAuth } from '../../contexts/AuthContext';

interface MobileSidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  logo?: React.ReactNode;
}

export function MobileSidebar({ items, isOpen, onClose, logo }: MobileSidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Sidebar */}
      <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 md:hidden">
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {logo || (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                DentalOne
              </span>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <MobileNavItem 
              key={item.id}
              item={item}
              isActive={location.pathname === item.href}
              onClose={onClose}
            />
          ))}
        </nav>

        {/* User Info */}
        {user && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

// Mobile Navigation Item Component
interface MobileNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
}

function MobileNavItem({ item, isActive, onClose }: MobileNavItemProps) {
  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    onClose();
  };

  const itemClasses = cn(
    'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left',
    isActive
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
  );

  const content = (
    <>
      {item.icon && (
        <div className="w-5 h-5 flex-shrink-0">
          {item.icon}
        </div>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {item.badge}
        </span>
      )}
    </>
  );

  if (item.href) {
    return (
      <Link to={item.href} className={itemClasses} onClick={onClose}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={itemClasses}>
      {content}
    </button>
  );
}