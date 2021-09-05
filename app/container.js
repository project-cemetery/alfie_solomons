import * as awilix from "awilix";

import { HttpController } from "./presentation/HttpController.js";
import { ErrorHandler } from "./presentation/ErrorHandler.js";
import { ExchangeRateFinder } from "./application/ExchangeRateFinder.js";
import { LocalRatesRepository } from "./infrastructure/LocalRatesRepository.js";
import { RemoteRatesRepository } from "./infrastructure/RemoteRatesRepository.js";
import { MannyApiClient } from "./infrastructure/exchangeApi/MannyApiClient.js";
import { ExchangeRatesApiClient } from "./infrastructure/exchangeApi/ExchangeRatesApiClient.js";
import { getConfig } from "./utils/getConfig.js";
import { getDbClient } from "./utils/getDbClient.js";
import { getQueryBuilder } from "./utils/getQueryBuilder.js";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // presentation
  httpController: awilix.asClass(HttpController),
  errorHandler: awilix.asClass(ErrorHandler),
  //application
  exchangeRateFinder: awilix.asClass(ExchangeRateFinder),
  // infrastructure
  localRatesRepository: awilix.asClass(LocalRatesRepository),
  remoteRatesRepository: awilix.asClass(RemoteRatesRepository),
  mannyApiClient: awilix.asClass(MannyApiClient),
  exchangeRatesApiClient: awilix.asClass(ExchangeRatesApiClient),
  config: awilix.asFunction(getConfig),
  dbClient: awilix.asFunction(getDbClient),
  queryBuilder: awilix.asFunction(getQueryBuilder),
});

export { container };
