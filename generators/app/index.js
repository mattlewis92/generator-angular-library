const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const caniuseYarn = require('@danielbayerlein/caniuse-yarn')();
const shelljs = require('shelljs');
const isEmpty = require('is-null-like');

const npmMajor = shelljs.exec('npm -v', {silent: true}).match(/(^\d+)/)[0];

module.exports = class AngularLibraryGenerator extends Generator {

  initializing() {
    this.initialConfig = this.config.getAll();
  }

  prompting() {
    this.log(yosay(`Welcome to the awe-inspiring ${chalk.red('generator-angular-library')} generator!`));
    this.logConfigInfo(this.initialConfig);
    const required = val => Boolean(val);

    return this.user.github.username().catch(() => '').then(githubUsername => {
      const prompts = [{
        type: 'input',
        name: 'githubUsername',
        message: 'What is the github project organisation or username?',
        validate: required,
        default: githubUsername,
        when: isEmpty(this.initialConfig.githubUsername)
      }, {
        type: 'input',
        name: 'githubRepoName',
        message: 'What is the github repository name?',
        default: this.appname.replace(/ /g, '-'),
        when: isEmpty(this.initialConfig.githubRepoName)
      }, {
        type: 'input',
        name: 'npmModuleName',
        message: 'What is the npm module name?',
        default: this.appname.replace(/ /g, '-'),
        when: isEmpty(this.initialConfig.npmModuleName)
      }, {
        type: 'confirm',
        name: 'allowNg2InModuleName',
        message: 'Starting angular module names with ng2 or angular2 is not advised as angular now follows semver. It is recommended that you start your library name with just angular. Would you like to continue anyway?',
        default: false,
        when: answers => {
          const npmModuleName = this.initialConfig.npmModuleName || answers.npmModuleName;
          return npmModuleName.startsWith('ng2') || npmModuleName.startsWith('angular2');
        }
      }, {
        type: 'input',
        name: 'moduleGlobal',
        message: 'What should the module be exported as on the window for users not using module bundlers?',
        validate: required,
        default: answers => {
          if (answers.allowNg2InModuleName === false) {
            this.log('Please start again with a new package name that doesnt start with ng2 or angular2.');
            process.exit(); // eslint-disable-line unicorn/no-process-exit
          }

          const npmModuleName = this.initialConfig.npmModuleName || answers.npmModuleName;
          return _.camelCase(npmModuleName);
        },
        when: isEmpty(this.initialConfig.moduleGlobal)
      }, {
        type: 'input',
        name: 'ngModuleName',
        message: 'What should the NgModule name be?',
        validate: required,
        default: answers => {
          const npmModuleName = this.initialConfig.npmModuleName || answers.npmModuleName;
          return _.upperFirst(_.camelCase(npmModuleName)) + 'Module';
        },
        when: isEmpty(this.initialConfig.ngModuleName)
      }, {
        type: 'input',
        name: 'selectorPrefix',
        message: 'What should the component / directive selector prefix be',
        validate: required,
        when: isEmpty(this.initialConfig.selectorPrefix)
      }, {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the human readable project title?',
        default: this.determineAppname(),
        when: isEmpty(this.initialConfig.projectTitle)
      }, {
        type: 'input',
        name: 'projectDescription',
        message: 'What is the project description?',
        when: isEmpty(this.initialConfig.projectDescription)
      }, {
        type: 'input',
        name: 'authorName',
        message: 'What is the author name?',
        default: this.user.git.name(),
        when: isEmpty(this.initialConfig.authorName)
      }, {
        type: 'list',
        name: 'packageManager',
        message: 'What package manager should be used to install dependencies?',
        default: (npmMajor >= 5 || !caniuseYarn) ? 'npm' : 'yarn',
        choices: [{
          name: 'npm',
          value: 'npm'
        }, {
          name: 'yarn',
          value: 'yarn'
        }].filter(packageManager => packageManager.value === 'npm' || caniuseYarn),
        when: isEmpty(this.initialConfig.packageManager)
      }];

      return this.prompt(prompts);
    }).then(props => {
      this.config.set(props);
      this.config.save();
    });
  }

  writing() {
    this.props = this.config.getAll();
    this.props.ngModuleFilename = `${_.kebabCase(this.props.ngModuleName.replace(/Module$/, ''))}.module.ts`;
    this.props.currentYear = new Date().getFullYear();
    const folders = ['demo', 'test'];
    folders.forEach(folder => {
      this.fs.copyTpl(
        this.templatePath(`${folder}/**`),
        this.destinationPath(folder),
        this.props
      );
    });

    const files = [
      '.editorconfig',
      '.travis.yml',
      '.prettierrc',
      'karma.conf.ts',
      'LICENSE',
      'README.md',
      'tsconfig.json',
      'tsconfig-ngc.json',
      'tsconfig-compodoc.json',
      'tsconfig-demo.json',
      'tslint.json',
      'webpack.config.umd.ts',
      'webpack.config.ts',
      'src/hello-world.component.ts',
      'src/index.ts',
      'custom-typings.d.ts'
    ];
    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    });

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_.npmrc'),
      this.destinationPath('.npmrc'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/ng-module.module.ts'),
      this.destinationPath('src/' + this.props.ngModuleFilename),
      this.props
    );
  }

  install() {
    this.log('Creating gh-pages branch');
    shelljs.exec('git branch gh-pages && git checkout gh-pages && git push --set-upstream origin gh-pages && git checkout master');
    if (this.props.packageManager === 'yarn' || process.env.NODE_ENV === 'test') { // Npm5 tanks my computer when ran in a process
      this.yarnInstall([], {ignoreEngines: true});
    } else {
      this.npmInstall();
    }
  }

  logConfigInfo(config) {
    if (config && Object.keys(config).length > 0) {
      this.log('Using config: ');
      this.log(JSON.stringify(config, null, 2));
      this.log(`The config is stored in ${chalk.green('.yo-rc.json')} and will override the prompts`);
      this.log('You can edit them or delete the config file to re-run the generator');
    }
  }

};
