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