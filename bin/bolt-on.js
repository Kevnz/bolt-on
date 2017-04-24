#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const templates = require('../packages');

program
  .version(package.version)
  .command('on <req> [optional]')
  .description('add description')
  .option('-o, --option', `we can still have add'l options`)
  .action(function(req, optional){
    console.log('.action() allows us to implement the command');
    console.log('User passed %s', req);
    console.log('cwd', process.cwd());
    console.log('__dirname', __dirname);
    if (templates[req]) {
      templates[req](process.cwd()).then(() => {
        console.log('what was promised');
      });
    } else {
      console.log('nothing there');
    }
    if (optional) {
      optional.forEach(function(opt){
        console.log("User passed optional arguments: %s", opt);
      });
    }
  });
program.parse(process.argv);
