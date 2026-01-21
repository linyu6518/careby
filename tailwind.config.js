/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B8C75',
        accent: '#14B8A6',
        soft: '#F8FAFC',
        midnight: '#0F172A',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0891B2 0%, #14B8A6 50%, #06B6D4 100%)',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
      },
    },
  },
  plugins: [],
}

