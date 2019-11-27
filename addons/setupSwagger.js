const setupSwagger = path => ({
  routePrefix: path,
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Mr. Solomons',
      description: 'Money conversation service',
    },
    host: '/',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

module.exports = {
  setupSwagger,
};
