# Dokumen Kebutuhan Produk (Product Requirements Document - PRD)

**Nama Proyek:** Kalkulator Pintar dan Konverter (Smart Calculator & Converter)  
**Versi:** 1.0.0  
**Tanggal:** 2026-08-01  
**Tingkat Portofolio:** Tingkat 1 (Bulan 1) — Logika Pemrograman & Pengelolaan Keadaan UI  

---

## 1. Ringkasan Produk

**Kalkulator Pintar dan Konverter** adalah aplikasi web interaktif yang menggabungkan kalkulator ilmiah (*scientific calculator*) presisi tinggi dengan sistem konversi satuan (*unit converter*) serbaguna. Aplikasi ini dirancang dengan pendekatan *local-first* yang mengedepankan evaluasi matematika aman tanpa `eval()`, penanganan error yang kuat, tampilan antarmuka modern yang responsif, serta penyimpanan riwayat kalkulasi lokal.

---

## 2. Masalah

Banyak aplikasi kalkulator bawaan sistem operasional atau situs web konversi online memiliki keterbatasan berikut:
1. **Antarmuka Kaku dan Penuh Iklan:** Banyak situs konversi di internet dibebani skrip iklan berat dan pop-up yang mengganggu produktivitas.
2. **Riwayat Kalkulasi Terbatas:** Pengguna sering kehilangan jejak langkah perhitungan sebelumnya ketika berpindah mode atau menyegarkan halaman.
3. **Risiko Evaluasi Ekspresi:** Banyak kalkulator web sederhana menggunakan fungsi `eval()` JavaScript yang berisiko dari sisi keamanan (*security vulnerability*) dan tidak menangani penanganan pembagian dengan nol atau sintaks salah secara graceful.
4. **Tidak Mendukung Penggunaan Luring (Offline):** Pengguna memerlukan alat kalkulasi dan konversi yang dapat diakses dengan cepat kapan saja tanpa harus bergantung pada koneksi internet.

---

## 3. Sasaran (Goals)

- Membangun *math evaluation engine* berbasis tokenisasi & parsing parser (Shunting-Yard / Abstract Syntax Tree) yang aman 100% tanpa `eval()`.
- Menyediakan modul konversi unit komprehensif untuk Panjang, Massa/Berat, Suhu, Luas, Volume, dan Penyimpanan Data Digital.
- Menyediakan fitur riwayat kalkulasi (*calculation history*) yang tersimpan secara lokal di `LocalStorage` peramban.
- Memastikan antarmuka yang sangat responsif, memiliki mode Gelap/Terang (*Dark/Light mode*), dan aksesibel (skor WCAG AA).
- Memcapai cakupan pengujian unit (Unit Test) minimal 90% pada logika matematika dasar dan konversi unit.

---

## 4. Bukan Sasaran (Non-Goals)

- Fitur grafik plotter 3D interaktif yang memerlukan library rendering berat (ditunda ke iterasi lanjutan).
- Autentikasi berbasis cloud atau penyimpan data riwayat di pangkalan data terpusat (aplikasi berfokus pada privasi *local-first*).
- Integrasi konversi mata uang terpusat dengan update detik demi detik via websocket (konversi mata uang opsional hanya menggunakan pembaruan kurs harian dengan nilai fallback lokal).

---

## 5. Pengguna Utama & Cerita Pengguna (User Stories)

### Pengguna Utama
- **Pelajar SMA / Mahasiswa (Usia 15-22 tahun):** Membutuhkan kalkulator ilmiah untuk pekerjaan rumah matematika, fisika, dan kimia, serta konversi satuan unit akademik.
- **Pengembang & Teknisi:** Membutuhkan konversi cepat antar unit data (Byte, KB, MB, GB) dan sistem bilangan (Desimal, Biner, Heksadesimal).
- **Pengguna Umum:** Membutuhkan kalkulator harian yang cepat, bebas iklan, dan dapat diakses dari smartphone maupun laptop.

### Cerita Pengguna
- **US-01:** Sebagai pelajar, saya ingin memasukkan ekspresi matematika kompleks dengan tanda kurung agar saya dapat menghitung persamaan fisika dengan benar.
- **US-02:** Sebagai pelajar, saya ingin melihat riwayat kalkulasi sebelumnya agar saya dapat menyalin kembali hasil perhitungan tanpa perlu mengetik ulang.
- **US-03:** Sebagai pengembang, saya ingin mengonversi ukuran berkas dari Megabyte ke Gigabyte agar dapat menghitung alokasi memori aplikasi.
- **US-04:** Sebagai pengguna seluler, saya ingin menggunakan aplikasi dengan antarmuka yang nyaman di layar kecil dan memiliki mode gelap agar tidak membuat mata lelah.

---

## 6. Kebutuhan Fungsional

### Fitur Utama (Versi Pertama / MVP)
1. **Mode Kalkulator Standar & Ilmiah:**
   - Operasi aritmatika dasar (`+`, `-`, `*`, `/`, `%`).
   - Fungsi ilmiah: Trigonometri (`sin`, `cos`, `tan`), Logaritma (`log`, `ln`), Pangkat (`^`, `x²`), Akar kuadrat (`√`), dan Konstanta (`π`, `e`).
   - Penanganan tanda kurung presisi `(` dan `)`.
   - Pemutakhiran tampilan real-time saat tombol ditekan.
