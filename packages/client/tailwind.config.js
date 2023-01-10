/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './locales/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '481px',
      laptop: '769px',
      desktop: '1025px',
      monitor: '1201px',
      bigmonitor: '1441px',
    },
    extend: {
      colors: {
        success: {
          DEFAULT: '#8EFF1D',
          100: '#C1FF83',
          200: '#B7FF6E',
          300: '#A2FF45',
          400: '#8EFF1D',
          500: '#79F300',
          600: '#65CA00',
          700: '#499200',
        },
        warning: {
          DEFAULT: '#FE6D73',
          100: '#FFE7E8',
          200: '#FFBEC1',
          300: '#FE969A',
          400: '#FE6D73',
          500: '#FE353E',
          600: '#F9020C',
          700: '#C10109',
        },
        info: {
          DEFAULT: '#43E9D8',
          100: '#9EF4EB',
          200: '#8CF1E7',
          300: '#67EDE0',
          400: '#43E9D8',
          500: '#1EE4D1',
          600: '#17C3B2',
          700: '#119184',
        },
        neutral: {
          DEFAULT: '#1C1C1C',
          100: '#FFFFFF',
          200: '#F2F2F2',
          300: '#B5B5B5',
          400: '#787878',
          500: '#3B3B3B',
          600: '#1C1C1C',
          700: '#000000',
        },
      },
    },
  },
};
