'use strict';

const os = require('os');
const inquirerTest = require('inquirer-test');
const shelljs = require('shelljs');

const cliPath = `${__dirname}/../node_modules/.bin/yo`;
const tmpDir = `${os.tmpdir()}/generator-angular-lib-test`;
const inquirerTimeout = 1000;

console.info('Testing generator in', tmpDir);

shelljs.rm('-rf', tmpDir);
shelljs.mkdir(tmpDir);
shelljs.exec('npm link');
shelljs.cd(tmpDir);

inquirerTest(cliPath, [
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
], inquirerTimeout).then(result => {

  const testResult = shelljs.exec('npm test');
  shelljs.rm('-rf', tmpDir);
  if (testResult.code !== 0) {
    console.error('Generator test failed');
    shelljs.exit(1);
  }
  console.info('Test completed');

}).catch(err => {
  console.error('Generator test failed', err);
  shelljs.exit(1);
});