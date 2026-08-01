'use client';

import React from 'react';
import { AlertTriangle, Lightbulb, X, HelpCircle } from 'lucide-react';
import { FormattedError } from '@/lib/calculator/error-messages';

interface ErrorHintProps {
  error: FormattedError | null;
  onDismiss?: () => void;
  onAutoFix?: () => void;
}

export const ErrorHint: React.FC<ErrorHintProps> = ({
  error,
  onDismiss,
  onAutoFix,
}) => {
  if (!error) return null;

  return (
    <div
      id="error-hint-widget"
      data-testid="error-hint-widget"
      className="w-full mt-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 shadow-sm animate-fade-in animate-shake"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                {error.title}
              </h4>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/80 text-amber-800 dark:text-amber-300 font-mono">
                Indeks {error.index}
              </span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
              {error.message}
            </p>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200 p-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
            title="Tutup Pesan Error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Educational Hint Box for Students */}
      <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <span className="font-semibold text-amber-700 dark:text-amber-400">
            Panduan Belajar:{' '}
          </span>
          {error.hint}
        </div>
      </div>
    </div>
  );
};

export default ErrorHint;
