# Installation

CDS design tokens are available as a npm package on [npm](https://www.npmjs.com/).

To install the package locally using npm:

      npm install cds-tokens
    
## Usage

**SCSS**

    // Webpack
    @import '~/cds-tokens/dist/scss/_cds-variables.scss';
	
	// Gulp.js
	@import '~/cds-tokens/dist/scss/_cds-variables.scss';

  
  If using Gulp.js

    // gulpfile.js
    .pipe(sass({ includePaths: ['node_modules'] })