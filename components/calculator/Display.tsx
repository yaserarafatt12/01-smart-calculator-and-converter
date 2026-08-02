'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { Language, Translations } from '@/lib/i18n/translations';

interface DisplayProps {
  expression: string;
  result: string | number | null;
  errorIndex?: number | null;
  isError?: boolean;
  language?: Language;
  t?: Translations;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  errorIndex = null,
  isError = false,
}) => {
  // Helper to format expression display (* -> × and / -> ÷)
  const formatExpressionForDisplay = (str: string) => {
    return str.replace(/\*/g, '×').replace(/\//g, '÷');
  };

  // Helper to render expression characters with error token highlighting
  const renderExpressionWithHighlight = () => {
    if (!expression) {
      return (
        <span className="text-slate-400 dark:text-slate-500 italic select-none">
          0
        </span>
      );
    }

    const formatted = formatExpressionForDisplay(expression);

    if (isError && errorIndex !== null && errorIndex !== undefined && errorIndex >= 0 && errorIndex < expression.length) {
      const before = formatExpressionForDisplay(expression.slice(0, errorIndex));
      const errChar = formatExpressionForDisplay(expression[errorIndex]);
      const after = formatExpressionForDisplay(expression.slice(errorIndex + 1));

      return (
        <span className="break-all">
          {before}
          <span
            data-testid="error-highlight"
            className="inline-block bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold px-1.5 py-0.5 rounded-md ring-2 ring-rose-500 animate-pulse"
            title={`Error on index ${errorIndex}: '${errChar}'`}
          >
            {errChar}
          </span>
          {after}
        </span>
      );
    }

    return <span className="break-all">{formatted}</span>;
  };

  return (
    <div
      id="calculator-display-container"
      className="w-full pt-1 pb-1 px-1 flex flex-col text-right relative overflow-hidden"
    >
      {/* Error alert indicator */}
      {isError && (
        <div className="flex items-center justify-start text-xs mb-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle strokeWidth={2.5} className="w-3 h-3" /> Syntax Error
          </span>
        </div>
      )}

      {/* Main Expression Input Area at the top */}
      <div
        id="calculator-expression"
        data-testid="calculator-expression"
        className="text-right text-slate-400 dark:text-slate-400 font-sans text-xl sm:text-2xl font-bold tracking-wide overflow-x-auto py-2 scrollbar-none"
      >
        {renderExpressionWithHighlight()}
        <span className="inline-block w-0.5 h-6 bg-indigo-500 ml-1 animate-cursor align-middle" />
      </div>
    </div>
  );
};

interface ResultCardProps {
  result: string | number | null;
  isError?: boolean;
  onCopyResult?: () => void;
  onClickDetail?: () => void;
  language?: Language;
  t?: Translations;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  isError = false,
  onClickDetail,
  language = 'en',
  t,
}) => {
  const [copied, setCopied] = useState(false);

  // Copy raw exact un-rounded value to clipboard!
  const handleCopyResult = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (result !== null && result !== undefined) {
      navigator.clipboard.writeText(String(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Helper to format display result with clean Thousands Separator & Max 6 Decimals for card view
  const formatDisplayResult = (val: string | number | null): string => {
    if (val === null || val === undefined) return '0';
    if (typeof val === 'string' && isNaN(Number(val))) return val; // e.g. "Error"

    const num = typeof val === 'number' ? val : Number(val);
    if (isNaN(num)) return String(val);

    const locale = language === 'id' ? 'id-ID' : 'en-US';
    const decimalSep = language === 'id' ? ',' : '.';

    const parts = String(num).split('.');
    const integerPart = Number(parts[0]).toLocaleString(locale);
    if (parts.length > 1) {
      const decimalPart = parts[1].slice(0, 6);
      return `${integerPart}${decimalSep}${decimalPart}`;
    }
    return integerPart;
  };

  const resultLabelText = t?.resultLabel ?? (language === 'id' ? 'Hasil' : 'Result');
  const copyBtnText = t?.copyBtn ?? (language === 'id' ? 'Salin' : 'Copy');
  const copiedBtnText = t?.copiedBtn ?? (language === 'id' ? 'Tersalin' : 'Copied');
  const copyTooltipText = t?.copyTooltip ?? (language === 'id' ? 'Salin Hasil Asli Presisi Lengkap' : 'Copy High-Precision Exact Result');

  return (
    <div
      id="calculator-result"
      data-testid="calculator-result"
      onClick={onClickDetail}
      className="w-full p-3 sm:p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border-2 border-indigo-500/30 dark:border-indigo-500/40 backdrop-blur-xl flex items-center justify-between gap-3 shadow-md cursor-pointer hover:border-indigo-500/60 transition-colors"
    >
      {/* Left: Formatted Result Value in Sans-Serif */}
      <div className="flex-1 min-w-0 text-left">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-0.5">
          {resultLabelText}
        </span>
        <div className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white truncate">
          {formatDisplayResult(result)}
        </div>
      </div>

      {/* Far Right: Copy Button */}
      {result !== null && !isError && (
        <button
          type="button"
          onClick={handleCopyResult}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shrink-0 transition-all btn-press-effect shadow-sm"
          title={copyTooltipText}
        >
          {copied ? (
            <>
              <Check strokeWidth={2.5} className="w-4 h-4 text-emerald-300" />
              <span>{copiedBtnText}</span>
            </>
          ) : (
            <>
              <Copy strokeWidth={2.5} className="w-4 h-4" />
              <span>{copyBtnText}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Display;
