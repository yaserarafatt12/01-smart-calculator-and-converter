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
  
  // Result Detail Modal
  resultDetailTitle: string;
  fullPrecisionValue: string;
  scientificNotationLabel: string;
  valueStatusLabel: string;
  approximateValue: string;
  exactValue: string;
  copyValueBtn: string;
  useAsInputBtn: string;
  copyTooltip: string;

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

  // Converter Categories
  catLength: string;
  catWeight: string;
  catTemp: string;
  catArea: string;
  catVolume: string;
  catTime: string;
  catSpeed: string;
  catDigital: string;
  catEnergy: string;
  catPower: string;
  catPressure: string;
  catAngle: string;
  catFrequency: string;
  catFuel: string;

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

  pwaInstallTitle: string;
  pwaInstalledText: string;
  pwaInstallDesc: string;
  installBtn: string;
  guidePurposeTitle: string;
  guideModesTitle: string;
  guideSecondTitle: string;
  guideHistoryTitle: string;
  guideConverterTitle: string;
  appSettingsGroup: string;
  manageSessionSub: string;
  iosGuideTitle: string;
  iosStep1: string;
  iosStep2: string;
  iosStep3: string;
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

    resultDetailTitle: 'Calculation Result Detail',
    fullPrecisionValue: 'Full Precision Value (High Precision)',
    scientificNotationLabel: 'Scientific / Exponential Notation',
    valueStatusLabel: 'Value Status:',
    approximateValue: 'Approximate Value (≈)',
    exactValue: 'Exact Value (=)',
    copyValueBtn: 'Copy Value',
    useAsInputBtn: 'Use as Input',
    copyTooltip: 'Copy High-Precision Exact Result',
    
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

    catLength: 'Length & Distance',
    catWeight: 'Weight & Mass',
    catTemp: 'Temperature',
    catArea: 'Area & Surface',
    catVolume: 'Volume & Capacity',
    catTime: 'Time & Duration',
    catSpeed: 'Speed & Velocity',
    catDigital: 'Digital Data & Storage',
    catEnergy: 'Energy & Calories',
    catPower: 'Power & Wattage',
    catPressure: 'Pressure & Fluids',
    catAngle: 'Angle & Geometry',
    catFrequency: 'Frequency & Signal',
    catFuel: 'Fuel Economy',

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

    pwaInstallTitle: 'Install App on Phone (iOS & Android)',
    pwaInstalledText: 'App is installed on your device',
    pwaInstallDesc: 'Add to home screen & work 100% offline',
    installBtn: 'Install',
    guidePurposeTitle: '1. Core Purpose & Key Benefits of Our App',
    guideModesTitle: '2. Default vs Complete Mode',
    guideSecondTitle: '3. How 2nd Button & Inverse Functions Work',
    guideHistoryTitle: '4. Using Calculation History',
    guideConverterTitle: '5. Detailed 14+ Unit Categories Breakdown',
    appSettingsGroup: 'Application Settings',
    manageSessionSub: 'Manage session, theme, and user guide',
    iosGuideTitle: 'iPhone Installation Guide (Safari):',
    iosStep1: 'Tap the Share button (square icon with arrow pointing up) in Safari.',
    iosStep2: 'Scroll down and tap "Add to Home Screen" or "Add Shortcut".',
    iosStep3: 'Tap "Add" at the top right. The app icon will appear on your home screen!',
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

    resultDetailTitle: 'Rincian Hasil Perhitungan',
    fullPrecisionValue: 'Nilai Lengkap (Presisi Tinggi)',
    scientificNotationLabel: 'Notasi Eksponensial / Ilmiah',
    valueStatusLabel: 'Status Nilai:',
    approximateValue: 'Nilai Pendekatan (≈)',
    exactValue: 'Nilai Eksak (=)',
    copyValueBtn: 'Salin Nilai',
    useAsInputBtn: 'Gunakan Masukan',
    copyTooltip: 'Salin Hasil Asli Presisi Lengkap',
    
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

    catLength: 'Panjang & Jarak',
    catWeight: 'Berat & Massa',
    catTemp: 'Suhu & Temperatur',
    catArea: 'Luas & Bidang',
    catVolume: 'Volume & Takaran Liquid',
    catTime: 'Waktu & Durasi',
    catSpeed: 'Kecepatan & Lajuan',
    catDigital: 'Data Digital & Memori',
    catEnergy: 'Energi & Kalori',
    catPower: 'Daya & Beban Listrik',
    catPressure: 'Tekanan & Fluida',
    catAngle: 'Sudut & Trigonometri',
    catFrequency: 'Frekuensi & Gelombang',
    catFuel: 'Bahan Bakar & Konsumsi',

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

    pwaInstallTitle: 'Pasang Aplikasi di HP (iOS & Android)',
    pwaInstalledText: 'Aplikasi sudah terpasang di HP Anda',
    pwaInstallDesc: 'Jadikan aplikasi mandiri tanpa peramban (Offline)',
    installBtn: 'Pasang',
    guidePurposeTitle: '1. Kegunaan & Manfaat Utama Aplikasi Kita',
    guideModesTitle: '2. Perbedaan Mode Default & Lengkap',
    guideSecondTitle: '3. Cara Kerja Tombol 2nd & Invers',
    guideHistoryTitle: '4. Menggunakan Riwayat Perhitungan',
    guideConverterTitle: '5. Rincian & Kegunaan 14+ Kategori Satuan',
    appSettingsGroup: 'Pengaturan Aplikasi',
    manageSessionSub: 'Kelola sesi, tampilan, dan panduan fitur',
    iosGuideTitle: 'Panduan Pasang di iPhone (Safari):',
    iosStep1: 'Ketuk tombol Bagikan / Share (ikon kotak tanda panah ke atas) di peramban Safari Anda.',
    iosStep2: 'Geser opsi menu ke bawah, lalu ketuk "Tambah ke Layar Utama" ("Add to Home Screen") atau "Tambah Pintasan".',
    iosStep3: 'Ketuk "Tambah" di pojok kanan atas. Ikon Smart Calc akan langsung muncul di HP Anda!',
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
