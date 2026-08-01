# Catatan Keputusan Arsitektur (Architectural Decision Records - ADR)

Dokumen ini mencatat seluruh keputusan arsitektur dan teknis penting yang diambil selama siklus hidup pengembangan proyek **Kalkulator Pintar dan Konverter**.

---

## ADR-001: Pemilihan Engine Evaluasi Matematika (Custom AST Parser vs `eval()`)

* **Tanggal:** 2026-08-01
* **Status:** Disetujui (Accepted)
* **Penulis:** Lead Engineer
* **Komponen Terkait:** `lib/math/` (Tokenizer, Parser, Evaluator)

### 1. Konteks dan Masalah
Aplikasi membutuhkan kemampuan untuk mengevaluasi ekspresi matematika kompleks yang dimasukkan pengguna (seperti `sin(45) + (2^3 * 5)`). Di JavaScript, pendekatan paling mudah adalah menggunakan fungsi bawaan `eval()` atau `Function()`. Namun, metode ini membawa risiko keamanan yang sangat besar (*arbitrary code execution*) dan rentan terhadap XSS.

### 2. Pilihan Solusi yang Dipertimbangkan

#### Opsi 1: Menggunakan `eval()` JavaScript
* **Keunggulan (+):** Sangat mudah diimplementasikan (1 baris kode).
* **Kelemahan (-):** Risiko celah keamanan XSS masif; tidak ada kontrol terhadap kesalahan pembagian dengan nol; performa tidak dapat dioptimalkan.

#### Opsi 2: Menggunakan Pustaka Eksternal (`mathjs`)
* **Keunggulan (+):** Fitur matematika sangat lengkap dan teruji.
* **Kelemahan (-):** Ukuran bundle JavaScript sangat besar (> 500KB); menambah ketergantungan eksternal yang tidak diperlukan untuk proyek portofolio Tingkat 1.

#### Opsi 3: Membangun Custom Tokenizer & Shunting-Yard Parser (AST Evaluator)
* **Keunggulan (+):** Safe 100% tanpa `eval()`; zero external dependencies; membuktikan penguasaan logika struktur data & algoritma tingkat tinggi bagi portofolio; ukuran bundle sangat kecil (< 5KB).
* **Kelemahan (-):** Membutuhkan usaha pengembangan dan pembuatan unit test ekstra.

### 3. Keputusan Akhir
**Pilihan Yang Dipilih:** **Opsi 3 — Membangun Custom Tokenizer & Shunting-Yard Parser (AST Evaluator)**.

#### Alasan Rasional:
Membangun custom parser membuktikan kemampuan logika pemrograman mendasar sesuai target Tingkat 1 Roadmap Portofolio, sekaligus menjamin keamanan 100% dan performa super cepat.

---

## ADR-002: Arsitektur Penyimpanan Riwayat (Local-First `LocalStorage` vs Remote DB)

* **Tanggal:** 2026-08-01
* **Status:** Disetujui (Accepted)
* **Penulis:** Lead Engineer
* **Komponen Terkait:** `lib/storage/` (History Manager)

### 1. Konteks dan Masalah
Aplikasi membutuhkan fitur untuk menyimpan riwayat kalkulasi dan nilai memori pengguna. Apakah data harus disimpan ke pangkalan data terpusat (PostgreSQL/Supabase) atau di perangkat pengguna secara lokal?

### 2. Pilihan Solusi yang Dipertimbangkan

#### Opsi 1: Pangkalan Data Cloud (Supabase/PostgreSQL)
* **Keunggulan (+):** Riwayat dapat diakses dari beberapa perangkat pengguna jika pengguna login.
* **Kelemahan (-):** Membutuhkan sistem autentikasi rumit, menambah latency jaringan, dan melanggar prinsip privasi sederhana untuk proyek kalkulator awal.

#### Opsi 2: Browser `LocalStorage` (Local-First)
* **Keunggulan (+):** Tanpa jaringan/latensi (instant access); 100% menjaga privasi pengguna; aplikasi dapat bekerja secara offline penuh; tidak membutuhkan biaya database backend.
* **Kelemahan (-):** Riwayat terisolasi di satu peramban/perangkat.

### 3. Keputusan Akhir
**Pilihan Yang Dipilih:** **Opsi 2 — Browser `LocalStorage` (Local-First)**.

---

## ADR-003: Kerangka Kerja UI & Styling (Next.js 14 App Router + Tailwind CSS)

* **Tanggal:** 2026-08-01
* **Status:** Disetujui (Accepted)
* **Penulis:** Lead Engineer
* **Komponen Terkait:** `app/`, `components/`

### 1. Konteks dan Masalah
Menentukan stack UI yang modern, responsif, ramah pengembangan, dan mendukung performa tinggi.

### 2. Keputusan Akhir
Menggunakan **Next.js 14 (App Router)** dikombinasikan dengan **Tailwind CSS** dan **Lucide Icons**.  
*Alasan:* Mendukung struktur komponen React 18 terorganisir, pembuatan utility class Tailwind yang fleksibel untuk mode gelap/terang, serta kemudahan deployment ke Vercel Edge Network.
