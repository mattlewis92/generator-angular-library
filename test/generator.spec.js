'use strict';

const os = require('os');
const inquirerTest = require('inquirer-test');
const shelljs = require('shelljs');

const cliPath = `${__dirname}/../node_modules/.bin/yo`;
const tmpDir = `${os.tmpdir()}/generator-angular-lib-test`;
const inquirerTimeout = 1000;

describe('generator', () => {
  it('should run successfully', () => {
    console.info('Testing generator in', tmpDir);

    shelljs.rm('-rf', tmpDir);
    shelljs.mkdir(tmpDir);
    shelljs.exec('npm link');
    shelljs.cd(tmpDir);

    return inquirerTest(cliPath, [
      inquirerTest.ENTER, // Select angular-library generator
      'mattlewis92', // Github username
      inquirerTest.ENTER, // Next option
      'test', // Github repo name
      inquirerTest.ENTER, // Next option
      'test', // Npm module name
      inquirerTest.ENTER, // Next option
      inquirerTest.ENTER, // Use default ngModuleName
      inquirerTest.ENTER, // Next option
      'mwl', // Selector prefix
      inquirerTest.ENTER, // Next option
      'Test', // Project title
      inquirerTest.ENTER, // Next option
      inquirerTest.ENTER, // No description
      inquirerTest.ENTER, // No author name
      inquirerTest.ENTER // Use npm as package manager
    ], inquirerTimeout).then(() => {
      const commands = ['npm test', 'npm run build:demo', 'npm run compodoc'];
      const failedCommands = commands
        .map(command => shelljs.exec(command))
        .filter(result => result.code !== 0);

      shelljs.rm('-rf', tmpDir);

      if (failedCommands.length > 0) {
        return Promise.reject(new Error('Generator test failed'));
      }
    });
  });
});

