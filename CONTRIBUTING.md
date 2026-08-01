# Panduan Kontribusi (Contributing Guide)

Terima kasih telah berkontribusi pada proyek **Kalkulator Pintar dan Konverter**! Sebelum mengirimkan kontribusi atau membuat Pull Request (PR), silakan baca dan pahami panduan berikut.

## 🚨 Aturan Wajib Keamanan & Privasi

Sesuai standar repositori proyek, **DILARANG KERAS** memasukkan hal-hal berikut ke dalam kode, komit, issue, atau Pull Request:

1. **Kata sandi**
2. **Kunci layanan / API keys**
3. **Data pengguna** (data identitas pribadi, riwayat kalkulasi sensitif pengguna)
4. **Berkas konfigurasi rahasia** (`.env.local`, file kredensial, dsb.)
5. **Riwayat percakapan pribadi**

> ⚠️ **Penting**: Setiap kontribusi yang melanggar aturan di atas akan ditolak secara otomatis dan seluruh riwayat komit terkait harus dibersihkan sebelum disetujui.

---

## 🛠️ Alur Kerja Kontribusi

1. **Fork & Clone Repositori**
   ```bash
   git clone https://github.com/username/01-smart-calculator-and-converter.git
   cd 01-smart-calculator-and-converter
   ```

2. **Buat Cabang (Branch) Baru**
   Gunakan format penamaan branch yang jelas:
   - `feature/nama-fitur`
   - `fix/deskripsi-perbaikan`
   - `docs/pembaruan-dokumentasi`

3. **Gunakan Variabel Lingkungan Lokal**
   Salin `.env.example` menjadi `.env.local` untuk pengujian lokal. **Jangan pernah mengkomit `.env.local` ke git.**

4. **Jalankan Pengujian & Perapian Kode**
   Pastikan seluruh unit test dan E2E test berhasil serta kode rapi:
   ```bash
   npm run test
   npm run test:e2e
   ```

5. **Kirimkan Pull Request (PR)**
   - Berikan deskripsi PR yang jelas mengenai perubahan yang dilakukan.
   - Pastikan tidak ada kredensial atau data sensitif yang terbawa dalam komit.
