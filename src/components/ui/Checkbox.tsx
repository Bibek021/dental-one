// Reusable Checkbox component with indeterminate state support

import { useEffect, useRef } from 'react';
import type { CheckboxProps } from '../../types/components';
import { cn } from '../../utils';

export function Checkbox({
  label,
  error,
  indeterminate = false,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2)}`;
  const hasError = Boolean(error);

  // Handle indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            ref={checkboxRef}
            id={checkboxId}
            type="checkbox"
            className={cn(
              // Base styles
              'h-4 w-4 rounded border transition-colors cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'dark:focus:ring-offset-gray-900',
              // Colors
              hasError
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600',
              // Checked state
              'checked:bg-blue-600 checked:border-blue-600',
              'dark:checked:bg-blue-500 dark:checked:border-blue-500',
              // Disabled state
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          />

          {/* Custom checkmark for better styling */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className={cn(
                'w-3 h-3 text-white opacity-0 transition-opacity',
                (props.checked || indeterminate) && 'opacity-100'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {indeterminate ? (
                <rect x="4" y="9" width="12" height="2" />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </div>
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'ml-3 text-sm cursor-pointer select-none',
              hasError
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300',
              props.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// Radio button component with similar styling
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export function Radio({
  label,
  error,
  className,
  id,
  ...props
}: RadioProps) {
  const radioId = id || `radio-${Math.random().toString(36).substring(2)}`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          id={radioId}
          type="radio"
          className={cn(
            // Base styles
            'h-4 w-4 border transition-colors cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-900',
            // Colors
            hasError
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600',
            // Checked state
            'checked:bg-blue-600 checked:border-blue-600',
            'dark:checked:bg-blue-500 dark:checked:border-blue-500',
            // Disabled state
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {label && (
          <label
            htmlFor={radioId}
            className={cn(
              'ml-3 text-sm cursor-pointer select-none',
              hasError
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-700 dark:text-gray-300',
              props.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// Radio Group component for managing multiple radio buttons
export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  label?: string;
  error?: string;
  direction?: 'row' | 'column';
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  label,
  error,
  direction = 'column',
  className,
}: RadioGroupProps) {
  const hasError = Boolean(error);

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <span className={cn(
          'block text-sm font-medium mb-2',
          hasError
            ? 'text-red-700 dark:text-red-400'
            : 'text-gray-700 dark:text-gray-300'
        )}>
          {label}
        </span>
      )}

      <div className={cn(
        'flex gap-4',
        direction === 'column' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            checked={value === option.value}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(option.value);
              }
            }}
          />
        ))}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}