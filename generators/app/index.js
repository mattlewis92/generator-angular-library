'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const caniuseYarn = require('@danielbayerlein/caniuse-yarn')();
const shelljs = require('shelljs');

module.exports = Generator.extend({
  prompting: function() {

    this.log(yosay(`Welcome to the awe-inspiring ${chalk.red('generator-angular-library')} generator!`));

    const required = val => !!val;

    const githubUsernamePromise = new Promise(resolve => {
      try {
        this.user.github.username((err, username) => resolve(username));
      } catch (e) {
        resolve('');
      }
    });

    return githubUsernamePromise.then(githubUsername => {
      const prompts = [{
        type: 'input',
        name: 'githubUsername',
        message: 'What is the github project organisation or username?',
        validate: required,
        default: githubUsername
      }, {
        type: 'input',
        name: 'githubRepoName',
        message: 'What is the github repository name?',
        default: this.appname.replace(/ /g, '-')
      }, {
        type: 'input',
        name: 'npmModuleName',
        message: 'What is the npm module name?',
        default: this.appname.replace(/ /g, '-')
      }, {
        type: 'confirm',
        name: 'allowNg2InModuleName',
        message: 'Starting angular module names with ng2 or angular2 is not advised as angular now follows semver. It is recommended that you start your library name with just angular. Would you like to continue anyway?',
        default: false,
        when: function(answers) {
          return answers.npmModuleName.startsWith('ng2') || answers.npmModuleName.startsWith('angular2');
        }
      }, {
        type: 'input',
        name: 'moduleGlobal',
        message: 'What should the module be exported as on the window for users not using module bundlers?',
        validate: required,
        default: answers => {

          if (answers.allowNg2InModuleName === false) {
            this.log('Please start again with a new package name that doesnt start with ng2 or angular2.');
            process.exit();
          }

          return _.camelCase(answers.npmModuleName);
        }
      }, {
        type: 'input',
        name: 'ngModuleName',
        message: 'What should the NgModule name be?',
        validate: required,
        default: function(answers) {
          return _.upperFirst(_.camelCase(answers.npmModuleName)) + 'Module';
        }
      }, {
        type: 'input',
        name: 'selectorPrefix',
        message: 'What should the component / directive selector prefix be',
        validate: required
      }, {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the human readable project title?',
        default: this.determineAppname()
      }, {
        type: 'input',
        name: 'projectDescription',
        message: 'What is the project description?'
      }, {
        type: 'input',
        name: 'authorName',
        message: 'What is the author name?',
        default: this.user.git.name()
      }];

      return this.prompt(prompts);

    }).then(props => {
      this.props = props;
      this.props.ngModuleFilename = _.lowerFirst(`${this.props.ngModuleName.replace(/Module$/, '')}.module.ts`);
    });

  },

  writing: function() {

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
      'karma.conf.ts',
      'LICENSE',
      'README.md',
      'tsconfig.json',
      'tsconfig-ngc.json',
      'tsconfig-compodoc.json',
      'tslint.json',
      'webpack.config.umd.ts',
      'webpack.config.ts',
      'src/helloWorld.component.ts',
      'src/index.ts'
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
      this.templatePath('src/ngModule.module.ts'),
      this.destinationPath('src/' + this.props.ngModuleFilename),
      this.props
    );

  },

  install: function() {
    this.log('Creating gh-pages branch');
    shelljs.exec('git branch gh-pages && git checkout gh-pages && git push --set-upstream origin gh-pages && git checkout master');
    if (caniuseYarn) {
      this.yarnInstall([], {ignoreEngines: true});
    } else {
      this.npmInstall();
    }
  }
});
