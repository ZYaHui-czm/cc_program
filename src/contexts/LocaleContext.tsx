import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/types';

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LocaleContext = createContext<LocaleContextType>({
  language: 'zh',
  setLanguage: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('memo-language');
    return stored === 'zh' || stored === 'en' ? stored : 'zh';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('memo-language', language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language, i18n]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <LocaleContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
}
