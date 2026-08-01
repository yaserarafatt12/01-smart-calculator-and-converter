# Task Checklist: Kalkulator Pintar dan Konverter

## Phase 1: Foundation & Core Setup
- [x] Task 1: Inisialisasi Proyek & Konfigurasi Build (`package.json`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `vitest.config.ts`, `playwright.config.ts`, `.env.example`, `.gitignore`)
- [x] Task 2: Menyusun Dokumen PRD (`docs/product-requirements.md`), Arsitektur (`docs/architecture.md`), Privasi (`docs/privacy.md`), dan Decision Records (`docs/decisions.md`)

## Phase 2: Logic Engines & Unit Testing
- [x] Task 3: Membangun Safe Math Parser Engine (`lib/calculator/math-parser.ts`) tanpa `eval()`, penanganan pembagian nol, presisi desimal, dan detektor lokasi kesalahan sintaks
- [x] Task 4: Membangun Unit Conversion Engine (`lib/converter/unit-conversion.ts`) untuk 5 kategori satuan (Panjang, Berat, Suhu, Waktu, Luas)
- [x] Task 5: Membangun LocalStorage History Storage Manager (`lib/storage/history-storage.ts`) untuk menyimpan maks 20 riwayat transaksi
- [x] Task 6: Menulis Vitest Unit Tests (`tests/unit/math-parser.test.ts` & `tests/unit/unit-conversion.test.ts`)

## Phase 3: User Interface & Theme Provider
- [x] Task 7: Membangun Tema Terang/Gelap (`app/globals.css`, `components/ui/ThemeToggle.tsx`) & Header Navigasi (`components/ui/Header.tsx`)
- [x] Task 8: Membangun Interface Kalkulator (`components/calculator/Display.tsx`, `components/calculator/Keypad.tsx`, `components/calculator/ErrorHint.tsx`)
- [x] Task 9: Membangun Interface Panel Riwayat (`components/history/HistoryPanel.tsx`) & Interface Konverter Satuan (`components/converter/UnitConverter.tsx`)
- [x] Task 10: Mengintegrasikan Navigasi Papan Ketik (Keyboard listener global) di `app/page.tsx`

## Phase 4: E2E Testing, Documentation & Final Verification
- [x] Task 11: Menulis Pengujian Playwright E2E (`tests/e2e/calculator.spec.ts`)
- [x] Task 12: Menyusun README.md 17+ Seksi Lengkap, CHANGELOG.md, CONTRIBUTING.md, dan LICENSE
