const awilix = require('awilix');

const { ConvertController } = require('./presentation/v1/ConvertController');
const { MoneyConverter } = require('./application/MoneyConverter');
const { Exchanger } = require('./domain/Exchanger');
const {
  LocalRatesRepository,
} = require('./infrastructure/LocalRatesRepository');
const { LocalRatesSaver } = require('./infrastructure/LocalRatesSaver');
const {
  RemoteRatesRepository,
} = require('./infrastructure/RemoteRatesRepository');
const {
  MannyApiClient,
} = require('./infrastructure/exchangeApi/MannyApiClient');
const {
  ExchangeRatesApiClient,
} = require('./infrastructure/exchangeApi/ExchangeRatesApiClient');
const { getConfig } = require('./utils/getConfig');
const { getDbClient } = require('./utils/getDbClient');
const { getQueryBuilder } = require('./utils/getQueryBuilder');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // presentation
  convertController: awilix.asClass(ConvertController),
  //application
  moneyConverter: awilix.asClass(MoneyConverter),
  // domain
  exchanger: awilix.asClass(Exchanger),
  // infrastructure
  localRatesRepository: awilix.asClass(LocalRatesRepository),
  localRatesSaver: awilix.asClass(LocalRatesSaver),
  remoteRatesRepository: awilix.asClass(RemoteRatesRepository),
  mannyApiClient: awilix.asClass(MannyApiClient),
  exchangeRatesApiClient: awilix.asClass(ExchangeRatesApiClient),
  config: awilix.asFunction(getConfig),
  dbClient: awilix.asFunction(getDbClient),
  queryBuilder: awilix.asFunction(getQueryBuilder),
});

module.exports = {
  container,
};
