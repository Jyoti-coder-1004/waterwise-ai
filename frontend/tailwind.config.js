/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F7F2',
        forest: '#2E7D32',
        sage: '#DDEED8',
        sky: '#4FC3F7',
        surface: '#FFFFFF',
        textMain: '#1A1A1A',
        textMuted: '#6B7280',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
        'float': '0 20px 40px -10px rgba(46,125,50,0.08)',
      },
      borderRadius: {
        'xl': '20px',
      }
    },
  },
  plugins: [],
}
