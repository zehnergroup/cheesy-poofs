var jsdom = require('jsdom');

module.exports = function() {
  global.document  = jsdom.jsdom('<!DOCTYPE html><html><head><title></title></head><body><div id="app"></div></body></html>');
  global.window    = document.parentWindow;
}