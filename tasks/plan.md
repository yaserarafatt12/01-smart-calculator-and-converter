# Implementation Plan: Kalkulator Pintar dan Konverter

## Overview

Membangun aplikasi web **Kalkulator Pintar dan Konverter** berbasis Next.js 14, React 18, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan kalkulator ilmiah presisi tinggi dengan *custom safe math parser* tanpa `eval()`, konverter 6 kategori unit terpopuler, penyimpanan riwayat kalkulasi lokal (`LocalStorage`), serta antarmuka modern yang responsif dan mendukung mode gelap.

## Architecture Decisions

- **ADR-001:** Menggunakan Custom Tokenizer & Shunting-Yard Parser (AST Evaluator) murni TypeScript tanpa `eval()` untuk evaluasi matematika aman.
- **ADR-002:** Arsitektur Local-First menggunakan peramban `LocalStorage` untuk menyimpan riwayat kalkulasi dan nilai memori tanpa backend server.
- **ADR-003:** Penggunaan Next.js 14 App Router + Tailwind CSS + Lucide Icons untuk antarmuka yang modern, cepat, dan aksesibel.

---

## Task List

### Phase 1: Foundation & Core Setup
- [ ] Task 1: Inisialisasi Proyek & Konfigurasi Build (package.json, tsconfig, tailwind, vitest, playwright)
- [ ] Task 2: Membuat Sistem Desain UI & Provider Tema (Dark/Light mode switch & primitives)

### Checkpoint: Foundation
- [ ] Seluruh konfigurasi typescript dan linter bebas error
- [ ] Server pengembangan `npm run dev` dapat dijalankan bersih tanpa error

### Phase 2: Logic Engines & Atomic Components
- [ ] Task 3: Implementasi Math Evaluation Engine (Tokenizer, Parser, Evaluator) & Unit Tests
- [ ] Task 4: Implementasi Unit Conversion Engine (Length, Weight, Temp, Data, Area, Volume) & Unit Tests
- [ ] Task 5: Komponen Display & Keypad Kalkulator Ilmiah
- [ ] Task 6: Komponen Unit Converter Interface & Selector

### Checkpoint: Core Features
- [ ] Unit tests Vitest untuk parser matematika dan konverter satuan lulus 100%
- [ ] Fungsi perhitungan dasar dan ilmiah dapat diuji langsung di antarmuka

### Phase 3: Local Storage, History & Polish
- [ ] Task 7: Integrasi LocalStorage History Manager & Memory Functions (MC, MR, M+, M-)
- [ ] Task 8: Pengujian End-to-End dengan Playwright & Aksesibilitas WCAG
- [ ] Task 9: Dokumentasi Lengkap 17+ Seksi README.md & Siap Deployment

### Checkpoint: Complete
- [ ] Seluruh pengujian Vitest dan Playwright pass 100%
- [ ] Dokumentasi lengkap tanpa ada kredensial terbuka
- [ ] Siap untuk penggabungan kode dan deployment ke Vercel

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Pembagian dengan nol atau presisi desimal JavaScript (`0.1 + 0.2 = 0.30000000000000004`) | Medium | Penggunaan fungsi *rounding helper* / precision formatter (`Number.prototype.toFixed` / `toPrecision`) pada evaluator. |
| Sintaks masukan kurung tidak seimbang (`5 + (3 * 2`) | Medium | Parser melakukan validasi kurung saat proses tokenisasi dan memberikan pesan error yang jelas. |
| `LocalStorage` diblokir oleh browser di mode Incognito | Low | Implementasi *in-memory fallback state* jika `localStorage` melempar `QuotaExceededError` atau `SecurityError`. |

---

## Open Questions

- *Apakah konversi mata uang perlu ditambahkan di rilis 1.0?* — Ditunda ke rilis 1.1 agar tidak mengganggu kestabilan *offline-first architecture*.
