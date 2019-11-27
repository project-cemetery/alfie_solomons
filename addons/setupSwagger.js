const setupSwagger = (path, config) => {
  const host = config.isDev()
    ? 'localhost:3000'
    : config.getOrThrow('EXTERNAL_HOST');

  return {
    routePrefix: path,
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Mr. Solomons',
        description: 'Money conversation service',
      },
      host,
      schemes: ['https', 'http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  };
};

module.exports = {
  setupSwagger,
};
