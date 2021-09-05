const awilix = require("awilix");
const { Cache, InMemoryProvider } = require("@solid-soda/cache");

const { ConvertController } = require("./presentation/v1/ConvertController");
const { ErrorHandler } = require("./presentation/ErrorHandler");
const { MoneyConverter } = require("./application/MoneyConverter");
const {
  LocalRatesRepository,
} = require("./infrastructure/LocalRatesRepository");
const { LocalRatesSaver } = require("./infrastructure/LocalRatesSaver");
const {
  RemoteRatesRepository,
} = require("./infrastructure/RemoteRatesRepository");
const {
  MannyApiClient,
} = require("./infrastructure/exchangeApi/MannyApiClient");
const {
  ExchangeRatesApiClient,
} = require("./infrastructure/exchangeApi/ExchangeRatesApiClient");
const { getConfig } = require("./utils/getConfig");
const { getDbClient } = require("./utils/getDbClient");
const { getQueryBuilder } = require("./utils/getQueryBuilder");

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // presentation
  convertController: awilix.asClass(ConvertController),
  errorHandler: awilix.asClass(ErrorHandler),
  //application
  moneyConverter: awilix.asClass(MoneyConverter),
  // infrastructure
  localRatesRepository: awilix.asClass(LocalRatesRepository),
  localRatesSaver: awilix.asClass(LocalRatesSaver),
  remoteRatesRepository: awilix.asClass(RemoteRatesRepository),
  mannyApiClient: awilix.asClass(MannyApiClient),
  exchangeRatesApiClient: awilix.asClass(ExchangeRatesApiClient),
  config: awilix.asFunction(getConfig),
  dbClient: awilix.asFunction(getDbClient),
  queryBuilder: awilix.asFunction(getQueryBuilder),
  cache: awilix.asValue(new Cache(new InMemoryProvider())),
});

module.exports = {
  container,
};
