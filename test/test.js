'use strict';

const chai = require('chai');
const chaiString = require('chai-string');
const solidityABI = require('..');
const expect = chai.expect;
const File = require('vinyl');
const gulp = require('gulp');
const rename = require('gulp-rename');
const vfsFake = require('vinyl-fs-fake');

chai.should();
chai.use(chaiString);

describe('gulp-solidity-abi: init', () => {
  it('should return the gulp-solidity-abi object: required export', () => {
    expect(solidityABI).to.exist;
  });
});

describe('gulp-solidity-abi: base functionality', () => {
  it('should allow the file through', done => {
    let i = 0;

    gulp.src('test/fixtures/Ballot.json')
      .pipe(solidityABI())
      .on('data', file => {
        i += 1;
      })
      .once('end', () => {
        i.should.equal(1);
        done();
      });
  });

  it('should allow the file through:empty file, pipe dest', done => {
    let i = 0;

    gulp.src('test/fixtures/*.json')
      .pipe(solidityABI())
      .pipe(rename({
        suffix: '.generated',
      }))
      .pipe(gulp.dest(file => `${file.base}/empty-parsed`))
      .on('data', file => {
        i += 1;
      })
      .once('end', () => {
        i.should.equal(3);
        done();
      });
  });

  it('should allow the file through:js file', done => {
    let i = 0,
      j = 0;

    gulp.src(['test/fixtures/*.json', 'test/fixture/*.js'])
      .pipe(solidityABI())
      .pipe(rename({
        suffix: '.generated',
      }))
      .pipe(gulp.dest(file => `${file.base}/empty-parsed`))
      .on('data', file => {
        i += 1;

        let extension = file.relative.substring(file.relative.lastIndexOf('.'));
        
        if (extension === '.js') j += 1;
      })
      .once('end', () => {
        i.should.equal(3);
        j.should.equal(3);
        done();
      });
  });

  it('should produce the expected file', done => {
    let mockFile = new File({
      cwd: '/',
      base: '/test/',
      path: '/test/expected.abi.js',
      contents: new Buffer('var SimpleContract={"abi":[{"constant":true,"inputs":[],"name":"number","outputs":[' +
        '{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]};')
    });

    gulp.src('test/fixtures/SimpleContract.json')
      .pipe(solidityABI())
      .on('data', file => {
        file.contents.should.exist && expect(file.contents.toString()).to.equal(mockFile.contents.toString());
        done();
      });
  });

  it('should export the ABI: empty file, no `file.contents`', done => {
    let i = 0;

    let mockFile = new File({
      cwd: '/',
      base: '/test/',
      path: '/test/expected.abi.js',
      contents: undefined
    });

    vfsFake.src(mockFile)
      .pipe(solidityABI())
      .on('data', file => {
        i += 1;
      })
      .once('end', () => {
        i.should.equal(1);
        done();
      });
  });
});