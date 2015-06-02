/**
 * Client side config storage. Uses the Confidence config
 * library at: https://github.com/hapijs/confidence
 */

import Confidence from 'confidence'
import env from '../../utils/env'

var criteria = {
    env: env.get(),
    nodeEnv: process.env.NODE_ENV
};


var config = {

  $meta: 'Our main client config',

  pkg: require('../../../package.json'),

  api: {

    prefix: {
      $filter: 'env',
      server: 'http://localhost:8003',
      $default: (env.CLIENT) ? window.location.protocol + '//' + window.location.host : '/'
      // $default: {
      //   $filter: 'nodeEnv',
      //   dev: 'http://' + process.env.SITE_HOSTNAME,
      //   $default: 'http://' + process.env.SITE_HOSTNAME + ':8003'
      // }
    }
  }

}

var store = new Confidence.Store(config);


exports.get = (key) => {
    return store.get(key, criteria);
};


exports.meta = (key) => {
    return store.meta(key, criteria);
};
