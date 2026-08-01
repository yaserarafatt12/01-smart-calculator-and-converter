'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Clock,
  Zap,
  Cpu,
  Flame,
  Activity,
  Gauge,
  Compass,
  Radio,
  Droplet,
  ArrowLeftRight,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  UnitCategory,
  UNIT_CATEGORIES,
  convertUnit,
  UnitInfo,
} from '@/lib/converter/unit-conversion';

interface CategoryItem {
  id: UnitCategory;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

const ALL_CATEGORIES: CategoryItem[] = [
  { id: 'length', label: 'Panjang', desc: 'm, km, cm, in, ft...', icon: <Ruler strokeWidth={2.5} className="w-4 h-4 text-indigo-600 dark:text-indigo-300" /> },
  { id: 'weight', label: 'Berat & Massa', desc: 'kg, g, mg, lb...', icon: <Scale strokeWidth={2.5} className="w-4 h-4 text-violet-600 dark:text-violet-300" /> },
  { id: 'temperature', label: 'Suhu', desc: '°C, °F, K, °R', icon: <Thermometer strokeWidth={2.5} className="w-4 h-4 text-rose-600 dark:text-rose-300" /> },
  { id: 'area', label: 'Luas', desc: 'm², km², ha, acre...', icon: <Square strokeWidth={2.5} className="w-4 h-4 text-amber-600 dark:text-amber-300" /> },
  { id: 'volume', label: 'Volume', desc: 'mL, L, m³, galon...', icon: <Box strokeWidth={2.5} className="w-4 h-4 text-cyan-600 dark:text-cyan-300" /> },
  { id: 'time', label: 'Waktu', desc: 'ms, s, min, jam, thn...', icon: <Clock strokeWidth={2.5} className="w-4 h-4 text-emerald-600 dark:text-emerald-300" /> },
  { id: 'speed', label: 'Kecepatan', desc: 'm/s, km/h, mph, knot...', icon: <Zap strokeWidth={2.5} className="w-4 h-4 text-yellow-600 dark:text-yellow-300" /> },
  { id: 'digital', label: 'Data Digital', desc: 'bit, B, KB, MB, GB, KiB...', icon: <Cpu strokeWidth={2.5} className="w-4 h-4 text-blue-600 dark:text-blue-300" /> },
  { id: 'energy', label: 'Energi', desc: 'J, kJ, cal, Wh, kWh...', icon: <Flame strokeWidth={2.5} className="w-4 h-4 text-orange-600 dark:text-orange-300" /> },
  { id: 'power', label: 'Daya', desc: 'W, kW, HP...', icon: <Activity strokeWidth={2.5} className="w-4 h-4 text-red-600 dark:text-red-300" /> },
  { id: 'pressure', label: 'Tekanan', desc: 'Pa, bar, atm, psi...', icon: <Gauge strokeWidth={2.5} className="w-4 h-4 text-teal-600 dark:text-teal-300" /> },
  { id: 'angle', label: 'Sudut', desc: 'derajat, rad, grad...', icon: <Compass strokeWidth={2.5} className="w-4 h-4 text-purple-600 dark:text-purple-300" /> },
  { id: 'frequency', label: 'Frekuensi', desc: 'Hz, kHz, MHz, GHz...', icon: <Radio strokeWidth={2.5} className="w-4 h-4 text-pink-600 dark:text-pink-300" /> },
  { id: 'fuel', label: 'Bahan Bakar', desc: 'km/L, L/100km, mpg...', icon: <Droplet strokeWidth={2.5} className="w-4 h-4 text-sky-600 dark:text-sky-300" /> },
];

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromValue, setFromValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('m');
  const [result, setResult] = useState<number | null>(1000);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Custom Dropdown Open States
  const [openFromSelect, setOpenFromSelect] = useState(false);
  const [openToSelect, setOpenToSelect] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const visibleCategories = showAllCategories
    ? ALL_CATEGORIES
    : ALL_CATEGORIES.slice(0, 4);

  // Update default units when category changes
  useEffect(() => {
    const units = UNIT_CATEGORIES[category]?.units;
    if (units && units.length >= 2) {
      setFromUnit(units[0].code || units[0].id);
      setToUnit(units[1].code || units[1].id);
    }
  }, [category]);

