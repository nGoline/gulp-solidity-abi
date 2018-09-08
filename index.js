'use strict';

var through = require('through2');

module.exports = function gulpSolidityABI() {
  /**
   * @this {Transform}
   */
  let transform = function (file, encoding, callback) {
    let contents = file.contents ? file.contents.toString() : '';
    let extension = file.relative.substring(file.relative.lastIndexOf('.'));
    if (contents && extension === '.json') {
      let parsedContent = JSON.parse(contents);
      let newContent = `var ${parsedContent.contractName}={"abi":${JSON.stringify(parsedContent.abi)}};`;

      // Set correct extension *.js*
      let newFile = file.clone({ contents: false });
      newFile.contents = new Buffer(newContent);
      newFile.path = file.path.substring(0, file.path.lastIndexOf('.')) + '.js';

      this.push(newFile);
      callback();
    } else {
      this.push(file);
      callback();
    }
  };

  return through.obj(transform);
};