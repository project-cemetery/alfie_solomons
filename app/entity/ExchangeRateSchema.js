import { EntitySchema } from "typeorm";

export const ExchangeRateSchema = new EntitySchema({
  name: "ExchangeRate",
  tableName: "exchange_rate",
  columns: {
    from: {
      primary: true,
      type: "varchar",
    },
    to: {
      primary: true,
      type: "varchar",
    },
    date: { primary: true, type: "date" },
    source: { type: "varchar" },
    rate: { type: "decimal" },
  },
});
