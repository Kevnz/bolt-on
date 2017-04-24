#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const templates = require('../packages');
const ora = require('ora');



program
  .version(package.version)
  .command('on <req>')
  .description('Bolt on different JavaScript enhancements')
  .action(function(req, optional){
    const spinner = ora(` Bolting on ${req}`).start();

    if (templates[req]) {
      templates[req](process.cwd()).then(() => {
        spinner.succeed(' Bolt on complate');
      });
    } else {
      spinner.fail('There was nothing to bolt on');
    }
  });
program.parse(process.argv);
