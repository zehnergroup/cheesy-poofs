import _ from 'lodash';
import Marty from 'marty';

Marty.HttpStateSource.removeHook('parseJSON');

let bulk = require('bulk-require');

let Application = Marty.createApplication(function() {

  let dependencies = bulk(__dirname, [
    'stores/*.js',
    'actions/*.js',
    'queries/*.js',
    'sources/*.js'
  ]);

  _.each(dependencies, dep => this.register(dep));

});

module.exports = Application;