'use client';

import React from 'react';
import { History, Sun, Moon, ArrowLeftRight, Calculator, Globe } from 'lucide-react';
import { ApplicationMode } from '@/lib/calculator/types';
import { Language, TRANSLATIONS } from '@/lib/i18n/translations';

export type TabType = 'calculator' | 'converter';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  appMode: ApplicationMode;
  onModeChange: (mode: ApplicationMode) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleHistory: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  onToggleHistory,
  language,
  onToggleLanguage,
}) => {
  const isDark = theme === 'dark';
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full flex items-center justify-between gap-1.5 sm:gap-3 pb-3 mb-2 border-b border-slate-200/80 dark:border-slate-800/80 select-none">
      {/* Top Center: Clean Floating Tab Switcher */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          id="tab-calculator"
          onClick={() => onTabChange('calculator')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 btn-press-effect ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent'
          }`}
        >
          <Calculator strokeWidth={2.5} className="w-4 h-4" />
          <span>{t.calculator}</span>
        </button>
        <button
          type="button"
          id="tab-converter"
          onClick={() => onTabChange('converter')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 btn-press-effect ${
            activeTab === 'converter'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent'
          }`}
        >
          <ArrowLeftRight strokeWidth={2.5} className="w-4 h-4" />
          <span>{t.converter}</span>
        </button>
      </div>

      {/* Top Right: Language, History & Theme */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Language Switcher Button */}
        <button
          type="button"
          onClick={onToggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all duration-200 btn-press-effect text-xs font-black"
          title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
        >
          <Globe strokeWidth={2.5} className="w-3.5 h-3.5" />
          <span>{language.toUpperCase()}</span>
        </button>

        <button
          type="button"
          onClick={onToggleHistory}
          className="p-2 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 border border-slate-300/80 dark:border-slate-700/80 transition-all duration-200 btn-press-effect"
          title={t.history}
        >
          <History strokeWidth={2.5} className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-500/30 transition-all duration-200 btn-press-effect"
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? <Sun strokeWidth={2.5} className="w-4 h-4 text-amber-400" /> : <Moon strokeWidth={2.5} className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default Header;
