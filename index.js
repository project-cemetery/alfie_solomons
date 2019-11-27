const fastify = require('fastify')({ logger: true });
const swagger = require('fastify-swagger');

const { container } = require('./container');
const { setupSwagger } = require('./addons/setupSwagger');

fastify.register(swagger, setupSwagger('/v1/docs'));

const convertController = container.resolve('convertController');
fastify.get('/v1/convert', convertController.docs, convertController.handle);

const start = async () => {
  try {
    fastify.ready(err => {
      if (err) throw err;
      fastify.swagger();
    });

    await fastify.listen(3000);

    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
