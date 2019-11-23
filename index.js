const fastify = require('fastify')({ logger: true });

const { container } = require('./container');

fastify.get('/v1/convert', container.resolve('convertController').handle);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
