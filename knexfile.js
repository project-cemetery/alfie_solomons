import { container } from "./app/container.js";

const dbClient = container.resolve("dbClient");

export default {
  client: "pg",
  connection: dbClient.connectionParameters,

  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
