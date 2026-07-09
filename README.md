# SnapCash UI

User interface untuk aplikasi e-wallet **SnapCash** — dibangun menggunakan HTML, Tailwind CSS, dan vanilla JavaScript.

## 🛠 Tech Stack

- **HTML5** — Struktur halaman
- **Tailwind CSS v3** — Styling utility-first
- **JavaScript (Vanilla)** — Interaksi dan logika halaman
- **BrowserSync** — Live reload dev server
- **Prettier** — Code formatting

## 📁 Struktur Folder

```
snapcash-ui/
├── public/                   # File HTML (entry point browser)
│   ├── index.html            # Dashboard utama
│   ├── transaction-status.html
│   └── auth/                 # Halaman autentikasi
│       ├── login.html
│       ├── login-pin.html
│       ├── register.html
│       ├── register-verification.html
│       ├── register-security.html
│       ├── register-success.html
│       ├── forgot-pin.html
│       └── reset-pin.html
├── src/                      # Source code
│   ├── css/
│   │   └── input.css         # Tailwind source + custom CSS
│   └── js/
│       ├── app.js            # Entry point JavaScript
│       ├── dashboard.js      # Logic dashboard (balance toggle)
│       └── transaction-status.js  # Logic status transaksi
├── dist/                     # Build output (auto-generated)
│   └── css/
│       └── style.css         # Compiled Tailwind CSS
├── assets/                   # Aset statis (gambar, ikon, dll)
│   └── images/
├── tailwind.config.js        # Konfigurasi Tailwind
├── package.json
├── .prettierrc
└── .gitignore
```

## 🚀 Cara Menjalankan

### 1. Install dependencies

```bash
npm install
```

### 2. Jalankan development server

```bash
npm run dev
```

Perintah ini akan:
- Compile Tailwind CSS dengan **watch mode**
- Menjalankan **BrowserSync** dev server dengan live reload

### 3. Build CSS (production)

```bash
npm run build:css
```

### 4. Format kode

```bash
npm run format
```

## 📝 Catatan

- Semua file HTML ada di folder `public/`
- CSS ditulis di `src/css/input.css` lalu di-compile ke `dist/css/style.css`
- JavaScript dipisahkan per halaman di folder `src/js/`
- Folder `dist/` tidak perlu di-commit (auto-generated)
