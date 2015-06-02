import Confidence from 'confidence'
import AppConfig from './config'
import path from 'path'
import GoodConsole from 'good-console'

var criteria = {
  env: process.env.NODE_ENV
};


var manifest = {
  $meta: 'Our main server manifest',
  server: {},
  connections: [{
    host: AppConfig.get('/server/host'),
    port: AppConfig.get('/server/port')
  }],
  plugins: {
    'good': {
      opsInterval: 1000,
      reporters: [{
        reporter: GoodConsole,
        args: {
          $filter: 'env',
          test: [],
          $default: [{ log: '*', response: '*' }]
        }
      }]
    },
    './src/server/hello': {},
    './src/server/assets': {},
    './src/server/marty': {
      routes: path.join(__dirname, '../client/app/routes'),
      serverSideBaseUrl: AppConfig.get('/api/serverSideBasePath'),
      app: path.join(__dirname, '../client/app/app')
    }
  }
};


var store = new Confidence.Store(manifest);


exports.get = (key) => {

  return store.get(key, criteria);
};


exports.meta = (key) => {

  return store.meta(key, criteria);
};
