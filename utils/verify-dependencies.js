const loadPackage = require('./load-package');

module.exports = dependencies => loadPackage().then((pack) => {
  Object.keys(pack.dependencies).forEach((dependency) => {
    if (dependencies[dependency]) {

    }
  })
})
