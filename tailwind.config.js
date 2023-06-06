/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    "./**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      width: {
        '2xl': '48rem', // Establece el tamaño máximo de ancho a 48rem para w-2xl
      },
    },
  },
  variants: {
    extend: {
      width: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};

