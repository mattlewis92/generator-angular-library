const os = require('os');
const shelljs = require('shelljs');
const nixt = require('nixt');

const cliPath = `${__dirname}/../node_modules/.bin/yo`;
const tmpDir = `${os.tmpdir()}/generator-angular-lib-test`;

describe('generator', () => {
  it('should run successfully', done => {
    console.info('Testing generator in', tmpDir);

    shelljs.rm('-rf', tmpDir);
    shelljs.mkdir(tmpDir);
    shelljs.exec('npm link');

    nixt()
      .cwd(tmpDir)
      .run(`${cliPath} angular-library`)
      .on(/What is the github project organisation or username/).respond('mattlewis92\n')
      .on(/What is the github repository name/).respond('angular-lib-test\n')
      .on(/What is the npm module name/).respond('angular-lib-test\n')
      .on(/What should the NgModule name be/).respond('LibTestModule\n')
      .on(/What should the component \/ directive selector prefix be /).respond('mwl\n')
      .on(/What is the human readable project title/).respond('\n')
      .on(/What is the project description/).respond('Description\n')
      .on(/What is the author name/).respond('Matt Lewis\n')
      .on(/What package manager should be used to install dependencies/).respond('\n')
      .end(err => {
        if (err) {
          return done(err);
        }

        shelljs.cd(tmpDir);

        const commands = ['npm test', 'npm run build:demo', 'npm run compodoc'];
        const failedCommands = commands
          .map(command => shelljs.exec(command))
          .filter(result => result.code !== 0);

        shelljs.rm('-rf', tmpDir);

        if (failedCommands.length > 0) {
          done(new Error('Generator test failed'));
        } else {
          done();
        }
      });
  });
});

