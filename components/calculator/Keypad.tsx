'use client';

import React from 'react';
import { Delete } from 'lucide-react';
import { ApplicationMode } from '@/lib/calculator/types';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onOpenConverter?: () => void;
  appMode?: ApplicationMode;
}

interface KeyConfig {
  label: React.ReactNode;
  value: string;
  type: 'number' | 'operator' | 'action' | 'equals';
  colSpan?: string;
  keyboardHint?: string;
  testId?: string;
  onClickCustom?: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  appMode = 'default',
}) => {
  const isComplete = appMode === 'complete';

  const keys: KeyConfig[] = [
    // Row 1: AC and C side-by-side!
    { label: 'AC', value: 'AC', type: 'action', testId: 'btn-ac' },
    { label: 'C', value: 'C', type: 'action', testId: 'btn-c' },
    { label: <Delete className="w-5 h-5 mx-auto" />, value: 'BACKSPACE', type: 'action', testId: 'btn-backspace' },
    { label: '÷', value: '/', type: 'operator', keyboardHint: '/', testId: 'btn-divide' },

    // Row 2
    { label: '7', value: '7', type: 'number', testId: 'btn-7' },
    { label: '8', value: '8', type: 'number', testId: 'btn-8' },
    { label: '9', value: '9', type: 'number', testId: 'btn-9' },
    { label: '×', value: '*', type: 'operator', keyboardHint: '*', testId: 'btn-multiply' },

    // Row 3
    { label: '4', value: '4', type: 'number', testId: 'btn-4' },
    { label: '5', value: '5', type: 'number', testId: 'btn-5' },
    { label: '6', value: '6', type: 'number', testId: 'btn-6' },
    { label: '-', value: '-', type: 'operator', keyboardHint: '-', testId: 'btn-subtract' },

    // Row 4
    { label: '1', value: '1', type: 'number', testId: 'btn-1' },
    { label: '2', value: '2', type: 'number', testId: 'btn-2' },
    { label: '3', value: '3', type: 'number', testId: 'btn-3' },
    { label: '+', value: '+', type: 'operator', keyboardHint: '+', testId: 'btn-add' },

    // Row 5: 0, Dot, and Wide Equals (= col-span-2)
    { label: '0', value: '0', type: 'number', testId: 'btn-0' },
    { label: '.', value: '.', type: 'number', testId: 'btn-dot' },
    { label: '=', value: '=', type: 'equals', colSpan: 'col-span-2', keyboardHint: '↵', testId: 'btn-equals' },
  ];

  const getKeyStyle = (type: KeyConfig['type']) => {
    switch (type) {
      case 'number':
        return 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 font-extrabold shadow-sm border border-slate-200/80 dark:border-slate-700/60';
      case 'operator':
        return 'bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-lg shadow-indigo-600/30 border border-indigo-400/30';
      case 'equals':
        return 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold shadow-lg shadow-indigo-500/40 border border-indigo-400/40';
      case 'action':
        return 'bg-rose-500/10 dark:bg-rose-500/20 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-400 font-extrabold border border-rose-500/20';
    }
  };

  return (
    <div id="calculator-keypad" className="w-full mt-auto pt-1">
      {/* Keypad Grid: Smooth Spring Transition when morphing button height */}
      <div className={`grid grid-cols-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isComplete ? 'gap-1.5 sm:gap-2' : 'gap-3 sm:gap-3.5'}`}>
        {keys.map((key, idx) => (
          <button
            key={`${key.value}-${idx}`}
            id={key.testId}
            data-testid={key.testId}
            type="button"
            onClick={() => {
              if (key.onClickCustom) {
                key.onClickCustom();
              } else {
                onKeyPress(key.value);
              }
            }}
            className={`relative ${
              isComplete ? 'h-11 sm:h-12 text-lg sm:text-xl' : 'h-14 sm:h-16 text-2xl sm:text-3xl'
            } rounded-2xl font-extrabold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] btn-press-effect flex items-center justify-center select-none ${
              key.colSpan || ''
            } ${getKeyStyle(key.type)}`}
          >
            {key.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keypad;
