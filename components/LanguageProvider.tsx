'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'en' | 'pt';

interface Translations {
  [key: string]: { en: string; pt: string };
}

const translations: Translations = {
  title: {
    en: "I'M CAUAHCM",
    pt: "PRAZER, CAUAHCM",
  },
  description: {
    en: 'FILMMAKER AND VIDEOMAKER SPECIALIZED IN PARTIES AND VIDEOCLIPS. I CREATE IMMERSIVE VISUAL EXPERIENCES DEFINED BY STRONG CINEMATIC DIRECTION, REFINED MOTION, AND A DISTINCT CREATIVE SIGNATURE.',
    pt: 'FILMMAKER E VIDEOMAKER ESPECIALIZADO EM FESTAS E VIDEOCLIPES. CRIO EXPERIÊNCIAS VISUAIS IMERSIVAS DEFINIDAS POR UMA FORTE DIREÇÃO CINEMATOGRÁFICA, MOVIMENTO REFINADO E UMA ASSINATURA DISTINTA.',
  },
  close: {
    en: '[ Close ]',
    pt: '[ Fechar ]',
  },
  whatsappCta: {
    en: '+ INFO ON WHATSAPP',
    pt: '+ INFORMAÇÕES NO WHATSAPP',
  },
  cursorText: {
    en: '  SCROLL  OR  CLICK  •  SCROLL  OR  CLICK  •  ',
    pt: '  ARRASTE  OU  CLIQUE  •  ARRASTE  OU  CLIQUE  •  ',
  },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLang: () => { },
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'pt' : 'en'));
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
