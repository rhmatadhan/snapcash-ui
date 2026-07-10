# [Feature] Halaman Transfer (Step 1: Pilih Tujuan)

## 📖 Deskripsi
Membangun halaman awal Transfer (Step 1) untuk aplikasi SnapCash. Halaman ini berfungsi agar pengguna dapat menentukan tujuan transfer (sesama SnapCash, Bank Lain, atau E-Wallet) dan menginput detail tujuan, serta memilih dari daftar tujuan yang sering/terakhir digunakan.

Referensi desain dan standar UI menggunakan aturan di `DESIGN.md`.

## 🎨 UI/UX Upgrade (Modern & Kekinian)
Berdasarkan desain referensi sebelumnya (`code.html`), bagian **Tujuan Transfer** di-upgrade agar lebih fleksibel, *scalable*, dan sesuai dengan pola aplikasi finansial modern. Mengingat tujuan transfer masa kini tidak hanya terbatas pada 1 bank, melainkan banyak Bank dan beragam E-Wallet, maka UI perlu memfasilitasi hal tersebut dengan elegan.

**Rancangan Perubahan Desain Utama:**
1. **Navigasi Kategori (Pill Tabs / Chips):**
   Toggle sederhana (2 pilihan) diganti dengan deretan *Chips* atau *Pill Tabs* yang dapat digeser secara horizontal:
   - `💸 Sesama SnapCash` (Default Aktif)
   - `🏛️ Bank Lain`
   - `👛 E-Wallet`
2. **Form Input Dinamis (Adaptive UI):**
   - **Bila "Sesama SnapCash" aktif:** Menampilkan 1 input field simpel (No. HP / SnapCash ID) dengan ikon smartphone.
   - **Bila "Bank Lain" aktif:** Menampilkan tombol *Dropdown/Selector* (Pilih Bank) yang jika diklik akan memicu *Bottom Sheet* modern. Di bawahnya terdapat input field untuk Nomor Rekening.
   - **Bila "E-Wallet" aktif:** Menampilkan tombol *Dropdown/Selector* (Pilih E-Wallet seperti GoPay/OVO/DANA), diikuti input field Nomor HP.
3. **Daftar Tujuan Tersimpan (Recent Transfers):**
   - Untuk daftar kontak horizontal, ditambahkan *badge/indikator kecil* di sudut bawah avatar untuk memperjelas apakah itu kontak SnapCash, rekening BCA, GoPay, dsb.
   - Ini meningkatkan kecepatan kognitif user tanpa harus membaca detail teks.

---

## 📋 Tahapan Implementasi (Instruksi untuk Programmer / AI)

### Step 1: Persiapan & Layout Dasar (Foundation)
- [ ] Buat file HTML baru (misal `transfer.html`).
- [ ] Integrasikan TailwindCSS menggunakan konfigurasi warna dan tipografi secara presisi dari `DESIGN.md`. Jangan gunakan warna bawaan Tailwind (seperti `blue-500` atau `green-500`). Gunakan variabel semantik seperti `bg-surface`, `text-on-surface`.
- [ ] Setup layout utama: `min-h-screen bg-surface antialiased font-body-md`.
- [ ] Buat **TopAppBar**: Posisi `sticky top-0 z-50` dengan `bg-surface`. Sisipkan tombol navigasi Back (ikon `arrow_back`) di kiri dan judul "Transfer" (font `headline-md`, warna `primary`) persis di tengah layar.

### Step 2: Komponen Kategori Transfer (Pill Tabs)
- [ ] Buat kontainer utama dengan padding `p-gutter` (atau `p-4`).
- [ ] Tambahkan label *section* "KATEGORI TRANSFER" (`label-md`, `uppercase`, warna `text-on-surface-variant`, dengan sedikit `tracking-wider`).
- [ ] Buat kontainer `flex overflow-x-auto hide-scrollbar gap-2` untuk menampung *Pill Tabs*.
- [ ] **State Tab Aktif:** Background menggunakan `bg-primary` (charcoal/gelap) atau `bg-secondary-fixed` (lime terang), teks `on-primary` atau `on-secondary-fixed`, border radius `rounded-full`, padding lapang (contoh: `px-5 py-2.5`).
- [ ] **State Tab Inaktif:** Background `bg-surface-container`, teks `text-on-surface-variant`, `rounded-full`.
- [ ] Berikan transisi warna yang sangat mulus (`transition-colors duration-300`).

