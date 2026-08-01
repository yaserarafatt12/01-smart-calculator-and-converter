'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 btn-press-effect ${
        isDark
          ? 'bg-slate-800/90 text-amber-300 border-slate-700 hover:bg-slate-700 shadow-inner'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
      }`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform transform rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700 transition-transform transform -rotate-12 hover:rotate-0" />
        )}
      </div>
      <span className="hidden sm:inline font-medium">
        {isDark ? 'Mode Terang' : 'Mode Gelap'}
      </span>
    </button>
  );
};

export default ThemeToggle;
