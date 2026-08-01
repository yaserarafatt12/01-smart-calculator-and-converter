'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Layers } from 'lucide-react';
import { UnitCategory, convertAllUnitsInCategory } from '@/lib/converter/unit-conversion';

interface AllResultsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  category: UnitCategory;
  fromValue: string;
  fromUnit: string;
}

export const AllResultsDrawer: React.FC<AllResultsDrawerProps> = ({
  isOpen,
  onClose,
  category,
  fromValue,
  fromUnit,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const numVal = parseFloat(fromValue) || 0;
  const allResults = convertAllUnitsInCategory(category, numVal, fromUnit);

  const handleCopy = (unitId: string, valStr: string) => {
    navigator.clipboard.writeText(valStr);
    setCopiedId(unitId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 shadow-2xl z-10 flex flex-col max-h-[85vh] font-sans text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
              <Layers strokeWidth={2.5} className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight">Seluruh Hasil Konversi</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {fromValue} {fromUnit} dalam seluruh satuan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X strokeWidth={2.5} className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Results List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {allResults.map((item) => (
            <div
              key={item.unitId}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 hover:border-indigo-500/50 transition-all"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                  {item.name} ({item.symbol})
                </span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-300 font-sans block truncate">
                  {item.formattedValue}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(item.unitId, String(item.value))}
                className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1 btn-press-effect"
                title="Salin Angka"
              >
                {copiedId === item.unitId ? (
                  <>
                    <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy strokeWidth={2.5} className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllResultsDrawer;
