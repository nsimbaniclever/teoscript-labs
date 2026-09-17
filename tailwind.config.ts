// tailwind.config.js ou tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '72': '72px',  // ← Adiciona h-72
      },
    },
  },
  plugins: [],
}