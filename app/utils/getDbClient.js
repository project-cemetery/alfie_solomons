import PG from "pg";

export const getDbClient = ({ config }) => {
  let pgConfig;

  if (config.isDev()) {
    pgConfig = {
      user: config.getOrThrow("DB_USER"),
      database: config.getOrThrow("DB_NAME"),
      password: config.getOrThrow("DB_PASSWORD"),
      port: config.getOrThrow("DB_PORT"),
      host: config.getOrThrow("DB_HOST"),
    };
  } else {
    pgConfig = {
      connectionString: config.getStringOrThrow("DATABASE_URL"),
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
  }

  return new PG.Client(pgConfig);
};
