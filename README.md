## Status

| Component    | Status                |
|--------------|-----------------------|
| Button       | Complete              |
| Card         | Complete              |
| Divider      | Complete              |
| Input        | Single input complete |
| List         | Complete              |
| Notification | Complete              |
| Typography   | Complete              |

## Installation

CDS Design Tokens is available as a npm package on [npm](https://www.npmjs.com/)

To install the package locally using npm:

`npm install cds-tokens`

## Usage

### SCSS

**Webpack**

`@import '~/cds-tokens/dist/scss/_cds-variables.scss';`

**Gulp.js**

`@import '~/cds-tokens/dist/scss/_cds-variables.scss';`

In gulpfile.js

`.pipe(sass({ includePaths: ['node_modules'] })`

### ES6 Modules

**Importing all modules as single object**

`import * as tokens from 'cds-tokens/dist/js/cds-variables';`

To use
`background: ${tokens.ColorBlue600};`

**Importing modules as individual objects**
`import {ColorBlue600} from 'cds-tokens/dist/js/cds-variables';`

## Project Structure

 `/`  contains style-dictionary build script and configs

`/properties` contains the design tokens input files (in JSON format)

`/properties/base` contains component agnostic tokens

`/properties/components` contains component tokens

`dist/` contains the generated output files (in different formats)

## Token Structure

| Key               | Example Values                          |
|-------------------|-----------------------------------------|
| Attribute Type    | color, font, space, size                |
| Attribute         | icon, line-height, icon-svg, inset      |
| Attribute Variant | gray-500, md, bold, success             |
| Component         | button, notification, typography, modal |
| Component Variant | alert, primary, t1-desktop, general     |
| Component State   | default, hover, active, focus           |

**Base Tokens**

| Base Token | Key    |
|------------|--------|
| Breakpoint | bp     |
| Color      | color  |
| Font       | font   |
| Grid       | grid   |
| Radius     | radius |
| Size       | Size   |
| Space      | space  |
| Typography | type   |

`Attribute Type → Attribute → Attribute Variant`

**Component Tokens**

`Component → Attribute Type → Component Variant → Component State → Attribute`

## Contributing

### Updating/Creating New Tokens

1. Pull the latest master branch and create a new branch (TODO branch guidelines)
2. Update or add new tokens using token structure
3. Run `npm run build` to build tokens
5. Use - [Install Local](https://www.npmjs.com/package/install-local) or [NPM Link](https://docs.npmjs.com/cli/v7/commands/npm-link) to test current branch tokens in your project.
6. When tokens are ready, follow [Publishing to NPM](#publishing-to-npm) section.

### Versioning

This project's versioning specification is based off of [Semantic Versioning](https://semver.org/) (also known as semver)

- **Patch version (0.0.x)** -> A patch version will be automatically released when tokens contain backwards-compatible changes. This means that for a specific design-system some values are corrected and updated (ie: a color get updated)
- **Minor version (0.x.0)** -> A minor version will be automatically released when a new functionality is added in a backwards-compatible manner. This means that for a specific design-system you are adding new decisions (ie: a new color is added)
- **Major version (x.0.0)** -> A major version will be automatically released when a breaking changes is identified. This means that for a specific design token some values where removed (ie: a color was removed)

### Publishing to NPM

1. Before you start make sure the project's CHANGELOG.MD is up to date. (TODO)
2. Update the package `version` number in `/package.json` (use [Semantic Versioning](https://semver.org/) to determine what the new version number should be).
3. Run `npm install` to update the package-lock.json file.
4. Submit a pull request with your changes (or commit directly to `master` if you have permission). Once the changes have been merged to master.
5. Run `npm run test`. If tests pass, continue to next step (TODO, can combine with build step). 
6. Run `npm run build` to run the build script ([Style Dictionary](https://amzn.github.io/style-dictionary/#/))
7. If the build is successful publish to NPM using `npm publish`.


## References

- [Style Dictionary Quick Start](https://amzn.github.io/style-dictionary/#/quick_start)