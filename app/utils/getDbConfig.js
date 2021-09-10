export const getDbConfig = ({ config }) => {
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
        ca: config.getStringOrThrow("DATABASE_CA_CERT"),
        rejectUnauthorized: true,
      },
    };
  }

  return pgConfig;
};
