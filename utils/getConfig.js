const { DotEnvConfiguration, EnvConfiguration } = require('@solid-soda/config');
const path = require('path');

const isDev = () => process.env.NODE_ENV !== 'production';

const getConfig = () => {
  if (isDev()) {
    return new DotEnvConfiguration(path.resolve(__dirname, '../.env'));
  }

  return new EnvConfiguration();
};

module.exports = {
  getConfig,
};
