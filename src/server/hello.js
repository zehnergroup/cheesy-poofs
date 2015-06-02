/**
 * Hello World
 * Returns a hello world message and the hostname of the machine the
 * server is running on
 *
 * url: /hello
 */

exports.register = (server, options, next) => {

  // Add the route
  server.route({
      method: 'GET',
      path:'/hello',
      handler: (request, reply) => {
        reply('hello world ' + process.env.HOSTNAME);
      }
  });

  next();

}

exports.register.attributes = {
  name: 'hello'
}