### Step 3: Area Form Input Dinamis
- [ ] Buat *Card Container* (`bg-surface-container-lowest`, `rounded-2xl`, shadow yang sangat halus / ambient shadow) di bawah tabs kategori.
- [ ] Desain input state default (Sesama SnapCash):
  - Buat kontainer relatif. Sisipkan ikon material `phone_iphone` (warna `outline`) secara absolut di sisi kiri.
  - Input field memiliki background putih bersih, padding yang memadai untuk ukuran jari mobile (`py-3.5` atau `py-4`), border `border-outline-variant`.
  - **Fokus (Active) State:** Saat input difokuskan, hilangkan default ring, dan ganti dengan ring/border warna `primary` dengan transisi.
- [ ] Beri catatan / siapkan markup tersembunyi untuk input Bank & E-Wallet (Tombol *Select Bank* dengan ikon chevron down, dan input rekening di bawahnya).

### Step 4: Section "Tujuan Tersimpan" (Recent)
- [ ] Di bawah form, buat section baru dengan header flex: kiri "Tujuan Tersimpan" (`headline-md`), kanan tombol "Lihat Semua" (teks `label-md` warna `primary` tanpa kotak/border).
- [ ] Buat deretan avatar kontak yang *scrollable horizontal* (`snap-x`).
- [ ] **Desain Item Kontak:**
  - Kontainer relatif untuk avatar (`w-14 h-14` atau `w-16 h-16`).
  - Gambar avatar `rounded-full object-cover`. Jika tidak ada gambar, gunakan inisial teks di tengah lingkaran background `primary-fixed`.
  - **Badge Indikator (Upgrade):** Letakkan ikon lingkaran sangat kecil (misal `w-5 h-5`) di pojok kanan bawah avatar menggunakan kelas `absolute -bottom-1 -right-1`. Badge ini bisa berupa logo bank/e-wallet atau ikon generik bank.
  - Teks nama kontak maksimal 1 baris (`truncate`, `body-sm`).

### Step 5: Floating Bottom Action Button (Sticky)
- [ ] Buat kontainer lengket di bagian layar terbawah: `fixed bottom-0 w-full max-w-container-max z-40`.
- [ ] **Efek Premium (Glassmorphism):** Gunakan `bg-surface/80` dipadukan dengan `backdrop-blur-md` (blur yang cukup kuat agar terkesan seperti kaca). Tambahkan border halus di sisi atas (`border-t border-surface-variant`).
- [ ] Perhitungkan padding `safe-area-bottom` (`pb-safe-area-bottom` / padding ekstra untuk area *home indicator* di iPhone).
- [ ] **Tombol Utama:** Lebar `w-full`, tinggi besar/nyaman ditekan (`py-4`), background warna *power color* `bg-secondary-fixed` (Lime), warna teks `on-secondary-fixed`, `rounded-xl`.
- [ ] Teks "Lanjut" atau "Cek Nomor", disertai ikon `arrow_forward`.
- [ ] Berikan efek *tactile* / ditekan: `active:scale-[0.98] transition-transform`.

### Step 6: Kualitas dan Animasi Mikro
- [ ] Pastikan tidak ada warna primer murni (seperti #FF0000 atau #0000FF), semua harus dari referensi palet warna `DESIGN.md`.
- [ ] Cek *typography scale*. Elemen penting gunakan `font-bold` (700) atau `font-extrabold` (800) dari keluarga font Inter.
- [ ] Sembunyikan semua *scrollbar* pada area yang bisa di-scroll secara horizontal (tambahkan CSS khusus `::-webkit-scrollbar { display: none; }`).

## 💡 Pesan Tambahan untuk Implementator
Tujuan utama desain ini adalah menanamkan **kepercayaan (trust)** pengguna sekaligus **modernitas**. Jangan membuat desain yang kaku. Manfaatkan whitespace dengan baik, pastikan *padding* antar elemen (Card ke Card) tidak terlalu sempit (minimal 24px/`section-gap`).
