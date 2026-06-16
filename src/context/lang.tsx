'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'ko', toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');
  const toggleLang = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'));
  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
