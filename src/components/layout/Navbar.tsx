// Responsive Navbar component with role-based navigation and theme toggle

import { useState } from 'react';
import type { NavbarProps } from '../../types/components';
import type { BaseUser } from '../../types';
import { Button } from '../ui/Button';
import { useThemeToggle } from '../../contexts/ThemeContext';
import { cn, getRoleDisplayName } from '../../utils';

interface DentalNavbarProps extends Omit<NavbarProps, 'items'> {
  user?: BaseUser;
  onSignOut?: () => void;
  isPublic?: boolean;
}

export function Navbar({
  user,
  onSignOut,
  isPublic = false,
  logo,
  actions,
  className,
}: DentalNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useThemeToggle();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={cn(
      'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {logo || (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  DentalOne
                </span>
              </div>
            )}
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {isPublic ? (
              <>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </>
            ) : (
              user && (
                <>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                  {user.role === 'super_admin' && (
                    <NavLink href="/super-admin">Super Admin</NavLink>
                  )}
                  {user.role === 'admin' && (
                    <NavLink href="/admin">Clinic Admin</NavLink>
                  )}
                  <NavLink href="/patients">Patients</NavLink>
                  <NavLink href="/appointments">Appointments</NavLink>
                </>
              )
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User Profile or Auth Buttons */}
            {user ? (
              <UserProfileDropdown user={user} onSignOut={onSignOut} />
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Custom actions */}
            {actions}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-3">
              {isPublic ? (
                <>
                  <MobileNavLink href="#features">Features</MobileNavLink>
                  <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                  <MobileNavLink href="#about">About</MobileNavLink>
                  <MobileNavLink href="#contact">Contact</MobileNavLink>
                  {!user && (
                    <div className="pt-4 space-y-2">
                      <Button variant="ghost" fullWidth>
                        Sign In
                      </Button>
                      <Button fullWidth>
                        Get Started
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                user && (
                  <>
                    <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                    {user.role === 'super_admin' && (
                      <MobileNavLink href="/super-admin">Super Admin</MobileNavLink>
                    )}
                    {user.role === 'admin' && (
                      <MobileNavLink href="/admin">Clinic Admin</MobileNavLink>
                    )}
                    <MobileNavLink href="/patients">Patients</MobileNavLink>
                    <MobileNavLink href="/appointments">Appointments</MobileNavLink>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Navigation Link Component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400',
        isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-300'
      )}
    >
      {children}
    </a>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
    >
      {children}
    </a>
  );
}

// User Profile Dropdown Component
interface UserProfileDropdownProps {
  user: BaseUser;
  onSignOut?: () => void;
}

function UserProfileDropdown({ user, onSignOut }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">{initials}</span>
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {getRoleDisplayName(user.role)}
          </p>
        </div>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeDropdown}
          >
            Profile Settings
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeDropdown}
          >
            Account Settings
          </a>
          <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
          <button
            onClick={() => {
              closeDropdown();
              onSignOut?.();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}