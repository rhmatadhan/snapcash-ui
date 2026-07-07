/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wallet: {
          charcoal: "#1F2937",
          lime: "#A3E635",
          softgray: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Rekomendasi font modern fintech
      },
    },
  },
  plugins: [
    // Tambahkan plugin iconify jika menggunakan `@iconify/tailwind`
    // require('@iconify/tailwind')
  ],
};
