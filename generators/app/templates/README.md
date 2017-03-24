# <%- projectTitle %>
[![Build Status](https://travis-ci.org/<%- githubUsername %>/<%- githubRepoName %>.svg?branch=master)](https://travis-ci.org/<%- githubUsername %>/<%- githubRepoName %>)
[![codecov](https://codecov.io/gh/<%- githubUsername %>/<%- githubRepoName %>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%- githubUsername %>/<%- githubRepoName %>)
[![npm version](https://badge.fury.io/js/<%- npmModuleName %>.svg)](http://badge.fury.io/js/<%- npmModuleName %>)
[![devDependency Status](https://david-dm.org/<%- githubUsername %>/<%- githubRepoName %>/dev-status.svg)](https://david-dm.org/<%- githubUsername %>/<%- githubRepoName %>?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/<%- githubUsername %>/<%- githubRepoName %>.svg)](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/issues)
[![GitHub stars](https://img.shields.io/github/stars/<%- githubUsername %>/<%- githubRepoName %>.svg)](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/<%- githubUsername %>/<%- githubRepoName %>/master/LICENSE)

## Demo
https://<%- githubUsername %>.github.io/<%- githubRepoName %>/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

<%- projectDescription %>

## Installation

Install through npm:
```
npm install --save <%- npmModuleName %>
```

Then include in your apps module:

```typescript
import { Component, NgModule } from '@angular/core';
import { <%- ngModuleName %> } from '<%- npmModuleName %>';

@NgModule({
  imports: [
    <%- ngModuleName %>.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/<%- githubUsername %>/<%- githubRepoName %>/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/<%- npmModuleName %>/bundles/<%- npmModuleName %>.umd.js"></script>
<script>
    // everything is exported <%- moduleGlobal %> namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://<%- githubUsername %>.github.io/<%- githubRepoName %>/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and <% if (isYarnAvailable) { %>[yarn](https://yarnpkg.com/en/docs/install)<% } else { %>NPM<% } %>
* Install local dev dependencies: `<% if (isYarnAvailable) { %>yarn<% } else { %>npm install<% } %>` while current directory is this repo

### Development server
Run `<% if (isYarnAvailable) { %>yarn<% } else { %>npm<% } %> start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `<% if (isYarnAvailable) { %>yarn<% } else { %>npm<% } %> test` to run tests once or `<% if (isYarnAvailable) { %>yarn<% } else { %>npm<% } %> run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
<% if (isYarnAvailable) { %>yarn<% } else { %>npm<% } %> run release
```

## License

MIT
