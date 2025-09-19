// Reusable Input component with label, error handling, and icons

import type { InputProps } from '../../types/components';
import { cn } from '../../utils';

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(2)}`;
  const hasError = Boolean(error);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className={cn('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium mb-1',
            hasError
              ? 'text-red-700 dark:text-red-400'
              : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 dark:text-gray-500">
              {leftIcon}
            </span>
          </div>
        )}

        <input
          id={inputId}
          className={cn(
            // Base styles
            'block w-full border rounded-md shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'dark:bg-gray-800 dark:text-gray-100',
            // Size styles
            sizeClasses[size],
            // Icon padding
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            // Error styles
            hasError
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            // Disabled styles
            props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400 dark:text-gray-500">
              {rightIcon}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

// Textarea component with similar styling
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export function Textarea({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2)}`;
  const hasError = Boolean(error);

  const resizeClasses = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y',
  };

  return (
    <div className={cn('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={textareaId}
          className={cn(
            'block text-sm font-medium mb-1',
            hasError
              ? 'text-red-700 dark:text-red-400'
              : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        className={cn(
          // Base styles
          'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'dark:bg-gray-800 dark:text-gray-100',
          // Resize
          resizeClasses[resize],
          // Error styles
          hasError
            ? 'border-red-300 dark:border-red-600'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
          // Disabled styles
          props.disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900',
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}