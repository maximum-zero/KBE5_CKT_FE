import React, { createContext, useState, useContext, useEffect, useCallback, type ReactNode } from 'react';
import { type ThemeKey, type CustomTheme, themeMap } from '../styles/themes';

interface ThemeContextType {
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  currentTheme: CustomTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    if (typeof window !== 'undefined') {
      const storedThemeKey = localStorage.getItem('themeKey');
      return (storedThemeKey as ThemeKey) || 'blue';
    }
    return 'blue';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeKey', themeKey);
    }
  }, [themeKey]);

  const currentTheme = themeMap[themeKey];

  const value = {
    themeKey,
    setThemeKey: useCallback((key: ThemeKey) => {
      setThemeKey(key);
    }, []),
    currentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// useTheme 훅 (컨텍스트를 편리하게 사용하기 위함)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};
