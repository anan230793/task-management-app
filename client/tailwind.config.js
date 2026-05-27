/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00684A',
          hover: '#005A3E',
        },
        surface: {
          page: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E8EDEB',
        },
        ink: {
          primary: '#1C1C1C',
          secondary: '#5C6269',
        },
        danger: '#C13B36',
        pending: '#944F01',
        auth: '#001E2B',
      },
    },
  },
  plugins: [],
};
