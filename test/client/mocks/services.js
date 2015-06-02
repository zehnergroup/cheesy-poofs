var mock = require('mock-require');
var yaml = require('js-yaml');
var fs   = require('fs');
var path = require('path');

/**
 * Work Mock
 */

var WorkServiceMock = module.exports.WorkServiceMock = {};

WorkServiceMock.getWorkIndex = function(params) {
  var filePath = path.join(__dirname, '../../../content/work/index.yaml');
  return {workIndex: yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'))};
}

WorkServiceMock.getWorkDetail = function(params) {
  var filePath = path.join(__dirname, '../../../content/work/' + params.slug + '.yaml');
  return {workDetail: yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'))};
}

mock('../../../src/client/app/services/Work', WorkServiceMock);

/**
 * Service Mock
 */

var ServicesServiceMock = module.exports.ServicesServiceMock = {};

ServicesServiceMock.getService = function(params) {
  var filePath = path.join(__dirname, '../../../content/services/' + params.category + '.yaml');
  return {service: yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'))};
}

mock('../../../src/client/app/services/Services', ServicesServiceMock);

/**
 * Careers Mock
 */

var CareersServiceMock = module.exports.CareersServiceMock = {};

CareersServiceMock.getCareersIndex = function(params) {
  var filePath = path.join(__dirname, '../../../content/careers/index.yaml');
  return {careers: yaml.safeLoad(fs.readFileSync(filePath, 'utf-8'))};
}

mock('../../../src/client/app/services/Careers', CareersServiceMock);