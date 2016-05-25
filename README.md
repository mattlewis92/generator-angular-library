# generator-angular2-module
>Simply scaffold your module with this yeoman generator and start writing code without having to setup any tedious boilerplate tooling. 

Everything is pre-configured, from a local development server with unit tests, through to publishing your module to npm and a demo to github pages. Hopefully the [angular-cli](https://cli.angular.io/) project will one day make this generator obsolete, however currently the angular-cli is geared towards creating a full web-app rather than just a single re-usable module.

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-angular2-module` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-angular2-module
```

Then create your new repo on github, check it out and from the root of the repo folder run:

```bash
yo angular2-module
```

To generate the demo:
```bash
git branch gh-pages
git push origin gh-pages
npm run gh-pages
```

## Usage

Once you've scaffolded out your module everything is then controlled by npm scripts:
* `npm start` to serve the demo page of your module with live-reload as you develop. Unit tests are also run in the background.
* `npm test` will run your unit tests once and `npm run test:watch` will run them continuously
* `npm run commit` will run the git commit wizard when you're ready to commit a change
* `npm run release` will publish a new release. First make sure you've created the `gh-pages` branch and pushed it to github. Next change the version in package.json to the new version you would like to release, but don't commit it yet. Now run `npm run release` and the new version will be built and published to npm, as well as the demo and documentation generated and pushed to the `gh-pages` branch of your project.

## Tools used

* Build your module in [typescript](https://www.typescriptlang.org/) with [webpack](https://webpack.github.io/)
* Run your tests with [karma](http://karma-runner.github.io/)
* Auto-lint your module with [tslint](https://palantir.github.io/tslint/)
* Automatic documentation generated with [typedoc](http://typedoc.io/)
* Publish your module to [npm](https://www.npmjs.com/)

## License

MIT © [Matt Lewis](https://mattlewis.me)
