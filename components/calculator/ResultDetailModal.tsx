'use client';

import React, { useState } from 'react';
import { X, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { CalculationResult } from '@/lib/calculator/types';

interface ResultDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult | null;
  onUseAsInput: (val: string) => void;
}

export const ResultDetailModal: React.FC<ResultDetailModalProps> = ({
  isOpen,
  onClose,
  result,
  onUseAsInput,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !result) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 shadow-2xl z-10 space-y-4 font-sans text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
              <Sparkles strokeWidth={2.5} className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold tracking-tight">Rincian Hasil Perhitungan</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X strokeWidth={2.5} className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          {/* Nilai Lengkap */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Nilai Lengkap (Presisi Tinggi)
            </span>
            <div className="text-base font-extrabold font-sans break-all select-all text-slate-900 dark:text-slate-100">
              {result.rawValue}
            </div>
          </div>

          {/* Notasi Ilmiah */}
          {result.scientificNotation && (
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Notasi Eksponensial / Ilmiah
              </span>
              <div className="text-sm font-extrabold font-sans text-slate-900 dark:text-slate-100">
                {result.scientificNotation}
              </div>
            </div>
          )}

          {/* Detail Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Status Nilai:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {result.isApproximate ? 'Nilai Pendekatan (≈)' : 'Nilai Eksak (=)'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy(result.rawValue)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-extrabold transition-all btn-press-effect"
          >
            {copied ? <Check strokeWidth={2.5} className="w-4 h-4 text-emerald-500" /> : <Copy strokeWidth={2.5} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            <span>{copied ? 'Tersalin' : 'Salin Nilai'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onUseAsInput(result.rawValue);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all btn-press-effect shadow-md"
          >
            <ArrowUpRight strokeWidth={2.5} className="w-4 h-4" />
            <span>Gunakan Masukan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailModal;
