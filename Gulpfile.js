// Load Dependencies
var fs    = require('fs')
  , path  = require('path');

// Let eveyone know what ENV were on
console.log('Gulping for env: ' + process.env.NODE_ENV || '**NO ENV SET**')

// Path to task directory
var taskDir = path.join(__dirname, 'gulp', 'tasks');

// Load tasks
fs.readdirSync(taskDir).forEach(function(task) {
  require(path.join(taskDir, task));
});
