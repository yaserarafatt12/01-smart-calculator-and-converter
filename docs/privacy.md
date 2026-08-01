# Dokumen Kebijakan Privasi & Perlindungan Data (Data Privacy Policy)

**Nama Proyek:** Kalkulator Pintar dan Konverter (Smart Calculator & Converter)  
**Terakhir Diperbarui:** 2026-08-01  
**Prinsip Utama:** Privasi Berbasis Desain (*Privacy by Design*) & Pemrosesan 100% Lokal Utamakan Pengguna.

---

## 1. Komitmen Privasi Utama

Aplikasi **Kalkulator Pintar dan Konverter** dibangun dengan memegang teguh prinsip **Privacy-First & Zero Data Collection**. Kami percaya bahwa kalkulasi harian, perhitungan finansial pribadi, dan riwayat konversi pengguna adalah milik pribadi yang tidak boleh dikumpulkan, dilacak, atau dijual ke pihak mana pun.

---

## 2. Rincian Data yang Diproses

| Kategori Data | Jenis Data Spesifik | Tujuan Pengumpulan | Lokasi Pemrosesan & Penyimpanan |
|---|---|---|---|
| **Riwayat Kalkulasi** | Ekspresi angka & hasil perhitungan | Menampilkan riwayat perhitungan sebelumnya | Peramban Lokal (`LocalStorage` perangkat pengguna) |
| **Nilai Memori** | Nilai terimpan (M+, M-, MR) | Fungsi memori kalkulator bawaan | Peramban Lokal (`LocalStorage` perangkat pengguna) |
| **Preferensi UI** | Pilihan tema (Dark/Light mode) | Keberlanjutan tampilan visual | Peramban Lokal (`LocalStorage` perangkat pengguna) |
| **Data Pengidentifikasi** | Alamat Email, IP, ID Perangkat | **TIDAK DIKUMPULKAN** | Tidak ada |
| **Data Lokasi** | Koordinat GPS, Negara | **TIDAK DIKUMPULKAN** | Tidak ada |

---

## 3. Pemrosesan Lokal vs Cloud (Local-First Architecture)

1. **Pemrosesan 100% di Perangkat Pengguna (*Client-Side Processing*):**
   - Seluruh evaluasi ekspresi matematika, rumus trigonometri, dan perhitungan konversi unit diproses secara langsung di memori CPU/peramban pengguna.
   - Tidak ada angka, rumus, atau masukan teks yang dikirimkan melalui jaringan internet ke server backend atau pihak ketiga.
2. **Penyimpanan Lokal Mandiri:**
   - Data riwayat hanya berada di `LocalStorage` peramban web pengguna.
   - Pengguna dapat menghapus seluruh riwayat kapan saja hanya dengan menekan tombol **"Hapus Riwayat"** di antarmuka aplikasi.

---

## 4. Kebijakan Retensi & Penghapusan Data

- **Masa Penyimpanan:** Riwayat disimpan di peramban lokal pengguna hingga maksimal 50 catatan terbaru atau sampai pengguna membersihkan data peramban (*browser cache/storage*).
- **Hak Penghapusan Permanen:** Tombol "Hapus Riwayat" menghapus secara seketika (*instant purge*) seluruh catatan kalkulasi dari `LocalStorage` tanpa menyisakan cadangan.

---

## 5. Pihak Ketiga & Pelacak (No Trackers)

1. **Bebas Pelacak Iklan:** Aplikasi ini 100% bebas dari skrip pelacak iklan (*Google Analytics, Facebook Pixel, ad trackers*).
2. **Tanpa Penggunaan AI External:** Perhitungan matematika menggunakan engine internal deterministic murni tanpa mengirimkan masukan ke API LLM eksternal.

---

## 6. Kontak & Pertanyaan Privasi

Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, Anda dapat mengajukan pertanyaan melalui repositori GitHub resmi pada seksi *Issues*.
