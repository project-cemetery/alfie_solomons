import { createConnection } from "typeorm";

import { ExchangeRateSchema } from "../entity/ExchangeRateSchema.js";

export function getOrm({ dbConfig }) {
  const { user, database, password, port, host, connectionString, ssl } =
    dbConfig;

  return createConnection({
    url: connectionString,
    username: user,
    database,
    password,
    port,
    host,
    ssl,
    type: "postgres",
    synchronize: false,
    entities: [ExchangeRateSchema],
  });
}
