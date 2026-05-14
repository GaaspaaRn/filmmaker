'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="group relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:border-white/50 transition-all duration-300 cursor-pointer"
      aria-label="Toggle language"
    >
      <span
        className={`font-sans text-[11px] tracking-widest font-semibold transition-colors duration-300 ${
          lang === 'en' ? 'text-white' : 'text-white/30'
        }`}
      >
        EN
      </span>
      <span className="text-white/30 text-[11px] font-sans">/</span>
      <span
        className={`font-sans text-[11px] tracking-widest font-semibold transition-colors duration-300 ${
          lang === 'pt' ? 'text-white' : 'text-white/30'
        }`}
      >
        PT
      </span>
    </button>
  );
}
