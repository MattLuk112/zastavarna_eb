const path = require('path');
const glob = require('glob-all');

const content = glob.sync([
  path.join(__dirname, './**/*.vue'),
  path.join(__dirname, './**/*.html'),
  path.join(__dirname, './../../plugins/**/admin/**/*.vue'),
]);

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content,
  },
  theme: {
    zIndex: {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '25': 25,
      '50': 50,
      '75': 75,
      '100': 100,
      'auto': 'auto',
      '-1': '-1',
      '-10': '-10',
      100: '100',
    },
    extend: {
      height: (theme) => ({
        '(screen-16)': 'calc(100vh - 4rem)',
      }),
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        100: '100',
      },
    },
    inset: {
      0: 0,
      auto: 'auto',
      '0.5': '0.125rem',
      1: '0.25rem',
      4: '1rem',
      8: '2rem',
      16: '4rem',
      full: '100%'
    }
  },
  variants: {
    display: ['responsive', 'group-hover'],
    margin: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'group-focus'],
  },
};