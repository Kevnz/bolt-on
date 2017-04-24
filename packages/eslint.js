const npm = require('npm-programmatic');
const axios = require('axios');
const writeFile = require('../utils/write-file');
const editPackage = require('../utils/edit-package');

const eslintrc = `{
  "extends": "airbnb",
  "env": {
    "node": true
  },
  "rules" : {
    "comma-dangle": [2, "never"]
  }
}
`;

module.exports = (path) => {
  return axios.get('https://registry.npmjs.com/eslint-config-airbnb')
  .then((response) => {
    const currentVersion = response.data['dist-tags'].latest;
    const version = response.data.versions[currentVersion];
    const deps = Object.keys(version.peerDependencies).map(key => {
      if (version.peerDependencies[key].indexOf('||') > -1) {
        return `${key}@${version.peerDependencies[key].split('|| ')[1]}`;
      }
      return `${key}@${version.peerDependencies[key]}`;
    });
    const dependency = ['eslint-config-airbnb'];
    return npm.install(dependency.concat(deps), {
      cwd: path,
      saveDev: true
    })
    .then(() => {
      console.log("SUCCESS!");
      return writeFile('.eslintrc', eslintrc);
    })
    .then(() => {
      const config = {
        scripts: {
          lint: 'lint ./'
        }
      };
      return editPackage(config);
    })
    .catch(() => {
      console.log("Unable to install package");
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};
