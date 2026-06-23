'use client';
import React, { createContext, useContext, useState } from 'react';

type Lang = 'es' | 'en';

const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'es',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
