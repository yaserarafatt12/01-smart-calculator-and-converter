# Dokumen Spesifikasi Arsitektur Sistem (Architecture Specification)

**Nama Proyek:** Kalkulator Pintar dan Konverter (Smart Calculator & Converter)  
**Repositori:** `01-smart-calculator-and-converter`  
**Status Arsitektur:** Approved (Disetujui)  
**Tingkat Portofolio:** Tingkat 1 (Bulan 1)  

---

## 1. Gambaran Umum Arsitektur (High-Level Architecture)

Aplikasi ini menggunakan arsitektur **Local-First Single Page Application (SPA)** berbasis Next.js App Router dan TypeScript. Seluruh pemrosesan perhitungan matematika dan kalkulasi konversi satuan unit dieksekusi 100% di sisi klien (*client-side execution*) pada peramban web pengguna. Hal ini menjamin kecepatan kalkulasi instan (< 1ms per operasi) serta privasi data penuh tanpa dependensi ke server backend backend eksternal.

```mermaid
graph TD
    subgraph Client Layer (Peramban Web)
        User[Pengguna Web / Seluler] --> UI[Antarmuka React / Next.js UI]
        
        subgraph Core Calculation Engines
            Tokenizer[Tokenizer Ekspresi] --> Parser[Shunting-Yard Parser]
            Parser --> Evaluator[Safe AST Math Evaluator]
            UnitEngine[Engine Konversi Satuan]
        end
        
        subgraph Local State & Storage
            State[React State Management]
            Storage[(Browser LocalStorage)]
        end
    end

    UI <--> State
    UI --> Tokenizer
    UI --> UnitEngine
    Evaluator --> UI
    State <--> Storage
```

---

## 2. Aliran Data Utama (Data Flow)

### 2.1 Aliran Evaluasi Ekspresi Matematika
1. **Masukan Pengguna:** Pengguna mengklik tombol kalkulator atau mengetik persamaan via papan ketik (contoh: `sin(30) + 15 * 2`).
2. **Tokenisasi (Tokenization):** Modul `tokenizer.ts` memecah string masukan menjadi urutan token terstruktur (Angka, Operator, Fungsi, Kurung).
3. **Penyusunan Parser (Parsing):** Modul `parser.ts` mengonversi token infiks menjadi notasi RPN (*Reverse Polish Notation*) atau pohon sintaks abstrak (AST) menggunakan algoritma *Shunting-Yard*.
4. **Evaluasi Aman (Safe Evaluation):** Modul `evaluator.ts` mengeksekusi operasi secara matematis tanpa menggunakan `eval()`.
5. **Pembaruan State & Tampilan:** Hasil perhitungan dikembalikan ke `React State`, ditampilkan di layar, dan dicatat secara otomatis ke `LocalStorage`.

### 2.2 Aliran Konversi Satuan Unit
1. Pengguna memilih kategori unit (Panjang, Massa, Suhu, Data Digital, Luas, Volume).
2. Pengguna menentukan nilai awal, unit asal (*from unit*), dan unit tujuan (*to unit*).
3. Engine `unitConverter.ts` melakukan pengubahan nilai ke *base unit* terstandar (misal: meter untuk panjang), kemudian mengonversinya ke *target unit*.
4. Hasil konversi ditampilkan secara *real-time* seiring masukan angka berubah.

---

## 3. Struktur Komponen & Modularitas

Struktur repositori disusun dengan modularitas ketat:

```
01-smart-calculator-and-converter/
├── app/                  # Next.js App Router Pages & Layouts
│   ├── layout.tsx        # Global Layout (Theme Provider, Fonts)
│   ├── page.tsx          # Main Application Entry Page
│   └── globals.css       # Tailwind CSS base styles
├── components/           # UI Components (Atomic Design Pattern)
│   ├── ui/               # Reusable primitives (Button, Card, Input, Tabs)
│   ├── calculator/       # Calculator display, keypad, mode toggles
│   ├── converter/        # Unit converter category selector & inputs
│   └── history/          # History drawer & memory display
├── lib/                  # Core Math Logic & Utilities
│   ├── math/             # Tokenizer, Parser, Evaluator engines
│   ├── converter/        # Unit conversion tables & formulas
│   └── storage/          # LocalStorage wrappers & history manager
├── tests/                # Automated Test Suites
│   ├── unit/             # Math parser & unit converter tests (Vitest)
│   └── e2e/              # End-to-end user flow tests (Playwright)
├── docs/                 # Documentation (PRD, Architecture, Privacy, ADR)
└── tasks/                # Implementation Plan & Task Backlog
```

---

## 4. Keamanan Arsitektur

- **Tanpa `eval()`:** Evaluasi masukan matematika menggunakan *Safe AST Parser* buatan sendiri untuk mencegah *arbitrary code execution*.
- **Sanitasi Masukan:** Semua string masukan dibersihkan dari karakter non-matematika sebelum diproses oleh parser.
- **Isolasi Lingkungan:** Kredensial dan variabel konfigurasi eksternal dikelola murni melalui `.env.local` yang diisolasi dari VCS Git.

---

## 5. Pertimbangan Scalability & Performa

- **Zero Network Latency:** Karena tidak ada pemanggilan API jaringan untuk kalkulasi utama, performa aplikasi bersifat instant.
- **Lazy Loading & Code Splitting:** Komponen modul konverter dan modul riwayat di-load secara dinamis untuk memperkecil ukuran bundle JavaScript awal (< 100KB gzipped).
- **Memoization:** Fungsi perhitungan ilmiah dan rumus konversi di-memoize menggunakan React `useMemo` dan `useCallback` untuk mencegah re-render antarmuka yang tidak perlu.
