const { container } = require("./app/container");

const dbClient = container.resolve("dbClient");

module.exports = {
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
