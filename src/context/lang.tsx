'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ko from '../../messages/ko.json';
import en from '../../messages/en.json';

export type Lang = 'ko' | 'en';

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'ko', toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');
  const toggleLang = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'));
  const messages = lang === 'ko' ? ko : en;

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <NextIntlClientProvider locale={lang} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
