/**
 * @flow
 */
import fs from 'fs';

const isSvg = require('is-svg');

/**
 * Promisify validateSVGFileAsync
 * @param file
 */
const validateSVGFileAsync = function(file: Object) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, text){
      if (err) {
        return reject(err);
      }

      if (!isSvg(text)) {
        return reject(new Error('Invalid SVG file content: ' + file));
      }

      resolve(null);
    });
  });
};

async function validateSVGFiles(files: Array) {
  let promises = [];
  files.forEach((file) => promises.push(validateSVGFileAsync(file)));
  await Promise.all(promises)
    .then(() => {
      console.log('SVG files validated');
    })
    .catch((err) => {
      console.log('SVG files validation failed! Exiting ...');
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
}

export default validateSVGFiles;
