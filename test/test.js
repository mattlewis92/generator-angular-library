'use strict';

const os = require('os');
const inquirerTest = require('inquirer-test');
const shelljs = require('shelljs');

const cliPath = `${__dirname}/../node_modules/.bin/yo`;
const tmpDir = `${os.tmpdir()}/generator-angular-lib-test`;
const inquirerTimeout = 1000;

describe('generator', function () {
  it('should run successfully', function (done) {
    this.timeout(50000);
    console.info('Testing generator in', tmpDir);

    shelljs.rm('-rf', tmpDir);
    shelljs.mkdir(tmpDir);
    shelljs.exec('npm link');
    shelljs.cd(tmpDir);

    const promise = inquirerTest(cliPath, [
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
        throw new Error('Generator test failed');
      }
      done();

    }).catch(err => {
      throw new Error('Generator test failed', err);
    });
    return promise;
  });
});

