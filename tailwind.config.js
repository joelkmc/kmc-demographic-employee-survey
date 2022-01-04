const themeConstants = {
  paper: '#F9F9F9',
  primary: '#FF7200',
  secondary: '#001738',
  'light-blue': '#001738',
  black: '#111622',
  red: '#D02B20',
  green: '#328048',
};

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        secondary: themeConstants.secondary,
        'light-blue': themeConstants['light-blue'],
        black: themeConstants.black,
        red: themeConstants.red,
        green: themeConstants.green,
      },
      fontFamily: {
        karla: ['Karla'],
        barlow: ['Barlow'],
        'barlow-condensed': ['Barlow Condensed'],
        sans: [
          'ProximanovaRegular',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      animation: {
        clicked: 'pulse .8s cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
    },

    backgroundColor: [
      'responsive',
      'dark',
      'group-hover',
      'focus-within',
      'hover',
      'focus',
    ],
    backgroundImage: ['responsive'],
    backgroundOpacity: [
      'responsive',
      'group-hover',
      'focus-within',
      'hover',
      'focus',
    ],
    borderColor: [
      'responsive',
      'dark',
      'group-hover',
      'focus-within',
      'hover',
      'focus',
      'active',
    ],

    boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],

    width: ['responsive', 'group-hover', 'focus', 'focus-within'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
