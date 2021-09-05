import PG from "pg";
import { readFileSync } from "fs";
import { join } from "path";

export const getDbClient = ({ config }) => {
  const getSslConfig = config.isDev()
    ? () => undefined
    : () => ({
        ca: readFileSync(
          join(__dirname, "..", "..", ".secure", "ca-certificate.txt")
        ),
      });

  return new PG.Client({
    user: config.getOrThrow("DB_USER"),
    database: config.getOrThrow("DB_NAME"),
    password: config.getOrThrow("DB_PASSWORD"),
    port: config.getOrThrow("DB_PORT"),
    host: config.getOrThrow("DB_HOST"),
    ssl: getSslConfig(),
  });
};
