import PG from "pg";

export const getDbClient = ({ config }) => {
  return new PG.Client({
    user: config.getOrThrow("DB_USER"),
    database: config.getOrThrow("DB_NAME"),
    password: config.getOrThrow("DB_PASSWORD"),
    port: config.getOrThrow("DB_PORT"),
    host: config.getOrThrow("DB_HOST"),
    ssl: config.isProd()
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : undefined,
  });
};
