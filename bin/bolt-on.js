#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../package.json');
const templates = require('../packages');
const ora = require('ora');

program
  .version(packageInfo.version)
  .command('on <req>')
  .description('Bolt on different JavaScript enhancements')
  .action((req) => {
    const spinner = ora({ text: `Bolting on ${req}`, spinner: 'shark' }).start();

    if (templates[req]) {
      templates[req](process.cwd()).then(() => {
        spinner.succeed('Bolt on complete');
      });
    } else {
      spinner.fail('There was nothing to bolt on');
    }
  });
program.parse(process.argv);
