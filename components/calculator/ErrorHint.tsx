'use client';

import React from 'react';
import { AlertCircle, X, HelpCircle } from 'lucide-react';
import { FormattedError } from '@/lib/calculator/error-messages';

interface ErrorHintProps {
  error: FormattedError | null;
  onDismiss?: () => void;
  onAutoFix?: () => void;
}

export const ErrorHint: React.FC<ErrorHintProps> = ({
  error,
  onDismiss,
}) => {
  if (!error) return null;

  return (
    <div
      id="error-hint-widget"
      data-testid="error-hint-widget"
      className="w-full my-2 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/15 via-rose-500/10 to-amber-500/15 dark:from-rose-950/40 dark:to-amber-950/40 border border-rose-500/30 dark:border-rose-500/40 shadow-md backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-xl bg-rose-500 text-white shrink-0 shadow-sm mt-0.5">
            <AlertCircle strokeWidth={2.5} className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-rose-600 dark:text-rose-300 tracking-tight flex items-center gap-1.5">
              <span>{error.title}</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 mt-0.5 leading-snug">
              {error.message}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
              <HelpCircle className="w-3 h-3 shrink-0" />
              <span>{error.hint}</span>
            </div>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors btn-press-effect shrink-0"
            title="Tutup Pesan"
          >
            <X strokeWidth={2.5} className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorHint;