  // Recalculate conversion whenever inputs change
  useEffect(() => {
    if (!fromValue.trim()) {
      setResult(null);
      setErrorMsg(null);
      return;
    }

    const num = parseFloat(fromValue);
    if (isNaN(num)) {
      setResult(null);
      setErrorMsg('Masukkan angka yang valid');
      return;
    }

    try {
      const converted = convertUnit(category, num, fromUnit, toUnit);
      setResult(converted);
      setErrorMsg(null);
    } catch (err: any) {
      setResult(null);
      setErrorMsg(err.message || 'Gagal mengonversi unit');
    }
  }, [category, fromValue, fromUnit, toUnit]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setOpenFromSelect(false);
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setOpenToSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Swap units function
  const handleSwap = () => {
    const prevFrom = fromUnit;
    const prevTo = toUnit;
    setFromUnit(prevTo);
    setToUnit(prevFrom);
  };

  // Copy result to clipboard
  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(String(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Get current category unit list
  const currentUnits: UnitInfo[] = UNIT_CATEGORIES[category]?.units || [];
  const selectedFromObj = currentUnits.find((u) => u.id === fromUnit || u.code === fromUnit) || currentUnits[0];
  const selectedToObj = currentUnits.find((u) => u.id === toUnit || u.code === toUnit) || currentUnits[1] || currentUnits[0];

  // Helper to format 1 unit benchmark formula
  const getFormulaHint = () => {
    if (!result && result !== 0) return null;
    try {
      const benchmark = convertUnit(category, 1, fromUnit, toUnit);
      const fromSymbol = selectedFromObj?.symbol || fromUnit;
      const toSymbol = selectedToObj?.symbol || toUnit;
      return `1 ${fromSymbol} = ${benchmark} ${toSymbol}`;
    } catch {
      return null;
    }
  };

  return (
    <div
      id="unit-converter-container"
      data-testid="unit-converter-container"
      className="w-full font-sans pb-4"
    >
      {/* Category Grid Section */}
      <div className="mb-4">
        <div className={`grid grid-cols-2 gap-2.5 transition-all duration-300 ${
          showAllCategories ? 'max-h-60 overflow-y-auto p-1 scrollbar-thin' : ''
        }`}>
          {visibleCategories.map((cat) => {
            const isSelected = category === cat.id;

            return (
              <button
                key={cat.id}
                id={`cat-${cat.id}`}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  setOpenFromSelect(false);
                  setOpenToSelect(false);
                }}
                className={`p-3 rounded-2xl text-left transition-all duration-200 btn-press-effect flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 border border-white/30 font-bold scale-[1.01]'
                    : 'bg-slate-200/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300/80 dark:border-slate-700/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className={`p-2 rounded-xl border ${
                    isSelected
                      ? 'bg-white text-indigo-600 border-white shadow-md font-bold'
                      : 'bg-indigo-500/20 dark:bg-indigo-500/25 border-indigo-500/30 shadow-sm'
                  }`}>
                    {cat.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-extrabold tracking-tight">{cat.label}</div>
                  <div className={`text-[10px] sm:text-[11px] mt-0.5 font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {cat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Middle-Centered Expand Toggle */}
        <div className="flex justify-center w-full mt-3">
          <button
            type="button"
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="flex items-center justify-center gap-2 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 px-5 py-2 bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full border border-indigo-500/30 transition-all btn-press-effect w-full max-w-[260px] shadow-sm whitespace-nowrap"
          >
            <span>{showAllCategories ? 'Sembunyikan Kategori' : 'Lihat 14 Kategori Lainnya'}</span>
            {showAllCategories ? <ChevronUp strokeWidth={2.5} className="w-4 h-4 shrink-0" /> : <ChevronDown strokeWidth={2.5} className="w-4 h-4 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Prominent Visual Separator Line */}
      <div className="w-full my-6 sm:my-8 border-t border-slate-200/60 dark:border-slate-800/60" />

      {/* Main Input/Output Conversion Block Pushed Down Gracefully */}
      <div className="space-y-4 pt-4 sm:pt-6">
        {/* From Value & Custom Dropdown */}
        <div className="space-y-1 relative z-30" ref={fromRef}>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
            Dari Nilai & Satuan
          </label>
          <div className="relative flex rounded-2xl bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 focus-within:border-indigo-600 transition-all shadow-sm">
            <input
              id="from-value-input"
              data-testid="from-value-input"
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 text-lg font-extrabold font-sans bg-transparent text-slate-900 dark:text-white outline-none"
            />

            <button
              type="button"
              id="from-unit-trigger"
              onClick={() => {
                setOpenFromSelect((prev) => !prev);
                setOpenToSelect(false);
              }}
              className="px-3.5 py-3 text-xs font-extrabold bg-slate-300/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 border-l border-slate-300 dark:border-slate-600 flex items-center gap-2 shrink-0 hover:bg-slate-400/80 dark:hover:bg-slate-600 transition-colors rounded-r-2xl"
            >
              <span>{selectedFromObj?.name} ({selectedFromObj?.symbol})</span>
              <ChevronDown strokeWidth={2.5} className={`w-4 h-4 transition-transform duration-200 ${openFromSelect ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
            </button>

            {openFromSelect && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 rounded-2xl p-2 shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[999] max-h-64 overflow-y-auto opacity-100 bg-opacity-100 font-sans">
                {currentUnits.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setFromUnit(u.id);
                      setOpenFromSelect(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors my-0.5 ${
                      fromUnit === u.id
                        ? 'bg-indigo-600 text-white font-extrabold'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{u.name}</span>
                    <span className="font-sans font-bold opacity-80">({u.symbol})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swap Button Divider */}
        <div className="flex justify-center -my-2 relative z-20">
          <button
            type="button"
            id="btn-swap-units"
            data-testid="btn-swap-units"
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-indigo-500/40"
            title="Tukar Satuan"
          >
            <ArrowLeftRight strokeWidth={2.5} className="w-4 h-4" />
          </button>
        </div>

        {/* To Value & Custom Dropdown in Matte Slate WITH INLINE COPY BUTTON */}
        <div className="space-y-1 relative z-10" ref={toRef}>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
            Ke Hasil & Satuan
          </label>
          <div className="relative flex items-center justify-between rounded-2xl bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 p-2 transition-all shadow-sm">
            {/* Left: Converted Result Value in Sans-Serif */}
            <div
              id="to-value-output"
              data-testid="to-value-output"
              className="px-3 text-xl font-extrabold font-sans text-indigo-600 dark:text-indigo-400 truncate"
            >
              {result !== null ? result : '-'}
            </div>

            {/* Right: Inline Copy Button + Custom Dropdown Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              {result !== null && (
                <button
                  type="button"
                  id="btn-copy-converter-result"
                  data-testid="btn-copy-converter-result"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all btn-press-effect shadow-sm"
                  title="Salin Hasil"
                >
                  {copied ? <Check strokeWidth={2.5} className="w-3.5 h-3.5 text-emerald-300" /> : <Copy strokeWidth={2.5} className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              )}

              <button
                type="button"
                id="to-unit-trigger"
                onClick={() => {
                  setOpenToSelect((prev) => !prev);
                  setOpenFromSelect(false);
                }}
                className="px-3 py-2 text-xs font-extrabold bg-slate-300/80 dark:bg-slate-700/80 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 flex items-center gap-2 rounded-xl hover:bg-slate-400/80 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                <span>{selectedToObj?.name} ({selectedToObj?.symbol})</span>
                <ChevronDown strokeWidth={2.5} className={`w-4 h-4 transition-transform duration-200 ${openToSelect ? 'rotate-180 text-indigo-600' : 'text-slate-500'}`} />
              </button>
            </div>

            {openToSelect && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 rounded-2xl p-2 shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[999] max-h-64 overflow-y-auto opacity-100 bg-opacity-100 font-sans">
                {currentUnits.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setToUnit(u.id);
                      setOpenToSelect(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors my-0.5 ${
                      toUnit === u.id
                        ? 'bg-indigo-600 text-white font-extrabold'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{u.name}</span>
                    <span className="font-sans font-bold opacity-80">({u.symbol})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patokan Satuan */}
      {errorMsg ? (
        <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-bold">
          {errorMsg}
        </div>
      ) : (
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center pt-3">
          Patokan Satuan: <strong className="font-sans font-extrabold text-indigo-600 dark:text-indigo-400">{getFormulaHint()}</strong>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
