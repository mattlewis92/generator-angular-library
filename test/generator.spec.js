'use strict';

const os = require('os');
const path = require('path');
const inquirerTest = require('inquirer-test');
const shelljs = require('shelljs');

const cliPath = path.join(__dirname, '../node_modules/.bin/yo');
const tmpDir = path.join(os.tmpdir(), 'generator-angular-lib-test');
const inquirerTimeout = 5000;

describe('generator', () => {
  it('should run successfully', () => {
    console.info('Testing generator in', tmpDir);

    shelljs.rm('-rf', tmpDir);
    shelljs.mkdir(tmpDir);
    shelljs.exec('npm link');
    shelljs.cd(tmpDir);

    return inquirerTest(cliPath, [
      inquirerTest.ENTER,
      'mattlewis92',
      inquirerTest.ENTER,
      'test',
      inquirerTest.ENTER,
      'test',
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      'mwl',
      inquirerTest.ENTER,
      'Test',
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      inquirerTest.ENTER
    ], inquirerTimeout).then((result) => {
      console.log(result);
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

