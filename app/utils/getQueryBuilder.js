const knex = require("knex");

const getQueryBuilder = ({ dbClient }) => {
  const qb = knex({
    client: "pg",
    connection: dbClient.connectionParameters,
  });

  return qb;
};

module.exports = {
  getQueryBuilder,
};
