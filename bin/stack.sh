#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var templatePath = path.join(__dirname, 'templates/stack.yml');
var template = fs.readFileSync(templatePath, 'utf-8');
var stackDirPath = path.join(__dirname, '../stacks');

// Add variables that you want interpolated in the template
// to this hash
var variables = {
  tag_name: process.env.TAG
}

// Interpolate the vars
for (var key in variables) {
  var regex = new RegExp('<%=(\\s)*' + key + '(\\s)*%>', 'g');
  template = template.replace(regex, variables[key]);
}

// Make our stacks directory
if (!fs.existsSync(stackDirPath)) {
  fs.mkdirSync(stackDirPath);
}

// Write our template
var finalFileName = 'stack-' + process.env.BRANCH.replace(/\//g, '-') + '.yml';
var finalFilePath = path.join(stackDirPath, finalFileName);
fs.writeFileSync(finalFilePath, template);

console.log('stacks/' + finalFileName);
