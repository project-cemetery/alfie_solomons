import awilix from "awilix";

import { ConvertController } from "./presentation/v1/ConvertController.js";
import { ErrorHandler } from "./presentation/ErrorHandler.js";
import { MoneyConverter } from "./application/MoneyConverter.js";
import { LocalRatesRepository } from "./infrastructure/LocalRatesRepository.js";
import { LocalRatesSaver } from "./infrastructure/LocalRatesSaver.js";
import { RemoteRatesRepository } from "./infrastructure/RemoteRatesRepository.js";
import { MannyApiClient } from "./infrastructure/exchangeApi/MannyApiClient.js";
import { ExchangeRatesApiClient } from "./infrastructure/exchangeApi/ExchangeRatesApiClient.js";
import { getConfig } from "./utils/getConfig.js";
import { getDbClient } from "./utils/getDbClient.js";
import { getQueryBuilder } from "./utils/getQueryBuilder.js";

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
});

export { container };
