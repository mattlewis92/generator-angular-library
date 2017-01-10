'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const isInstalled = require('is-installed');
const utils = require('./utils');

module.exports = Generator.extend({

  initializing: function() {
    this.initialConfig = this.config.getAll();
  },

  prompting: function() {

    this.log(yosay(`Welcome to the awe-inspiring ${chalk.red('generator-angular-library')} generator!`));
    utils.configInfo(this.initialConfig)
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
        default: githubUsername,
        when: utils.noConfig('githubUsername', this.initialConfig)
      }, {
        type: 'input',
        name: 'githubRepoName',
        message: 'What is the github repository name?',
        default: this.appname.replace(/ /g, '-'),
        when: utils.noConfig('githubRepoName', this.initialConfig)
      }, {
        type: 'input',
        name: 'npmModuleName',
        message: 'What is the npm module name?',
        default: this.appname.replace(/ /g, '-'),
        when: utils.noConfig('npmModuleName', this.initialConfig)
        
      }, {
        type: 'input',
        name: 'moduleGlobal',
        message: 'What should the module be exported as on the window for users not using module bundlers?',
        validate: required,
        default(answers) {
          return _.camelCase(answers.npmModuleName);
        },
        when: utils.noConfig('moduleGlobal', this.initialConfig)
      }, {
        type: 'input',
        name: 'ngModuleName',
        message: 'What should the NgModule name be?',
        validate: required,
        default(answers) {
          return _.upperFirst(_.camelCase(answers.npmModuleName)) + 'Module';
        },
        when: utils.noConfig('ngModuleName', this.initialConfig)
      }, {
        type: 'input',
        name: 'selectorPrefix',
        message: 'What should the component / directive selector prefix be',
        validate: required,
        when: utils.noConfig('selectorPrefix', this.initialConfig)
      }, {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the human readable project title?',
        default: this.determineAppname(),
        when: utils.noConfig('projectTitle', this.initialConfig)
      }, {
        type: 'input',
        name: 'projectDescription',
        message: 'What is the project description?',
        when: utils.noConfig('projectDescription', this.initialConfig)        
      }, {
        type: 'input',
        name: 'authorName',
        message: 'What is the author name?',
        default: this.user.git.name(),
        when: utils.noConfig('authorName', this.initialConfig)                
      }];

      return this.prompt(prompts);

    }).then(props => {
      this.config.set(props);
      this.config.save();
    });

  },

  writing: function() {
    this.props = this.config.getAll();
    this.props.ngModuleFilename = _.lowerFirst(`${this.props.ngModuleName.replace(/Module$/, '')}.module.ts`);
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
      'tsconfig-ngc.json',
      'tslint.json',
      'typedoc.json',
      'webpack.config.umd.js',
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
    this.log('Make sure to now create the gh-pages branch:');
    this.log('`git branch gh-pages && git checkout gh-pages && git push --set-upstream origin gh-pages && git checkout master`');
    return isInstalled('yarn').then(exists => {
      if (exists) {
        this.yarnInstall();
      } else {
        this.npmInstall();
      }
    });
  }
});
