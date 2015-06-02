import Confidence from 'confidence'
import path from 'path'

var criteria = {
    env: process.env.NODE_ENV
};

var config = {

  $meta: 'Our main server config',

  pkg: require('../../package.json'),

  server : {
    port : '8004',
    host : '0.0.0.0'
  },

  api: {
    title: 'zg-site',
    description: 'The front-end and middleware tier for the ZehnerGroup site',

    serverSideBasePath: 'http://localhost:8003',
  },

  marty: {
    fetchTimeout: {
      $filter: 'env',
      prod: 1000,
      $default: 15000
    }
  },

  security: {
    jwtSecret: 'please-replace-this-with-a-secret'
  },

  contentPath: path.join(__dirname, '../../content/'),

  logging : {
    enabled: {
      $filter: 'env',
      test: false,
      $default: true
    },
    reporters : [{
      reporter: require('good-console'),
      args:[{ log: '*', response: '*' }]
    }]
  },



}

var store = new Confidence.Store(config);


exports.get = (key) => {

    return store.get(key, criteria);
};


exports.meta = (key) => {

    return store.meta(key, criteria);
};
