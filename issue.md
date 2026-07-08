# Issue: Revisi Alur Login & Penambahan Fitur Reset PIN

## 📌 Deskripsi Tugas

Lakukan perombakan pada alur Login aplikasi **SnapCash** untuk beralih dari penggunaan kata sandi (_password_) ke sistem **PIN** (6-digit bergaya OTP). Selain itu, tambahkan halaman untuk alur pemulihan akun (Lupa PIN dan Reset PIN).

Pastikan **seluruh halaman memiliki layout yang konsisten**. Tinggi _card_ (kotak putih) tidak boleh ada yang terlalu pendek atau terlalu panjang. Usahakan _card_ memiliki tinggi yang proporsional dan konsisten (misalnya menggunakan struktur `min-h-screen` di mobile dan `md:min-h-[600px] flex flex-col justify-between` di desktop) agar saat berpindah halaman tidak terjadi _layout shift_ yang mengganggu kenyamanan.

---

## 📝 Tahapan Implementasi

### 1. Revisi Halaman Login Utama (`auth/login.html`)

- **Hapus Input Password:** Hapus form input password, icon gembok, tombol toggle (show/hide), dan tautan "Lupa Password?". Hapus juga checkbox "Ingat saya".
- **Form Tersisa:** Halaman login ini hanya akan berfokus meminta **Email atau Nomor HP**.
- **Tombol Aksi:** Ubah teks tombol menjadi "Lanjut". Ketika diklik (atau disubmit), arahkan (_redirect_) pengguna ke halaman **Input PIN Login** (`auth/login-pin.html`).

### 2. Buat Halaman Input PIN Login (`auth/login-pin.html`)

- **Struktur & Desain:** Gunakan _wrapper/card_ yang ukurannya konsisten dengan halaman sebelumnya.
- **Header:** Judul "Masukkan PIN" dengan teks bantuan yang menyebutkan tujuan login.
- **Form PIN:** Sediakan **6 kotak input PIN** berdesain OTP. Kotak-kotak ini harus sama dengan desain PIN pada saat registrasi. Pastikan ada interaksi Javascript sederhana agar kursor berpindah otomatis saat mengetik angka.
- **Teks Bantuan (Lupa PIN):** Letakkan tautan / teks **"Lupa PIN?"** di bawah area form PIN yang akan mengarahkan pengguna ke `auth/forgot-pin.html`.
- **Tombol Aksi:** Tombol "Masuk ke Akun" (warna Lime) untuk mengonfirmasi login.

### 3. Buat Halaman Lupa PIN (`auth/forgot-pin.html`)

- **Header:** Judul "Lupa PIN?" dengan deskripsi instruksi, contoh: "Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan verifikasi."
- **Form Input:** Satu field input untuk mengisi **Email**.
- **Tombol Aksi:** Tombol "Kirim Verifikasi" (warna Lime). Untuk saat ini (mockup HTML), tombol ini dapat langsung diarahkan ke halaman Reset PIN (`auth/reset-pin.html`).
- **Navigasi Tambahan:** Sertakan tautan "Kembali ke halaman Login" di bagian bawah.

### 4. Buat Halaman Reset PIN (`auth/reset-pin.html`)

- **Header:** Judul "Buat PIN Baru" dengan deskripsi agar pengguna membuat PIN yang aman.
- **Form Input (2 Bagian):**
  1. Bagian "Masukkan PIN Baru" (6 kotak input bergaya OTP).
  2. Bagian "Konfirmasi PIN Baru" (6 kotak input bergaya OTP di bawahnya).
- **Tombol Aksi:** Tombol "Simpan PIN Baru" yang mengarahkan pengguna kembali ke halaman sukses atau kembali ke halaman Login.

### 5. Konsistensi Layout & Tampilan (_Full-screen_ / Seragam)

- **Krusial:** Pastikan semua _card_ putih di folder `auth/` memiliki kelas pembungkus yang seragam. Gunakan _spacing_ (padding/margin) atau properti flexbox (`flex-col justify-between` atau sejenisnya) agar halaman yang memiliki sedikit form (seperti Lupa PIN) tetap memiliki tinggi yang seimbang dengan halaman yang memiliki banyak form (seperti Reset PIN).

---

## 🎨 Panduan Desain (Design System)

Wajib mengikuti referensi visual dari halaman yang sudah ada (gunakan kelas Tailwind yang sudah teruji):

- **Warna Aksen / Tombol:** Lime (`bg-[#A8E034] hover:bg-[#97cf29]`).
- **Warna Teks Utama:** Charcoal (`text-gray-900` dan `text-gray-800`).
- **Warna Background Layar:** Soft Gray (`bg-[#F4F5F7]`).
- **Styling Input PIN OTP:** Kotak individu (contoh: `w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#A8E034]/20`).
- **Font:** Inter, pastikan hierarki ukuran font (_typography_) selaras dengan desain _existing_.

## ⚡ Persyaratan Teknis

1. Gunakan murni **HTML dan Tailwind CSS**.
2. Javascript boleh ditambahkan secukupnya secara _inline_ (atau di dalam tag `<script>`) hanya untuk menangani fungsionalitas UI (misalnya auto-focus pada field OTP).
3. Halaman harus responsif dan rapi baik di versi seluler (_mobile_) maupun _desktop_.
