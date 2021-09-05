export async function up(knex) {
  await knex.schema
    .withSchema("public")
    .createTable("exchange_rate", (table) => {
      table.string("from", 3);
      table.string("to", 3);
      table.date("collectAt");
      table.double("rate");

      table.string("source");

      table.primary(["from", "to", "collectAt"], {
        constraintName: "PK_exchange_rate",
      });
    });
}

export async function down(knex) {
  await knex.schema.withSchema("public").dropTable("exchange_rate");
}
