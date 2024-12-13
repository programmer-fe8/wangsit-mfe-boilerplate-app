/** @type {import('tailwindcss').Config} */

import Colors from 'wangsvue-presets/wangsvue/colors.config.json';

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'wangsvue-presets/**',
  ],
  theme: {
    extend: {
      colors: {
        ...Colors,
      },
    },
  },
  plugins: [],
};
