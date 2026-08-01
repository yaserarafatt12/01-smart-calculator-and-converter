'use client';

import React, { useState } from 'react';
import {
  Settings,
  UserCheck,
  Sun,
  Moon,
  Globe,
  BookOpen,
  ShieldCheck,
  Zap,
  Calculator,
  Layers,
  History,
  X,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Info,
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Clock,
  Cpu,
  Flame,
  Activity,
  Gauge,
  Compass,
  Radio,
  Droplet,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/i18n/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
  historyCount: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
  historyCount,
}) => {
  const [openGuideSection, setOpenGuideSection] = useState<string | null>('purpose');
  const t = TRANSLATIONS[language];
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const toggleGuide = (sectionId: string) => {
    setOpenGuideSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const categoriesDetail = [
    {
      id: 'length',
      name: language === 'id' ? 'Panjang & Jarak' : 'Length & Distance',
      desc: language === 'id' ? 'Konversi dimensi benda, tinggi badan, & jarak tempuh (mm, cm, m, km, inch, feet, yard, mile).' : 'Convert object dimensions, heights, & travel distances (mm, cm, m, km, in, ft, yd, mi).',
      icon: <Ruler className="w-4 h-4 text-indigo-500" />,
    },
    {
      id: 'weight',
      name: language === 'id' ? 'Berat & Massa' : 'Weight & Mass',
      desc: language === 'id' ? 'Konversi timbangan badan, barang, & muatan (mg, gram, kg, ton, pound/lb, ounce/oz).' : 'Convert body weights, commodities, & cargo (mg, g, kg, ton, lb, oz).',
      icon: <Scale className="w-4 h-4 text-violet-500" />,
    },
    {
      id: 'temperature',
      name: language === 'id' ? 'Suhu & Temperatur' : 'Temperature',
      desc: language === 'id' ? 'Konversi cuaca & sains kelautan (°C Celsius, °F Fahrenheit, K Kelvin, °R Rankine).' : 'Convert weather & scientific temperatures (°C, °F, K, °R).',
      icon: <Thermometer className="w-4 h-4 text-rose-500" />,
    },
    {
      id: 'area',
      name: language === 'id' ? 'Luas & Bidang' : 'Area & Surface',
      desc: language === 'id' ? 'Perhitungan denah ruangan, tanah, & wilayah (m², km², hektar/ha, acre, sq ft).' : 'Calculate floor plans, land plots, & territories (m², km², ha, acre, sq ft).',
      icon: <Square className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'volume',
      name: language === 'id' ? 'Volume & Takaran Liquid' : 'Volume & Fluid Capacity',
      desc: language === 'id' ? 'Konversi isi tangki, bahan resep, & wadah (mL, Liter, m³, galon, fluid oz).' : 'Convert container capacities, liquid recipes, & tanks (mL, L, m³, gallon, fl oz).',
      icon: <Box className="w-4 h-4 text-cyan-500" />,
    },
    {
      id: 'time',
      name: language === 'id' ? 'Waktu & Durasi' : 'Time & Duration',
      desc: language === 'id' ? 'Konversi durasi kerja, stopwatch, & kalender (ms, detik, menit, jam, hari, minggu, tahun).' : 'Convert work durations, stopwatches, & calendars (ms, sec, min, hr, day, wk, yr).',
      icon: <Clock className="w-4 h-4 text-emerald-500" />,
    },
    {
      id: 'speed',
      name: language === 'id' ? 'Kecepatan & Lajuan' : 'Speed & Velocity',
      desc: language === 'id' ? 'Konversi laju kendaraan, angin, & kapal (m/s, km/jam, mph, knot).' : 'Convert vehicle speeds, wind, & nautical speeds (m/s, km/h, mph, knot).',
      icon: <Zap className="w-4 h-4 text-yellow-500" />,
    },
    {
      id: 'digital',
      name: language === 'id' ? 'Data Digital & Memori' : 'Digital Data & Storage',
      desc: language === 'id' ? 'Konversi ukuran file & kuota internet (bit, Byte, KB, MB, GB, TB, KiB, MiB).' : 'Convert file sizes & internet bandwidth (bit, B, KB, MB, GB, TB, KiB, MiB).',
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
    },
    {
      id: 'energy',
      name: language === 'id' ? 'Energi & Kalori' : 'Energy & Calories',
      desc: language === 'id' ? 'Konversi nilai gizi makanan & listrik (Joule, kJ, kalori/cal, Wh, kWh).' : 'Convert food nutrition calories & electrical work (Joule, kJ, cal, Wh, kWh).',
      icon: <Flame className="w-4 h-4 text-orange-500" />,
    },
    {
      id: 'power',
      name: language === 'id' ? 'Daya & Beban Listrik' : 'Power & Wattage',
      desc: language === 'id' ? 'Perhitungan daya mesin & alat elektronik (Watt, kW, Horsepower/HP).' : 'Calculate appliance wattage & engine horsepower (W, kW, HP).',
      icon: <Activity className="w-4 h-4 text-red-500" />,
    },
    {
      id: 'pressure',
      name: language === 'id' ? 'Tekanan & Fluida' : 'Pressure & Fluids',
      desc: language === 'id' ? 'Konversi tekanan ban kendaraan & cuaca (Pascal, bar, atm, psi).' : 'Convert tire inflation pressure & barometric weather (Pa, bar, atm, psi).',
      icon: <Gauge className="w-4 h-4 text-teal-500" />,
    },
    {
      id: 'angle',
      name: language === 'id' ? 'Sudut & Trigonometri' : 'Angle & Geometry',
      desc: language === 'id' ? 'Konversi bidang geometri & kompas navigasi (Derajat/°, Radian/rad, Gradian).' : 'Convert geometry angles & navigation headings (Degrees/°, Radians/rad, Grad).',
      icon: <Compass className="w-4 h-4 text-purple-500" />,
    },
    {
      id: 'frequency',
      name: language === 'id' ? 'Frekuensi & Gelombang' : 'Frequency & Signal',
      desc: language === 'id' ? 'Konversi frekuensi sinyal & prosesor (Hz, kHz, MHz, GHz).' : 'Convert signal frequencies & processor clocks (Hz, kHz, MHz, GHz).',
      icon: <Radio className="w-4 h-4 text-pink-500" />,
    },
    {
      id: 'fuel',
      name: language === 'id' ? 'Bahan Bakar & Konsumsi' : 'Fuel Consumption',
      desc: language === 'id' ? 'Perhitungan efisiensi bahan bakar kendaraan (km/L, L/100km, mpg).' : 'Calculate vehicle fuel mileage efficiency (km/L, L/100km, mpg).',
      icon: <Droplet className="w-4 h-4 text-sky-500" />,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer font-sans"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[85vh] bg-white/95 dark:bg-[#121519]/95 backdrop-blur-2xl rounded-[32px] border border-white/80 dark:border-slate-700/80 shadow-2xl overflow-y-auto p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200 cursor-default text-slate-900 dark:text-white"
      >
        {/* Header Title Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Settings strokeWidth={2.5} className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                {t.settingsTitle}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {language === 'id' ? 'Kelola sesi, tampilan, dan panduan fitur' : 'Manage session, theme, and user guide'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors btn-press-effect"
          >
            <X strokeWidth={2.5} className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: Guest Profile Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-violet-500/10 border border-indigo-500/20 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md font-extrabold text-sm">
                <UserCheck strokeWidth={2.5} className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold tracking-tight flex items-center gap-1.5">
                  <span>{t.guestProfile}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {t.guestDesc}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-indigo-500/15 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck strokeWidth={2.5} className="w-4 h-4" />
              <span>{t.localFirstBadge}</span>
            </div>
            <span className="text-[11px] opacity-80">
              {historyCount} {language === 'id' ? 'Catatan Riwayat' : 'History Entries'}
            </span>
          </div>
        </div>

        {/* SECTION 2: Appearance & Language Controls */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {language === 'id' ? 'Pengaturan Aplikasi' : 'Application Settings'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Theme Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon strokeWidth={2.5} className="w-4 h-4 text-amber-400" />
                ) : (
                  <Sun strokeWidth={2.5} className="w-4 h-4 text-amber-500" />
                )}
                <span className="text-xs font-extrabold">{t.appearance}</span>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-indigo-600 text-white hover:bg-indigo-700 transition-all btn-press-effect shadow-sm"
              >
                {isDark ? t.darkMode : t.lightMode}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe strokeWidth={2.5} className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-extrabold">{t.languageLabel}</span>
              </div>

              <button
                type="button"
                onClick={onToggleLanguage}
                className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-indigo-600 text-white hover:bg-indigo-700 transition-all btn-press-effect shadow-sm"
              >
                {language === 'en' ? 'English' : 'Indonesia'}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: Complete Guidebook (Interactive Accordion) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <BookOpen strokeWidth={2.5} className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {t.guidebookTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {t.guidebookSubtitle}
          </p>

          <div className="space-y-2">
            {/* Guide 1: Kegunaan & Keunggulan Utama Aplikasi Kita (NO 1 BARU) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGuide('purpose')}
                className="w-full p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-left font-extrabold text-xs flex items-center justify-between hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  {language === 'id' ? '1. Kegunaan & Manfaat Utama Aplikasi Kita' : '1. Core Purpose & Key Benefits of Our App'}
                </span>
                {openGuideSection === 'purpose' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {openGuideSection === 'purpose' && (
                <div className="p-3.5 bg-white dark:bg-slate-900/90 text-xs space-y-2.5 text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800">
                  <p className="leading-relaxed">
                    {language === 'id'
                      ? 'Aplikasi ini dibangun untuk menghadirkan alat kalkulasi & konversi satuan yang 100% bersih, cepat, aman, dan bebas dari iklan yang mengganggu.'
                      : 'Built to provide a 100% clean, ad-free, high-precision calculation & unit conversion tool for everyday productivity.'}
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white font-extrabold">100% Bebas Iklan & Offline:</strong> {language === 'id' ? 'Bekerja secara Local-First tanpa memerlukan koneksi internet atau backend server.' : 'Runs Local-First without needing internet connections or central servers.'}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white font-extrabold">Aman Tanpa eval():</strong> {language === 'id' ? 'Menggunakan mesin AST Parser matematika buatan sendiri untuk evaluasi ekspresi presisi tinggi.' : 'Uses a custom Shunting-Yard AST Parser for 100% secure calculation evaluation.'}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 dark:text-white font-extrabold">Dua Mode Ergonomis:</strong> {language === 'id' ? 'Bebas berganti antara Mode Default (aritmatika harian) dan Mode Lengkap (fungsi ilmiah 4 kolom).' : 'Easily switch between Default Mode (everyday arithmetic) and Complete Mode (4-column scientific keypad).'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guide 2: Perbedaan Mode Default & Lengkap (DULU NO 1, SEKARANG DIBAWAHIN) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGuide('modes')}
                className="w-full p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-left font-extrabold text-xs flex items-center justify-between hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-500" />
                  {language === 'id' ? '2. Perbedaan Mode Default & Lengkap' : '2. Default vs Complete Mode'}
                </span>
                {openGuideSection === 'modes' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {openGuideSection === 'modes' && (
                <div className="p-3.5 bg-white dark:bg-slate-900/90 text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold">Mode Default:</strong> {language === 'id' ? 'Didesain untuk aritmatika dasar sehari-hari dengan tombol angka besar yang sangat lega.' : 'Designed for everyday basic arithmetic with large, comfortable touch buttons.'}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold">Mode Lengkap:</strong> {language === 'id' ? 'Tata letak 4-kolom ilmiah presisi dengan tombol hapus (AC, C, ⌫) di baris paling atas tepat di bawah layar hasil.' : 'Precision 4-column scientific layout with clear/delete buttons (AC, C, ⌫) at Row 1 directly below the result card.'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guide 3: 2nd Button & Inverse Functions (IKON BARU: VIOLET ZAP / SPARKLES GLOW) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGuide('second')}
                className="w-full p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-left font-extrabold text-xs flex items-center justify-between hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  {language === 'id' ? '3. Cara Kerja Tombol 2nd & Invers' : '3. How 2nd Button & Inverse Functions Work'}
                </span>
                {openGuideSection === 'second' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {openGuideSection === 'second' && (
                <div className="p-3.5 bg-white dark:bg-slate-900/90 text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800">
                  <p>
                    {language === 'id'
                      ? 'Tombol 2nd berwarna kuning mencolok. Saat ditekan aktif, fungsi matematika otomatis bertransformasi:'
                      : 'The yellow 2nd button toggles inverse mathematical functions:'}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-violet-600 dark:text-violet-300 font-bold">
                    <li>sin → sin⁻¹ (Arcsin)</li>
                    <li>cos → cos⁻¹ (Arccos)</li>
                    <li>tan → tan⁻¹ (Arctan)</li>
                    <li>log → 10ˣ &nbsp;&nbsp;&nbsp;&nbsp; ln → eˣ</li>
                    <li>√x → x²</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Guide 4: Calculation History & Actions */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGuide('history')}
                className="w-full p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-left font-extrabold text-xs flex items-center justify-between hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-500" />
                  {language === 'id' ? '4. Menggunakan Riwayat Perhitungan' : '4. Using Calculation History'}
                </span>
                {openGuideSection === 'history' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {openGuideSection === 'history' && (
                <div className="p-3.5 bg-white dark:bg-slate-900/90 text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold">↗ {t.restoreFormula}:</strong> {language === 'id' ? 'Mengembalikan seluruh rumus lama ke layar kalkulator untuk dihitung atau diedit kembali.' : 'Restores the original formula string into the calculator display.'}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold">+ {t.insertResult}:</strong> {language === 'id' ? 'Menyisipkan angka hasil ke dalam rumus yang sedang diketik.' : 'Appends the calculated number into your ongoing expression.'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Guide 5: Unit Converter & Detailed 14 Category Breakdown (CABANG 14 KATEGORI) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleGuide('converter')}
                className="w-full p-3.5 bg-slate-100/80 dark:bg-slate-800/80 text-left font-extrabold text-xs flex items-center justify-between hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  {language === 'id' ? '5. Rincian & Kegunaan 14+ Kategori Satuan' : '5. Detailed 14+ Unit Categories Breakdown'}
                </span>
                {openGuideSection === 'converter' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {openGuideSection === 'converter' && (
                <div className="p-3.5 bg-white dark:bg-slate-900/90 text-xs space-y-3 text-slate-600 dark:text-slate-300 font-medium border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'id'
                      ? 'Berikut adalah rincian 14 kategori konversi beserta fungsi penggunaannya:'
                      : 'Detailed Breakdown of all 14 unit conversion categories:'}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {categoriesDetail.map((cat, idx) => (
                      <div
                        key={cat.id}
                        className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2.5"
                      >
                        <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-sm shrink-0">
                          {cat.icon}
                        </div>
                        <div>
                          <div className="text-[11px] font-extrabold text-slate-900 dark:text-white">
                            {idx + 1}. {cat.name}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {cat.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: About & License Footer */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs font-medium text-slate-500 dark:text-slate-400 space-y-1">
          <div className="font-extrabold text-slate-900 dark:text-white">
            {t.versionLabel}
          </div>
          <div>
            Built with Next.js 14, TypeScript & Tailwind CSS by <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">Yaser Arafat</strong>.
          </div>
          <div className="text-[10px] opacity-70">
            Licensed under MIT &copy; 2026. Zero `eval()`, 100% Local-First.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
