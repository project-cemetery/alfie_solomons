import PG from "pg";

import { container } from "./app/container.js";

const config = container.resolve("dbConfig");
const client = new PG.Client(config);

await client.connect();

console.log(`Connected to database`);

export const evolutionsFolderPath = ["evolutions"];
export function runQuery(query) {
  return client.query(query).then((result) => result.rows);
}
