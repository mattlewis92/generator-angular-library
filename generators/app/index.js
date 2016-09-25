'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function() {

    this.log(yosay(`Welcome to the awe-inspiring ${chalk.red('generator-angular2-module')} generator!`));

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
        type: 'input',
        name: 'moduleGlobal',
        message: 'What should the module be exported as on the window for users not using module bundlers?',
        validate: required,
        default(answers) {
          return _.camelCase(answers.npmModuleName);
        }
      }, {
        type: 'input',
        name: 'ngModuleName',
        message: 'What should the NgModule name be?',
        validate: required,
        default(answers) {
          return _.upperFirst(_.camelCase(answers.npmModuleName)) + 'Module';
        }
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
      'karma.conf.js',
      'LICENSE',
      'README.md',
      'tsconfig.json',
      'tslint.json',
      'typedoc.json',
      'webpack.config.dist.js',
      'webpack.config.js',
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
      this.templatePath('src/ngModule.module.ts'),
      this.destinationPath('src/' + this.props.ngModuleFilename),
      this.props
    );

  },

  install: function() {
    this.installDependencies({bower: false});
  }
});
