import { createConnection } from "typeorm";

import { ExchangeRateSchema } from "../entity/ExchangeRateSchema.js";

export function getOrm({ config }) {
  return createConnection({
    type: "postgres",
    username: config.getOrThrow("DB_USER"),
    database: config.getOrThrow("DB_NAME"),
    password: config.getOrThrow("DB_PASSWORD"),
    port: config.getOrThrow("DB_PORT"),
    host: config.getOrThrow("DB_HOST"),
    synchronize: false,
    entities: [ExchangeRateSchema],
  });
}
