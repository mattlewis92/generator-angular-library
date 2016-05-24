# <%- projectTitle %>
[![Build Status](https://travis-ci.org/<%- githubUsername %>/<%- githubRepoName %>.svg?branch=master)](https://travis-ci.org/<%- githubUsername %>/<%- githubRepoName %>)
[![npm version](https://badge.fury.io/js/<%- npmModuleName %>.svg)](http://badge.fury.io/js/<%- npmModuleName %>)
[![devDependency Status](https://david-dm.org/<%- githubUsername %>/<%- githubRepoName %>/dev-status.svg)](https://david-dm.org/<%- githubUsername %>/<%- githubRepoName %>#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/<%- githubUsername %>/<%- githubRepoName %>.svg)](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/issues)
[![GitHub stars](https://img.shields.io/github/stars/<%- githubUsername %>/<%- githubRepoName %>.svg)](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/<%- githubUsername %>/<%- githubRepoName %>/master/LICENSE)

## Demo
https://<%- githubUsername %>.github.io/<%- githubRepoName %>/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

<%- projectDescription %>

## Installation

Install through npm:
```
npm install --save @angular/core@2.0.0-rc.1 <%- npmModuleName %>
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {HelloWorld} from '<%- npmModuleName %>';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/blob/master/demo/demo.ts).

### Usage without a module bundler
```
<script src="node_modules/<%- npmModuleName %>/<%- npmModuleName %>.js"></script>
<script>
    // everything is exported <%- moduleGlobal %> namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://<%- githubUsername %>.github.io/<%- githubRepoName %>/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests. 

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
