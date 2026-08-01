'use client';

import React, { useState } from 'react';
import { Delete } from 'lucide-react';
import { AngleMode } from '@/lib/calculator/types';

interface ScientificKeypadProps {
  onKeyPress: (key: string) => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onInsertAns: () => void;
  memoryHasValue: boolean;
}

export const ScientificKeypad: React.FC<ScientificKeypadProps> = ({
  onKeyPress,
  angleMode,
  onToggleAngleMode,
  onMemoryClear,
  onMemoryRecall,
  onInsertAns,
}) => {
  const [isSecondMode, setIsSecondMode] = useState(false);

  return (
    <div className="w-full">
      {/* 4 Columns Grid with Standard Scientific Calculator Hierarchy */}
      <div className="grid grid-cols-4 gap-1.5 font-sans">
        {/* ROW 1: Clear & Erase Actions + 2nd Mode (AT THE TOP) */}
        <button
          type="button"
          onClick={() => onKeyPress('AC')}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 border border-rose-500/20 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          AC
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('C')}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 border border-rose-500/20 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          C
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('BACKSPACE')}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 border border-rose-500/20 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          <Delete className="w-5 h-5 mx-auto" />
        </button>

        {/* 2nd Button with Prominent Active Indicator */}
        <button
          type="button"
          onClick={() => setIsSecondMode(!isSecondMode)}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect flex items-center justify-center gap-1.5 border shadow-sm ${
            isSecondMode
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/40 font-black scale-[1.03]'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border-slate-300/80 dark:border-slate-700/60'
          }`}
          title={isSecondMode ? 'Mode 2nd Aktif (Fungsi Invers)' : 'Aktifkan Mode 2nd'}
        >
          {isSecondMode && <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />}
          <span>2nd</span>
        </button>

        {/* ROW 2: Angle Mode, Memory & Ans */}
        <button
          type="button"
          onClick={onToggleAngleMode}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-500/30 transition-all btn-press-effect border border-indigo-500/40 flex items-center justify-center shadow-sm"
        >
          {angleMode === 'degree' ? 'DEG' : 'RAD'}
        </button>

        <button
          type="button"
          onClick={onMemoryClear}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-200/90 dark:bg-slate-800/90 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all btn-press-effect border border-slate-300/80 dark:border-slate-700/60 flex items-center justify-center shadow-sm"
          title="Memory Clear"
        >
          MC
        </button>

        <button
          type="button"
          onClick={onMemoryRecall}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-200/90 dark:bg-slate-800/90 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-all btn-press-effect border border-slate-300/80 dark:border-slate-700/60 flex items-center justify-center shadow-sm"
          title="Memory Recall"
        >
          MR
        </button>

        <button
          type="button"
          onClick={onInsertAns}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-indigo-600 text-white hover:bg-indigo-700 transition-all btn-press-effect shadow-md shadow-indigo-600/30 flex items-center justify-center border border-indigo-400/40"
          title="Hasil Perhitungan Terakhir"
        >
          Ans
        </button>

        {/* ROW 3: Parentheses, Percent & Root / Power */}
        <button
          type="button"
          onClick={() => onKeyPress('(')}
          className="h-11 sm:h-12 rounded-2xl text-sm sm:text-base font-bold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          (
        </button>

        <button
          type="button"
          onClick={() => onKeyPress(')')}
          className="h-11 sm:h-12 rounded-2xl text-sm sm:text-base font-bold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          )
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('%')}
          className="h-11 sm:h-12 rounded-2xl text-sm sm:text-base font-bold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          %
        </button>

        {/* √x transform to x² when 2nd active */}
        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? '^2' : '√(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? 'x²' : '√x'}
        </button>

        {/* ROW 4: Trigonometry & Logarithm (Transforms on 2nd) */}
        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? 'asin(' : 'sin(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect border flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 font-black'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? 'sin⁻¹' : 'sin'}
        </button>

        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? 'acos(' : 'cos(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect border flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 font-black'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? 'cos⁻¹' : 'cos'}
        </button>

        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? 'atan(' : 'tan(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect border flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 font-black'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? 'tan⁻¹' : 'tan'}
        </button>

        {/* log transforms to 10ˣ when 2nd active */}
        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? '10^(' : 'log(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect border flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 font-black'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? '10ˣ' : 'log'}
        </button>

        {/* ROW 5: Ln, Constants & Exponent (Transforms on 2nd) */}
        {/* ln transforms to eˣ when 2nd active */}
        <button
          type="button"
          onClick={() => onKeyPress(isSecondMode ? 'e^(' : 'ln(')}
          className={`h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold transition-all btn-press-effect border flex items-center justify-center shadow-sm ${
            isSecondMode
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40 font-black'
              : 'bg-slate-200/90 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white border-slate-300/80 dark:border-slate-700/60'
          }`}
        >
          {isSecondMode ? 'eˣ' : 'ln'}
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('π')}
          className="h-11 sm:h-12 rounded-2xl text-sm sm:text-base font-extrabold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          π
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('e')}
          className="h-11 sm:h-12 rounded-2xl text-sm sm:text-base font-extrabold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          e
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('^')}
          className="h-11 sm:h-12 rounded-2xl text-xs sm:text-sm font-extrabold bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center shadow-sm"
        >
          xʸ
        </button>

        {/* ROW 6: Numbers 7, 8, 9 & Divide */}
        <button
          type="button"
          onClick={() => onKeyPress('7')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          7
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('8')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          8
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('9')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          9
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('/')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          ÷
        </button>

        {/* ROW 7: Numbers 4, 5, 6 & Multiply */}
        <button
          type="button"
          onClick={() => onKeyPress('4')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          4
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('5')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          5
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('6')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          6
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('*')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          ×
        </button>

        {/* ROW 8: Numbers 1, 2, 3 & Subtract */}
        <button
          type="button"
          onClick={() => onKeyPress('1')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          1
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('2')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          2
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('3')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          3
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('-')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          -
        </button>

        {/* ROW 9: Number 0, Dot, Add & Equals */}
        <button
          type="button"
          onClick={() => onKeyPress('0')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          0
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('.')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          .
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('+')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onKeyPress('=')}
          className="h-11 sm:h-12 rounded-2xl text-lg sm:text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/40 border border-indigo-400/40 transition-all btn-press-effect flex items-center justify-center select-none"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default ScientificKeypad;
