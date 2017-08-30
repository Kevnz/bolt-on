const npm = require('@kev_nz/npm-programmatic');
const writeFile = require('../utils/write-file');
const editPackage = require('../utils/edit-package');

const webpack = `const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'dist')
};

module.exports = {
  plugins: [],
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
`;

const dependencies = ['webpack', 'babel-core', 'babel-loader'];
module.exports = path => npm.install(dependencies, {
  cwd: path,
  saveDev: true
})
.then(() => writeFile('webpack.config.js', webpack))
.then(() => {
  const config = {
    scripts: {
      pack: 'BABEL_ENV=development webpack',
      'pack:prod': 'BABEL_ENV=production webpack'
    }
  };
  return editPackage(config);
})
.catch((err) => {
  console.log('Unable to install package', err);
});
