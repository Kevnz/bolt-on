const fs = require('fs');


module.exports = () => new Promise((resolve, reject) => {
  fs.readFile('./package.json', (err, packageObject) => {
    if (err) {
      reject(err);
    }
    return resolve(JSON.parse(packageObject));
  });
});
