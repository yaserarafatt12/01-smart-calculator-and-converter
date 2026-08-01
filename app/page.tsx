'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header, { TabType } from '@/components/ui/Header';
import Display, { ResultCard } from '@/components/calculator/Display';
import Keypad from '@/components/calculator/Keypad';
import ErrorHint from '@/components/calculator/ErrorHint';
import HistoryPanel from '@/components/history/HistoryPanel';
import CompleteConverterView from '@/components/converter/CompleteConverterView';
import ScientificKeypad from '@/components/calculator/ScientificKeypad';
import ResultDetailModal from '@/components/calculator/ResultDetailModal';

import { ApplicationMode, AngleMode, CalculationResult } from '@/lib/calculator/types';
import { evaluateExpression } from '@/lib/calculator/math-parser';
import { getFormattedError, FormattedError } from '@/lib/calculator/error-messages';
import { Language, detectBrowserLanguage, TRANSLATIONS } from '@/lib/i18n/translations';
import {
  getStoredMemory,
  saveMemory,
  clearMemory,
  getStoredAns,
  saveAns,
} from '@/lib/calculator/memory-storage';
import {
  getHistory,
  addHistory,
  removeHistoryItem,
  clearHistory,
  HistoryItem,
} from '@/lib/storage/history-storage';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<Language>('en'); // Default to English, with browser auto-detect
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  const [appMode, setAppMode] = useState<ApplicationMode>('default');
  const [angleMode, setAngleMode] = useState<AngleMode>('degree');

  // Clean initial state for new users (no pre-filled placeholder calculations)
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<number | string | null>(null);
  const [calcResultObj, setCalcResultObj] = useState<CalculationResult | null>(null);

  const [formattedError, setFormattedError] = useState<FormattedError | null>(null);
  const [history, setHistoryState] = useState<HistoryItem[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showResultDetailModal, setShowResultDetailModal] = useState<boolean>(false);

  const [memory, setMemoryState] = useState<{ value: number; hasValue: boolean }>({
    value: 0,
    hasValue: false,
  });

  const t = TRANSLATIONS[language];

  // Load persistent mode, theme, and language on mount with browser language auto-detection
  useEffect(() => {
    setHistoryState(getHistory());
    setMemoryState(getStoredMemory());
    setLanguage(detectBrowserLanguage());

    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('smart_calc_app_mode') as ApplicationMode;
      if (savedMode === 'default' || savedMode === 'complete') {
        setAppMode(savedMode);
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const applyTheme = (isDark: boolean) => {
        setTheme(isDark ? 'dark' : 'light');
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };

      applyTheme(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleModeChange = (mode: ApplicationMode) => {
    setAppMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_calc_app_mode', mode);
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'id' : 'en';
    setLanguage(nextLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_calc_lang', nextLang);
    }
  };

  // Evaluate calculation
  const handleCalculate = useCallback(() => {
    if (!expression.trim()) {
      const err = getFormattedError({ success: false, error: 'EMPTY_INPUT', index: 0 });
      setFormattedError(err);
      setResult(null);
      setCalcResultObj(null);
      return;
    }

    const ansVal = getStoredAns();
    const evaluated = evaluateExpression(expression, angleMode, ansVal);

    if (evaluated.error) {
      setResult('Error');
      setCalcResultObj(null);
      const err = getFormattedError({ success: false, error: 'SYNTAX_ERROR', message: evaluated.error, index: 0 });
      setFormattedError(err);
    } else {
      setResult(evaluated.formattedValue);
      setCalcResultObj(evaluated);
      setFormattedError(null);

      // Save Ans and History
      saveAns(evaluated.rawValue);
      const updatedHistory = addHistory(expression, evaluated.formattedValue);
      setHistoryState(updatedHistory);
    }
  }, [expression, angleMode]);

  // Keypad key press dispatcher
  const handleKeyPress = useCallback(
    (key: string) => {
      setFormattedError(null);

      if (key === 'AC') {
        setExpression('');
        setResult(null);
        setCalcResultObj(null);
        setFormattedError(null);
        return;
      }

      if (key === 'C') {
        setExpression('');
        setFormattedError(null);
        return;
      }

      if (key === 'BACKSPACE') {
        setExpression((prev) => prev.slice(0, -1));
        return;
      }

      if (key === '=') {
        handleCalculate();
        return;
      }

      setExpression((prev) => prev + key);
    },
    [handleCalculate]
  );

  // Memory Handlers
  const handleMemoryClear = () => {
    const next = clearMemory();
    setMemoryState(next);
  };

  const handleMemoryRecall = () => {
    if (memory.hasValue) {
      setExpression((prev) => prev + String(memory.value));
    }
  };

  const handleMemoryAdd = () => {
    const num = typeof result === 'number' ? result : parseFloat(String(result)) || 0;
    const next = saveMemory(memory.value + num);
    setMemoryState(next);
  };

  const handleMemorySubtract = () => {
    const num = typeof result === 'number' ? result : parseFloat(String(result)) || 0;
    const next = saveMemory(memory.value - num);
    setMemoryState(next);
  };

  const handleInsertAns = () => {
    setExpression((prev) => prev + 'Ans');
  };

  // Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'select' || targetTag === 'textarea') {
        return;
      }

      if (activeTab !== 'calculator') return;

      const key = e.key;

      if (key >= '0' && key <= '9') {
        handleKeyPress(key);
      } else if (['+', '-', '*', '/', '(', ')', '.', '%', '^', '!'].includes(key)) {
        handleKeyPress(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        handleKeyPress('=');
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (key === 'Escape') {
        e.preventDefault();
        handleKeyPress('AC');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, handleKeyPress]);

  // History Actions
  const handleSelectExpression = (expr: string) => {
    setExpression(expr);
    setActiveTab('calculator');
    setShowHistoryModal(false);
  };

  const handleSelectResult = (res: string | number) => {
    setExpression((prev) => prev + String(res));
    setActiveTab('calculator');
    setShowHistoryModal(false);
  };

  const handleRemoveHistoryItem = (id: string) => {
    const updated = removeHistoryItem(id);
    setHistoryState(updated);
  };

  const handleClearAllHistory = () => {
    clearHistory();
    setHistoryState([]);
  };

  return (
    <main className="min-h-screen sm:py-8 sm:px-4 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* 3D Ambient Background Spheres */}
      <div className="hidden sm:block absolute w-96 h-96 rounded-full bg-indigo-500/20 dark:bg-violet-600/30 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="hidden sm:block absolute w-80 h-80 rounded-full bg-purple-500/20 dark:bg-indigo-600/25 blur-3xl -bottom-20 -right-20 pointer-events-none" />

      {/* Phone Chassis Container with Ultra Smooth Transition */}
      <div
        className={`w-full min-h-screen ${
          activeTab === 'converter'
            ? 'sm:min-h-[750px] sm:max-w-[430px]'
            : appMode === 'complete'
            ? 'sm:min-h-[820px] sm:max-w-[430px]'
            : 'sm:min-h-[720px] sm:max-w-[420px]'
        } sm:rounded-[44px] phone-chassis p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10`}
      >
        {/* Top Header Bar with Language Switcher */}
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          appMode={appMode}
          onModeChange={handleModeChange}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onToggleHistory={() => setShowHistoryModal((prev) => !prev)}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        />

        {/* Main Content View with Buttery Smooth Cross-Fade Slide Tab Animation */}
        <div className="flex-1 flex flex-col justify-between my-auto relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {/* CALCULATOR TAB VIEW */}
          <div
            className={`w-full flex flex-col justify-between h-full flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
              activeTab === 'calculator'
                ? 'opacity-100 scale-100 translate-x-0 relative z-10'
                : 'opacity-0 scale-95 -translate-x-4 pointer-events-none absolute inset-0 z-0 h-0 overflow-hidden'
            }`}
          >
            {/* TOP SECTION: Expression Input */}
            <div className="w-full">
              <Display
                expression={expression}
                result={result}
                errorIndex={formattedError?.index}
                isError={Boolean(formattedError)}
              />
            </div>

            {/* BOTTOM SECTION: Mode Switcher Pill + Result Card ALWAYS Sitting Directly Above Keypad */}
            <div className="w-full mt-auto space-y-2 pt-2">
              <ErrorHint
                error={formattedError}
                onDismiss={() => setFormattedError(null)}
              />

              {/* Mode Switcher Pill: Positioned DIRECTLY ABOVE HASIL CARD */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 bg-slate-200/90 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-700/80 shadow-sm transition-all duration-300">
                  <button
                    type="button"
                    id="mode-pill-default"
                    onClick={() => handleModeChange('default')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 ease-out btn-press-effect ${
                      appMode === 'default'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-md font-black scale-[1.02]'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t.defaultMode}
                  </button>
                  <button
                    type="button"
                    id="mode-pill-complete"
                    onClick={() => handleModeChange('complete')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 ease-out btn-press-effect ${
                      appMode === 'complete'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 font-black scale-[1.02]'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t.completeMode}
                  </button>
                </div>

                {appMode === 'complete' && memory.hasValue && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-[10px] font-black animate-pulse">
                    {t.memoryActive}
                  </span>
                )}
              </div>

              {/* Result Card: Sitting Directly Below Mode Switcher Pill & Above Keypad Buttons */}
              <ResultCard
                result={result}
                isError={Boolean(formattedError)}
                onClickDetail={() => {
                  if (calcResultObj) setShowResultDetailModal(true);
                }}
              />

              {/* Dynamic Keypad View: Complete Mode (Standard Scientific Hierarchy) vs Default Mode */}
              {appMode === 'complete' ? (
                <div className="animate-in fade-in duration-300">
                  <ScientificKeypad
                    onKeyPress={handleKeyPress}
                    angleMode={angleMode}
                    onToggleAngleMode={() =>
                      setAngleMode((prev) => (prev === 'degree' ? 'radian' : 'degree'))
                    }
                    onMemoryClear={handleMemoryClear}
                    onMemoryRecall={handleMemoryRecall}
                    onMemoryAdd={handleMemoryAdd}
                    onMemorySubtract={handleMemorySubtract}
                    onInsertAns={handleInsertAns}
                    memoryHasValue={memory.hasValue}
                  />
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <Keypad
                    onKeyPress={handleKeyPress}
                    onOpenConverter={() => setActiveTab('converter')}
                    appMode={appMode}
                  />
                </div>
              )}
            </div>
          </div>

          {/* CONVERTER TAB VIEW */}
          <div
            className={`w-full pt-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
              activeTab === 'converter'
                ? 'opacity-100 scale-100 translate-x-0 relative z-10'
                : 'opacity-0 scale-95 translate-x-4 pointer-events-none absolute inset-0 z-0 h-0 overflow-hidden'
            }`}
          >
            <CompleteConverterView />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-4 pt-2 text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium border-t border-slate-200/50 dark:border-slate-800/40">
          Smart Calculator & Unit Converter &copy; 2026. Mode: {appMode === 'complete' ? t.completeMode : t.defaultMode}.
        </footer>

        {/* History Modal Overlay */}
        {showHistoryModal && (
          <div
            onClick={() => setShowHistoryModal(false)}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-[#121519]/95 backdrop-blur-2xl rounded-t-[36px] p-6 max-h-[85%] overflow-y-auto border-t border-white/80 dark:border-slate-700/80 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-250 cursor-default"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
                  {t.historyTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 btn-press-effect"
                >
                  {t.close}
                </button>
              </div>
              <HistoryPanel
                history={history}
                onSelectExpression={handleSelectExpression}
                onSelectResult={handleSelectResult}
                onRemoveItem={handleRemoveHistoryItem}
                onClearAll={handleClearAllHistory}
                language={language}
              />
            </div>
          </div>
        )}

        {/* Result Detail Modal */}
        <ResultDetailModal
          isOpen={showResultDetailModal}
          onClose={() => setShowResultDetailModal(false)}
          result={calcResultObj}
          onUseAsInput={(val) => setExpression((prev) => prev + val)}
        />
      </div>
    </main>
  );
}