2. **Mode Konverter Satuan (Unit Converter):**
   - **Panjang:** Milimeter (mm), Sentimeter (cm), Meter (m), Kilometer (km), Inci (in), Kaki (ft), Yard (yd), Mile (mi).
   - **Massa/Berat:** Miligram (mg), Gram (g), Kilogram (kg), Ton (t), Ounce (oz), Pound (lb).
   - **Suhu:** Celsius (°C), Fahrenheit (°F), Kelvin (K).
   - **Data Digital:** Bit, Byte, KB, MB, GB, TB.
   - **Luas & Volume:** Meter persegi ($m^2$), Hektar (ha), Liter (L), Mililiter (mL).
3. **Penyimpanan Riwayat & Memori:**
   - Menyimpan hingga 50 riwayat kalkulasi terakhir secara otomatis di `LocalStorage`.
   - Fitur memori kalkulator: `MC` (Clear), `MR` (Recall), `M+` (Add), `M-` (Subtract).
   - Tombol "Hapus Riwayat" permanen.
4. **Antarmuka & Pengalaman Pengguna (UI/UX):**
   - Switcher tema Gelap/Terang (*Dark/Light Mode*).
   - Layar tampilan ganda (Tampilan Ekspresi dan Tampilan Hasil).
   - Umpan balik visual saat tombol ditekan (*active state animation*).

### Fitur Lanjutan (Versi Mendatang)
- Konversi mata uang dengan nilai tukar harian.
- Pengenalan tulisan tangan masukan ekspresi matematika (OCR).
- Mode kalkulator finansial (Bunga majemuk & Simulasi pinjaman).

---

## 7. Kebutuhan Nonfungsional

- **Performa:** Waktu evaluasi ekspresi kalkulasi < 50ms; waktu muat halaman awal < 1.5 detik pada jaringan 3G.
- **Usabilitas:** Tampilan responsif penuh (*Fluid Layout*) dari resolusi 320px (seluler) hingga 4K desktop.
- **Keamanan:** 100% bebas dari skrip `eval()` JavaScript untuk mencegah serangan *code injection*.
- **Privasi:** Seluruh data riwayat disimpan di perangkat lokal pengguna; tidak ada pelacak pihak ketiga.
- **Aksesibilitas:** Navigasi penuh via papan ketik (*keyboard navigation*) dan pembaca layar (*screen reader accessible* dengan atribut ARIA).

---

## 8. Kondisi Kesalahan & Penanganannya

| Kondisi Kesalahan | Penyebab | Respons & Penanganan Aplikasi |
| --- | --- | --- |
| Pembagian dengan Nol (`x / 0`) | Masukan pengguna `5 / 0` | Menampilkan pesan `"Error: Pembagian Nol"` pada layar hasil tanpa membuat app crash. |
| Sintaks Tidak Valid | Kurung buka tanpa kurung tutup, contoh `5 + (3 *` | Menampilkan pesan `"Error: Sintaks Tidak Valid"` dan menyorot posisi tombol yang perlu diperbaiki. |
| Limpahan Angka (*Overflow*) | Perhitungan angka melebihi `Number.MAX_VALUE` | Menampilkan `"Infinity"` atau `"Error: Angka Terlalu Besar"`. |
| Masukan Unit Konversi Negatif | Mengisi berat/volume dengan angka negatif | Mencegah tombol hitung dan menampilkan notifikasi `"Nilai satuan harus positif"`. |
| Gagal Muat LocalStorage | Fitur privasi browser memblokir penyimpanan | Menggunakan *in-memory fallback state* secara transparan tanpa mengganggu kalkulasi aktif. |

---

## 9. Kriteria Keberhasilan

1. Seluruh 100+ pengujian unit (Unit Tests) untuk engine kalkulasi matematika dan konversi unit berhasil lulus ( Pass Rate 100%).
2. Pengujian integrasi E2E dengan Playwright untuk skenario pengguna utama lulus tanpa kegagalan.
3. Bebas dari kebocoran kata sandi, API key, atau data sensitif di repositori.
4. Skor performa Lighthouse > 90 untuk Performance, Accessibility, dan Best Practices.
5. Aplikasi dapat diakses secara publik via URL Vercel yang valid.

---

## 10. Tahapan Pengerjaan

1. **Tahap 1 (Fondasi & Desain):** Inisialisasi repositori Next.js 14, pengaturan Tailwind CSS, penyiapan komponen UI atomic (Button, Display, Card, Tabs).
2. **Tahap 2 (Logika Inti & Parser Matematika):** Pembuatan parser ekspresi matematika (*Tokenizer & Evaluator*) serta modul konversi satuan unit murni TypeScript.
3. **Tahap 3 (Integrasi UI & LocalStorage):** Menghubungkan parser ke UI, mengintegrasikan memori & riwayat ke `LocalStorage`, dan mengimplementasikan Mode Gelap/Terang.
4. **Tahap 4 (Pengujian & Dokumentasi):** Menulis pengujian otomatis (Vitest & Playwright), menyelesaikan dokumentasi arsitektur/privasi/README, dan melakukan deployment.
