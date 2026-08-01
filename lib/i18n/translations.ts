export type Language = 'en' | 'id';

export interface Translations {
  // Navigation & Header
  calculator: string;
  converter: string;
  history: string;
  settings: string;
  
  // Calculator
  defaultMode: string;
  completeMode: string;
  resultLabel: string;
  copyBtn: string;
  copiedBtn: string;
  syntaxError: string;
  memoryActive: string;
  
  // History Panel
  historyTitle: string;
  historyCount: (count: number) => string;
  clearAll: string;
  confirmClearText: string;
  cancel: string;
  close: string;
  noHistory: string;
  noHistoryDesc: string;
  restoreFormula: string;
  insertResult: string;
  
  // Converter
  searchPlaceholder: string;
  showMoreCategories: string;
  hideCategories: string;
  fromValueLabel: string;
  toValueLabel: string;
  viewAllResults: (count: number) => string;
  benchmarkLabel: string;
  swapTooltip: string;
  validNumberError: string;

  // Settings & Guidebook
  settingsTitle: string;
  guestProfile: string;
  guestDesc: string;
  localFirstBadge: string;
  appearance: string;
  darkMode: string;
  lightMode: string;
  languageLabel: string;
  guidebookTitle: string;
  guidebookSubtitle: string;
  aboutTitle: string;
  versionLabel: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    calculator: 'Calculator',
    converter: 'Converter',
    history: 'History',
    settings: 'Settings & Guide',
    
    defaultMode: 'Default',
    completeMode: 'Complete',
    resultLabel: 'Result',
    copyBtn: 'Copy',
    copiedBtn: 'Copied',
    syntaxError: 'Syntax Error',
    memoryActive: 'M Active',
    
    historyTitle: 'Calculation History',
    historyCount: (count) => `${count} ${count === 1 ? 'Calculation' : 'Calculations'}`,
    clearAll: 'Clear All',
    confirmClearText: 'Are you sure you want to clear all calculation history? This action cannot be undone.',
    cancel: 'Cancel',
    close: 'Close',
    noHistory: 'No calculation history yet',
    noHistoryDesc: 'Your calculator results will automatically appear here.',
    restoreFormula: 'Restore Formula',
    insertResult: 'Append Result',
    
    searchPlaceholder: 'Search units (e.g. kg, pound, liter, megabyte)...',
    showMoreCategories: 'View 14 Other Categories',
    hideCategories: 'Hide Categories',
    fromValueLabel: 'From Value & Unit',
    toValueLabel: 'To Result & Unit',
    viewAllResults: (count) => `View Results in ${count} Units`,
    benchmarkLabel: 'Unit Benchmark:',
    swapTooltip: 'Swap Units',
    validNumberError: 'Please enter a valid number',

    settingsTitle: 'Settings & Guidebook',
    guestProfile: 'Guest User Profile',
    guestDesc: 'Guest User Session',
    localFirstBadge: 'Local Session',
    appearance: 'Appearance & Theme',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    languageLabel: 'Application Language',
    guidebookTitle: 'Complete User Guidebook',
    guidebookSubtitle: 'Explore app features, scientific modes, and 14+ unit categories.',
    aboutTitle: 'About Application',
    versionLabel: 'Smart Calculator & Unit Converter v1.0.1',
  },
  id: {
    calculator: 'Kalkulator',
    converter: 'Konverter',
    history: 'Riwayat',
    settings: 'Pengaturan & Panduan',
    
    defaultMode: 'Default',
    completeMode: 'Lengkap',
    resultLabel: 'Hasil',
    copyBtn: 'Salin',
    copiedBtn: 'Tersalin',
    syntaxError: 'Error Sintaks',
    memoryActive: 'M Aktif',
    
    historyTitle: 'Riwayat Perhitungan',
    historyCount: (count) => `${count} Perhitungan`,
    clearAll: 'Hapus Semua',
    confirmClearText: 'Apakah Anda yakin ingin menghapus seluruh riwayat perhitungan ini? Tindakan ini tidak dapat dibatalkan.',
    cancel: 'Batal',
    close: 'Tutup',
    noHistory: 'Belum ada riwayat perhitungan',
    noHistoryDesc: 'Hasil perhitungan kalkulator Anda akan muncul di sini secara otomatis.',
    restoreFormula: 'Muat Ulang Rumus',
    insertResult: 'Sisipkan Hasil',
    
    searchPlaceholder: 'Cari satuan (misal: kg, pon, liter, megabyte)...',
    showMoreCategories: 'Lihat 14 Kategori Lainnya',
    hideCategories: 'Sembunyikan Kategori',
    fromValueLabel: 'Dari Nilai & Satuan',
    toValueLabel: 'Ke Hasil & Satuan',
    viewAllResults: (count) => `Lihat Hasil dalam ${count} Satuan`,
    benchmarkLabel: 'Patokan Satuan:',
    swapTooltip: 'Tukar Satuan',
    validNumberError: 'Masukkan angka yang valid',

    settingsTitle: 'Pengaturan & Buku Panduan',
    guestProfile: 'Profil Pengguna Tamu',
    guestDesc: 'Sesi Pengguna Tamu',
    localFirstBadge: 'Sesi Lokal',
    appearance: 'Tampilan & Tema',
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang',
    languageLabel: 'Bahasa Aplikasi',
    guidebookTitle: 'Buku Panduan Penggunaan Lengkap',
    guidebookSubtitle: 'Pelajari fitur aplikasi, mode ilmiah, dan rincian 14+ kategori satuan.',
    aboutTitle: 'Tentang Aplikasi',
    versionLabel: 'Kalkulator & Konverter Satuan v1.0.1',
  },
};

/**
 * Detect browser language on client-side. Defaults to 'en'.
 */
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('smart_calc_lang') as Language;
    if (saved === 'en' || saved === 'id') return saved;
    
    const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browserLang.startsWith('id')) return 'id';
  } catch {
    // Fallback to English
  }
  return 'en';
};
