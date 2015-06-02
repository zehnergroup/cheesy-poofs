module.exports = function getBundleName() {
  var version = require('../../package.json').version;
  var name = require('../../package.json').name;
  return version + '.' + name + '.' + 'min';
};
