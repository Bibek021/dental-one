// Reusable Button component with variants and TypeScript support

import type { ButtonProps } from '../../types/components';
import { cn } from '../../utils';

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-transparent dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  outline: 'bg-transparent hover:bg-gray-50 text-gray-900 border-gray-300 dark:hover:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 border-transparent dark:hover:bg-gray-800 dark:text-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        // Full width
        fullWidth && 'w-full',
        // Disabled styles
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner
          size={size}
          className={cn('mr-2', !children && 'mr-0')}
        />
      )}
      
      {!isLoading && leftIcon && (
        <span className={cn('mr-2', !children && 'mr-0')}>
          {leftIcon}
        </span>
      )}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className={cn('ml-2', !children && 'ml-0')}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}

// Loading spinner component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={cn(
        'animate-spin',
        sizeClasses[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}