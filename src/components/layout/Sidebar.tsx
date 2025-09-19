// Sidebar component for admin dashboards

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types/components';
import { cn } from '../../utils';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  items: NavItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  logo?: React.ReactNode;
}

export function Sidebar({ items, isCollapsed = false, onToggle, logo }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <div className={cn(
      'flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-200',
      'hidden md:flex', // Hide on mobile, show on desktop
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo/Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          logo || (
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
          )
        )}
        
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              isActive={location.pathname === item.href}
            />
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      {!isCollapsed && user && (
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
  );
}

// Individual sidebar item component
interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isActive: boolean;
}

function SidebarItem({ item, isCollapsed, isActive }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !isCollapsed) {
      setIsExpanded(!isExpanded);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const ItemContent = () => (
    <>
      {item.icon && (
        <div className="w-5 h-5 flex-shrink-0">
          {item.icon}
        </div>
      )}
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <svg
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-90'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </>
      )}
    </>
  );

  const itemClasses = cn(
    'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
    isActive
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
    isCollapsed && 'justify-center'
  );

  return (
    <li>
      {item.href && !hasChildren ? (
        <Link to={item.href} className={itemClasses}>
          <ItemContent />
        </Link>
      ) : (
        <button onClick={handleClick} className={cn(itemClasses, 'w-full')}>
          <ItemContent />
        </button>
      )}
      
      {/* Children items */}
      {hasChildren && !isCollapsed && isExpanded && (
        <ul className="mt-2 ml-6 space-y-1">
          {item.children!.map((child) => (
            <li key={child.id}>
              <Link
                to={child.href || '#'}
                className="flex items-center space-x-2 px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {child.icon && <div className="w-4 h-4">{child.icon}</div>}
                <span>{child.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}