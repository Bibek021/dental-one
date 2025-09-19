// Theme Context for managing light/dark mode

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemeMode, ThemeContextType } from '../types';
import { getFromStorage, setToStorage, getSystemTheme } from '../utils';

const THEME_STORAGE_KEY = 'dental-one-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return getFromStorage(THEME_STORAGE_KEY, defaultTheme);
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false;

      if (mode === 'dark') {
        shouldBeDark = true;
      } else if (mode === 'light') {
        shouldBeDark = false;
      } else {
        // system mode
        shouldBeDark = getSystemTheme() === 'dark';
      }

      setIsDark(shouldBeDark);

      // Apply theme to document
      const root = document.documentElement;
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();

    // Listen for system theme changes when in system mode
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      
      return () => {
        mediaQuery.removeEventListener('change', updateTheme);
      };
    }
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    setToStorage(THEME_STORAGE_KEY, newMode);
  };

  const contextValue: ThemeContextType = {
    mode,
    setMode,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Theme toggle hook for easy theme switching
export function useThemeToggle() {
  const { mode, setMode, isDark } = useTheme();
  
  const toggleTheme = () => {
    if (mode === 'system') {
      setMode(isDark ? 'light' : 'dark');
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };
  
  const setLightMode = () => setMode('light');
  const setDarkMode = () => setMode('dark');
  const setSystemMode = () => setMode('system');
  
  return {
    toggleTheme,
    setLightMode,
    setDarkMode,
    setSystemMode,
    currentMode: mode,
    isDark,
  };
}