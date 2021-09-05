import knex from "knex";

export const getQueryBuilder = ({ dbClient }) => {
  const qb = knex({
    client: "pg",
    connection: dbClient.connectionParameters,
  });

  return qb;
};
