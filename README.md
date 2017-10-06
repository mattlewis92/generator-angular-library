# generator-angular-library [![Build Status](https://travis-ci.org/mattlewis92/generator-angular-library.svg?branch=master)](https://travis-ci.org/mattlewis92/generator-angular-library)
>Simply scaffold your angular 4.0+ library with this yeoman generator and start writing code without having to setup any tedious boilerplate tooling. 

Everything is pre-configured, from a local development server with unit tests, through to publishing your library to npm and a demo to github pages. Hopefully the [angular-cli](https://cli.angular.io/) project will one day make this generator obsolete, however currently the angular-cli is geared towards creating a full web-app rather than just a single re-usable npm library.

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-angular-library` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-angular-library
```

Then create your new repo on github, check it out and from the root of the repo folder run:

```bash
yo angular-library
```

## Folder structure
* `src` should hold your libraries components / services / pipes etc. Organise them however you see fit!
* `test` contains all your libraries test files. Simply suffix the filenames with `.spec.ts` and they will be auto-included and ran
* `demo` contains a demo app that shows off your library to users. It is also handy during development as unit tests will only get you so far when developing a UI component

## npm scripts

Once you've scaffolded out your library, everything is then controlled by npm scripts:
* `npm start` to serve the demo page of your library with live-reload as you develop. Unit tests are also run in the background.
* `npm test` will run your unit tests once and `npm run test:watch` will run them continuously
* `npm run commit` will run the git commit wizard when you're ready to commit a change
* `npm run release` will publish a new release. First make sure you've created the `gh-pages` branch and pushed it to github. Next change the version in package.json to the new version you would like to release, but don't commit it yet. Now run `npm run release` and the new version will be built and published to npm, as well as the demo and documentation generated and pushed to the `gh-pages` branch of your project.

## Tools used

* Build your library in [typescript](https://www.typescriptlang.org/) with [webpack](https://webpack.github.io/)
* Run your tests with [karma](http://karma-runner.github.io/)
* Auto-lint your library with [tslint](https://palantir.github.io/tslint/)
* Automatic documentation generated with [compodoc](https://compodoc.github.io/compodoc/)
* Publish your library to [npm](https://www.npmjs.com/)

## License

MIT © [Matt Lewis](https://mattlewis.me)
