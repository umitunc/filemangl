/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      colors: {
        win: {
          bg: '#0c1017',
          surface: '#131924',
          panel: '#18202f',
          hover: '#1f293d',
          selected: '#1e3a5f',
          border: '#263248',
          accent: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}
