/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#fafafa',
          dark: '#09090b',
        },
        surface: {
          light: '#ffffff',
          dark: '#121215',
          darkHover: '#18181b',
        },
        border: {
          subtleLight: '#e4e4e7',
          subtleDark: '#27272a',
        },
        brand: {
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Fira Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        elevated: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
