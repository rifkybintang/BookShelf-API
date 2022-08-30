const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // ini yang sering bikin error server, routes nya
  server.route(routes);

  await server.start();
  console.log('Server berjalan pada port: %s', server.info.uri);
};

init();
