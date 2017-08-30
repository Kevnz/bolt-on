const writeFile = require('./write-file');
const loadPackage = require('./load-package');
const deepAssign = require('deep-assign');

module.exports = (config) => {
  loadPackage().then((packageObject) => {
    const newPackage = deepAssign(packageObject, config);
    return writeFile('package.json', JSON.stringify(newPackage, null, 2));
  });
};
