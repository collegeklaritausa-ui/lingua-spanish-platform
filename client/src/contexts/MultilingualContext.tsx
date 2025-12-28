/**
 * Prize2Pride Lingua Spanish Platform
 * Multilingual Context - Complete Language Support
 * 
 * IMMUTABLE CODE - DO NOT DELETE
 * Created: 2025-12-29
 * 
 * Supported Languages:
 * - English (en)
 * - French (fr)
 * - German (de)
 * - Italian (it)
 * - Arabic (ar) - RTL support
 * - Chinese (zh)
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { TRANSLATIONS, SupportedLanguage, LANGUAGE_METADATA, getTranslation } from '@/const/translations';

interface MultilingualContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string>) => string;
  direction: 'ltr' | 'rtl';
  languageMetadata: typeof LANGUAGE_METADATA;
  availableLanguages: SupportedLanguage[];
  formatNumber: (num: number) => string;
  formatDate: (date: Date) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

const MultilingualContext = createContext<MultilingualContextType | undefined>(undefined);

interface MultilingualProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
}

export const MultilingualProvider: React.FC<MultilingualProviderProps> = ({
  children,
  defaultLanguage = 'en'
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('prize2pride_language');
      if (saved && Object.keys(LANGUAGE_METADATA).includes(saved)) {
        return saved as SupportedLanguage;
      }
      
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(LANGUAGE_METADATA).includes(browserLang)) {
        return browserLang as SupportedLanguage;
      }
    }
    return defaultLanguage;
  });

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('prize2pride_language', lang);
      
      // Update document direction for RTL languages
      document.documentElement.dir = LANGUAGE_METADATA[lang].direction;
      document.documentElement.lang = lang;
    }
  }, []);

  // Set initial direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = LANGUAGE_METADATA[language].direction;
      document.documentElement.lang = language;
    }
  }, [language]);

  // Translation function with parameter interpolation
  const t = useCallback((key: string, params?: Record<string, string>): string => {
    let translation = getTranslation(language, key);
    
    // Interpolate parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), value);
      });
    }
    
    return translation;
  }, [language]);

  // Number formatting based on locale
  const formatNumber = useCallback((num: number): string => {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      ar: 'ar-SA',
      zh: 'zh-CN'
    };
    
    return new Intl.NumberFormat(localeMap[language]).format(num);
  }, [language]);

  // Date formatting based on locale
  const formatDate = useCallback((date: Date): string => {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      ar: 'ar-SA',
      zh: 'zh-CN'
    };
    
    return new Intl.DateTimeFormat(localeMap[language], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }, [language]);

  // Currency formatting
  const formatCurrency = useCallback((amount: number, currency: string = 'USD'): string => {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      ar: 'ar-SA',
      zh: 'zh-CN'
    };
    
    return new Intl.NumberFormat(localeMap[language], {
      style: 'currency',
      currency
    }).format(amount);
  }, [language]);

  const value: MultilingualContextType = {
    language,
    setLanguage,
    t,
    direction: LANGUAGE_METADATA[language].direction,
    languageMetadata: LANGUAGE_METADATA,
    availableLanguages: Object.keys(LANGUAGE_METADATA) as SupportedLanguage[],
    formatNumber,
    formatDate,
    formatCurrency
  };

  return (
    <MultilingualContext.Provider value={value}>
      {children}
    </MultilingualContext.Provider>
  );
};

export const useMultilingual = (): MultilingualContextType => {
  const context = useContext(MultilingualContext);
  if (!context) {
    throw new Error('useMultilingual must be used within a MultilingualProvider');
  }
  return context;
};

// Language Selector Component
export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, languageMetadata, availableLanguages } = useMultilingual();
  
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
      className={`bg-gray-800 border border-yellow-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 ${className}`}
    >
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {languageMetadata[lang].flag} {languageMetadata[lang].nativeName}
        </option>
      ))}
    </select>
  );
};

// RTL-aware wrapper component
interface RTLWrapperProps {
  children: ReactNode;
  className?: string;
}

export const RTLWrapper: React.FC<RTLWrapperProps> = ({ children, className = '' }) => {
  const { direction } = useMultilingual();
  
  return (
    <div 
      dir={direction}
      className={`${direction === 'rtl' ? 'text-right' : 'text-left'} ${className}`}
    >
      {children}
    </div>
  );
};

// Bidirectional text component for mixed content
interface BidiTextProps {
  children: ReactNode;
  spanishText?: boolean;
}

export const BidiText: React.FC<BidiTextProps> = ({ children, spanishText = false }) => {
  // Spanish is always LTR
  if (spanishText) {
    return <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{children}</span>;
  }
  
  return <span style={{ unicodeBidi: 'isolate' }}>{children}</span>;
};

export default MultilingualContext;
