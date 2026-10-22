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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['calc(13.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.45' }],
        sm: ['calc(14.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.5' }],
        base: ['calc(16px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.55' }],
        lg: ['calc(18px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.5' }],
        xl: ['calc(20px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.4' }],
        '2xl': ['calc(24px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.35' }],
        '3xl': ['calc(30px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.25' }],
        '4xl': ['calc(36px * var(--fm-font-scale, var(--uxu-font-scale, 1)))', { lineHeight: '1.2' }],
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
