# gulp-solidity-abi [![Build Status](https://travis-ci.org/nGoline/gulp-solidity-abi.svg?branch=master)](https://travis-ci.org/nGoline/gulp-solidity-abi)

This is a gulp plugin to extract the ABI from Solidity contract and transform it into a js variable.

## Getting Started

This package will help you develop DApps using gulp to bundle and minify your resources.

### Installing

Just install it via npm:

```bash
npm install gulp-solidity-abi --save-dev
```

## API

### gulpSolidityABI()

#### Directly to .js files

```javascript
let gulp = require('gulp');
let solidityABI = require('gulp-solidity-abi');

gulp.task('export-abi', _ => {
  return gulp.src('build/contracts/*.json')
    .pipe(solidityABI())
    .pipe(gulp.dest('dist/js'));
});
```

#### Concatenate the ABI into one .js file

```javascript
let gulp = require('gulp');
let solidityABI = require('gulp-solidity-abi');
var concat = require('gulp-concat');

gulp.task('export-abi', _ => {
  return gulp.src('build/contracts/*.json')
    .pipe(solidityABI())
    .pipe(concat('contracts.js'))
    .pipe(gulp.dest('dist/js'));
});
```

## Built With

* [Node.js](https://nodejs.org)
* [gulp](https://gulpjs.com)
* [Mocha](https://mochajs.org)

## Contributing

Please read [CONTRIBUTING.md](https://github.com/ngoline/gulp-solidity-abi/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ngoline/gulp-solidity-abi/tags).

## Authors

* **Níckolas Goline** - *Initial work* - [nGoline](https://github.com/ngoline)

See also the list of [contributors](https://github.com/ngoline/gulp-solidity-abi/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.
