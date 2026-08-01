# Smart Calculator & Unit Converter v1.0.0

> Aplikasi web kalkulator ilmiah presisi tinggi dan konverter 14+ kategori satuan serbaguna berbasis *Local-First* tanpa `eval()`. Produk inti selesai & siap digunakan.

---

## 📌 Status Proyek: `Kalkulator & Konverter Satuan v1.0.0 (Release Frozen)`

- 🌐 **Live Demo:** [https://smart-calculator-and-converter.vercel.app](https://smart-calculator-and-converter.vercel.app)
- 💻 **GitHub Repository:** [https://github.com/yaserarafatt12/01-smart-calculator-and-converter](https://github.com/yaserarafatt12/01-smart-calculator-and-converter)
- ✅ **Produk Inti Selesai (100% Core Complete)**
- ✅ **Vitest Unit Testing:** 84/84 Test Lulus (100%)
- ✅ **Responsif & Aksesibel:** Diuji pada layar 320px, 360px, 390px, 768px+
- ✅ **Bebas Iklan & Bekerja Offline (Local-First)**

---

## Masalah

Di era digital saat ini, pengguna kerap menemukan kendala ketika menggunakan alat kalkulasi dan konversi daring standar:
1. **Antarmuka Dipenuhi Iklan:** Banyak situs konversi unit gratis yang lambat karena dibebani skrip iklan berat dan pop-up yang mengganggu produktivitas.
2. **Keterbatasan Alat bawaan OS:** Kalkulator bawaan sistem operasional sering kali tidak memiliki fitur konversi 14+ satuan yang komprehensif atau riwayat kalkulasi interaktif yang dapat disalin kembali dengan mudah.
3. **Risiko Evaluasi Keamanan:** Aplikasi kalkulator web sederhana umumnya mengandalkan fungsi `eval()` JavaScript yang membahayakan keamanan (*code injection*) serta tidak dapat menangani ekspresi sintaks salah atau pembagian nol secara anggun.
4. **Ketergantungan Jaringan:** Banyak alat konversi memerlukan koneksi internet aktif bahkan hanya untuk perhitungan satuan dasar.

---

## Solusi

**Kalkulator Pintar dan Konverter Satuan** menghadirkan solusi kalkulasi modern yang ringan, cepat, dan aman:
- **Custom Math Evaluation Engine:** Menggunakan Tokenizer dan Shunting-Yard Parser buatan sendiri untuk mengevaluasi ekspresi aritmatika dan fungsi ilmiah 100% aman tanpa `eval()`.
- **Dua Mode Kalkulator (Default & Lengkap):**
  - **Mode Default:** Tombol angka & operator berukuran besar yang lega dan nyaman dipencet.
  - **Mode Lengkap:** Tata letak 4-kolom ilmiah presisi dengan hierarki standar (tombol `AC`, `C`, `⌫` di baris teratas) serta indikator aktif tombol `2nd` (transisi `sin` $\rightarrow$ `sin⁻¹`, `log` $\rightarrow$ `10ˣ`, `ln` $\rightarrow$ `eˣ`, `√x` $\rightarrow$ `x²`).
- **Konverter 14+ Kategori Satuan Unit:** Menyediakan konversi instan untuk Panjang, Berat & Massa, Suhu, Luas, Volume, Waktu, Kecepatan, Data Digital, Energi, Daya, Tekanan, Sudut, Frekuensi, dan Bahan Bakar dengan fitur pencarian real-time dan drawer *"Lihat Hasil dalam X Satuan"*.
- **Penyimpanan Local-First & Bottom Sheet Riwayat:** Menyimpan riwayat kalkulasi dan nilai memori kalkulator secara otomatis di `LocalStorage` peramban dengan dialog konfirmasi sebelum menghapus semua.
- **Format Angka & Presisi Nyata:** Menampilkan format ribuan yang nyaman dibaca (`125.568,357852`), sementara tombol **Salin** tetap menyalin nilai presisi asli unrounded secara utuh.

---

## Demonstrasi & Dokumentasi

* 🌐 **Versi Daring (Live Demo):** [https://smart-calculator-and-converter.vercel.app](https://smart-calculator-and-converter.vercel.app)
* 📑 **Dokumentasi PRD & Arsitektur:** [`docs/product-requirements.md`](docs/product-requirements.md) & [`docs/architecture.md`](docs/architecture.md)
* 🚀 **Launch Assets & Studi Kasus:** [`docs/launch-assets/case-study.md`](docs/launch-assets/case-study.md) & [`docs/launch-assets/social-media-captions.md`](docs/launch-assets/social-media-captions.md)

---

## Fitur Utama v1.0.0

- [x] **Kalkulator Ilmiah Presisi:** Operasi dasar (`+`, `-`, `×`, `÷`), fungsi trigonometri (`sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹`), logaritma (`log`, `ln`, `10ˣ`, `eˣ`), eksponen (`^`), akar kuadrat (`√x`), pangkat dua (`x²`), dan tanda kurung bersarang.
- [x] **Mode 2nd Transformasi Visual:** Indikator titik aktif berwarna amber dengan perubahan otomatis label fungsi ilmiah.
- [x] **Konverter 14+ Kategori Satuan:** Panjang, Berat/Massa, Suhu, Luas, Volume, Waktu, Kecepatan, Data Digital, Energi, Daya, Tekanan, Sudut, Frekuensi, Bahan Bakar.
- [x] **Pencarian Satuan Real-Time:** Menemukan satuan unit secara cepat lewat kolom pencarian.
- [x] **Drawer "Lihat Hasil dalam X Satuan":** Menampilkan seluruh konversi satuan dalam satu kategori secara bersamaan.
- [x] **Manajemen Memori & Riwayat:** Tombol `MC`, `MR`, `Ans` serta laci riwayat kalkulasi interaktif yang dilengkapi dialog konfirmasi saat menghapus.
- [x] **Safe AST Parser:** Penanganan ekspresi tanpa `eval()` dengan proteksi pembagian dengan nol dan sorotan kesalahan sintaks (*error highlight*).
- [x] **Tema Responsif & Aksesibilitas:** Dukungan penuh Mode Gelap/Terang, layout serba-responsif dari 320px hingga desktop.
- [x] **Multi-Bahasa (i18n):** Deteksi otomatis peramban (English / Indonesian) dengan sakelar `EN | ID`.

---

## Pengujian & Kualitas Kode

Aplikasi ini dilengkapi pengujian unit otomatis penuh menggunakan **Vitest**:

```bash
# Menjalankan 84 Unit Test Vitest
npm test
```

### Hasil Pengujian Unit:
- `tests/unit/math-parser.test.ts`: **26/26 Passed**
- `tests/unit/scientific-calculator.test.ts`: **15/15 Passed**
- `tests/unit/unit-conversion.test.ts`: **29/29 Passed**
- `tests/unit/advanced-converter.test.ts`: **10/10 Passed**
- `tests/unit/history-storage.test.ts`: **4/4 Passed**
- **Total: 84/84 Lulus (100%)**

---

## Lisensi

Proyek ini dilindungi di bawah lisensi [MIT](LICENSE).
