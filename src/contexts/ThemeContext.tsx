import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme } from '@/types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('memo-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('memo-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#2563eb');
    const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleMeta) appleMeta.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
