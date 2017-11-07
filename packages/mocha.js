const npm = require('npm-programmatic');
const loadPackage = require('../utils/load-package');
const editPackage = require('../utils/edit-package');

const mochaDeps = ['mocha', 'nyc', 'chai'];

module.exports = path => loadPackage()
  .then((packageInfo) => {
    const deps = Object.keys(packageInfo.dependencies);
    if (deps.includes('react')) {
      mochaDeps.push('enzyme');
    }
    return npm.install(mochaDeps, {
      cwd: path,
      saveDev: true
    });
  })
  .then(loadPackage) // reload package to check scripts and and test command
  .then((packageInfo) => {
    const scripts = Object.keys(packageInfo.scripts);
    const config = {
      scripts: {
        test: 'mocha --recursive'
      }
    };
    return editPackage(scripts.includes('test') ? {} : config);
  });

