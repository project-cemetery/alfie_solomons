const { Client } = require("pg");
const { readFileSync } = require("fs");
const { join } = require("path");

const getDbClient = ({ config }) => {
  const getSslConfig = config.isDev()
    ? () => undefined
    : () => ({
        ca: readFileSync(
          join(__dirname, "..", "..", ".secure", "ca-certificate.txt")
        ),
      });

  return new Client({
    user: config.getOrThrow("DB_USER"),
    database: config.getOrThrow("DB_NAME"),
    password: config.getOrThrow("DB_PASSWORD"),
    port: config.getOrThrow("DB_PORT"),
    host: config.getOrThrow("DB_HOST"),
    ssl: getSslConfig(),
  });
};

module.exports = {
  getDbClient,
};
