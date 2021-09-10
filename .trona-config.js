import { container } from "./app/container.js";

const client = container.resolve("dbClient");

await client.connect();

console.log(`Connected to database`);

export const evolutionsFolderPath = ["evolutions"];
export function runQuery(query) {
  return client.query(query).then((result) => result.rows);
}
