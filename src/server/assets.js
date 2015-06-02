
exports.register = (server, options, next) => {

  // Add the route
  server.route({
      method: 'GET',
      path:'/assets/{file*}',
      handler: {
        directory: {
          path: 'assets',
          listing: false,
          index: true
        }
      }
  });

  next();

}

exports.register.attributes = {
  name: 'assets',
  version: '1.0.0'
}
