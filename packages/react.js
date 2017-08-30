const npm = require('@kev_nz/npm-programmatic');
const writeFile = require('../utils/write-file');
const editPackage = require('../utils/edit-package');
const babel = require('./babel');
const webpack = require('./webpack');

const config = `const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src/ui', 'index.js'),
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
const babelrc = `{
  "presets": ["es2015", "es2016", "es2017", "react", "react-app"],
  "plugins": ["transform-function-bind"],
  "env": {
    "test": {
      "plugins": []
    }
  }
}
`;
const reactDependencies = ['react', 'react-dom', 'babel-preset-react-app'];

module.exports = path => babel(path, babelrc)
  .then(() => webpack(path)).then(() => npm.install(reactDependencies, {
    cwd: path,
    saveDev: true
  })
  .then(() => writeFile('webpack.config.js', config))
  .catch((err) => {
    console.error('Unable to install package', err);
  }));
