/** @type {import('tailwindcss').Config} */

import Colors from 'wangsvue/colors.config.json';

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...Colors,
      },
    },
  },
  plugins: [],
};
