const path = require('path');
const glob = require('glob-all');

const content = glob.sync([
  path.join(__dirname, './**/*.vue'),
  path.join(__dirname, './**/*.html'),
  path.join(__dirname, './../../plugins/**/frontend/**/*.vue'),
]);

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content,
  }
};