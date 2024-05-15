/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        netflixRed: '#E50914',
        netflixBlack: '#000000',
        netflixWhite: '#FFFFFF',
        netflixbackground: '#141414',
        netflixbackground2: '#1C1C1C',
        netflixGray: {
          '100': '#F3F3F3',
          '200': '#E5E5E5',
          '300': '#D6D6D6',
          '400': '#B0B0B0',
          '500': '#737373',
          '600': '#666666',
          '700': '#4D4D4D',
          '800': '#3A3A3A',
          '900': '#000000',
        },
        netflixGrayLight: {
          '100': '#F3F3F3',
          '200': '#E5E5E5',
          '300': '#D6D6D6',
          '400': '#B0B0B0',
          '500': '#737373',
        },
      },
    },
  },
  plugins: [],
};
