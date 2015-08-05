import _ from 'lodash'
import path from 'path'
import AppConfig from '../config'
import Promise from 'bluebird'
import fs from 'fs'

// fs = Promise.promisifyAll(fs);

exports.register = (server, options, next) => {

  server.route({
      method: 'GET',
      path:'/api/test',
      handler: (request, reply) => {
        reply({
          message: "Hello World"
        })
      }
  });

  next();

}

exports.register.attributes = {
  name: 'test'
}
