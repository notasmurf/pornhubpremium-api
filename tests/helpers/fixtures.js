const fs = require('fs');
const path = require('path');

/**
 * Simple function to read in a fixture file.
 * @param fileName
 * @param encoding
 * @returns {*}
 */
const getFixture = (fileName, encoding = 'utf-8') => fs.readFileSync(path.resolve(__dirname, `../fixtures/${fileName}`), encoding);

module.exports = {
  getFixture,
};
