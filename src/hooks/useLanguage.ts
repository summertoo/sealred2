import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '../locales';

interface LanguageContextType {
  currentLanguage: Language;
  t: (key: TranslationKey) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'zhCN';
  });

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'zhCN' ? 'enUS' : 'zhCN';
    setLanguage(newLanguage);
  };

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', currentLanguage);
    }
  }, [currentLanguage]);

  const contextValue = {
    currentLanguage,
    t,
    toggleLanguage,
    setLanguage
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: contextValue },
    children
  );
};
