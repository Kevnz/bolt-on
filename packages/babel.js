
const npm = require('npm-programmatic');
const writeFile = require('../utils/write-file');
const editPackage = require('../utils/edit-package');

const babelrc = `{
  "presets": ["es2015", "es2016", "es2017"],
  "plugins": ["transform-function-bind"],
  "env": {
    "test": {
      "plugins": []
    }
  }
}
`;
const dependencies = ['babel-cli', 'babel-core', 'babel-plugin-transform-function-bind', 'babel-preset-es2015', 'babel-preset-es2016', 'babel-preset-es2017'];
module.exports = path => npm.install(dependencies, {
  cwd: path,
  saveDev: true
})
.then(() => writeFile('.babelrc', babelrc))
.then(() => {
  console.log('edit package');
  const config = {
    scripts: {
      babel: 'babel src -d dist'
    }
  };
  return editPackage(config);
})
.catch((err) => {
  console.log('eer', err);
  console.log('Unable to install package');
});
