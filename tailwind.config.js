/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        lg: '940px',
        xl: '940px',
        '2xl': '940px',
      },
    },
    extend: {},
  },
  plugins: [],
};
