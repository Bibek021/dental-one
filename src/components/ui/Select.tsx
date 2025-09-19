// Reusable Select/Dropdown component with search functionality

import { useState, useRef, useEffect } from 'react';
import type { SelectProps } from '../../types/components';
import { cn } from '../../utils';

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get selected option(s) for display
  const selectedOptions = options.filter(option =>
    multiple
      ? Array.isArray(value) && value.includes(option.value)
      : option.value === value
  );

  const displayValue = selectedOptions.length > 0
    ? multiple
      ? selectedOptions.map(opt => opt.label).join(', ')
      : selectedOptions[0].label
    : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleOptionClick = (optionValue: string | number) => {
    if (multiple) {
      const currentValues = (Array.isArray(value) ? value : []) as (string | number)[];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues as any);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className={cn(
          'block text-sm font-medium mb-1',
          hasError
            ? 'text-red-700 dark:text-red-400'
            : 'text-gray-700 dark:text-gray-300'
        )}>
          {label}
        </label>
      )}

      <div ref={selectRef} className={cn('relative', className)}>
        <div
          className={cn(
            'flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'dark:bg-gray-800 dark:text-gray-100',
            hasError
              ? 'border-red-300 dark:border-red-600'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
          )}
          onClick={toggleDropdown}
        >
          <span className={cn(
            'block truncate',
            selectedOptions.length === 0 && 'text-gray-400 dark:text-gray-500'
          )}>
            {displayValue}
          </span>
          
          <svg
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              isOpen && 'transform rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            <div className="max-h-48 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(option.value)
                    : option.value === value;

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        'px-3 py-2 cursor-pointer text-sm transition-colors',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        isSelected && 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      onClick={() => !option.disabled && handleOptionClick(option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.label}</span>
                        {multiple && isSelected && (
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
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