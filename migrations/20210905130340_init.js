exports.up = async function (knex) {
  await knex.schema
    .withSchema("public")
    .createTable("exchange_rate", (table) => {
      table.string("from", 3);
      table.string("to", 3);
      table.date("collectAt");
      table.decimal("rate");

      table.primary(["from", "to", "collectAt"], {
        constraintName: "PK_exchange_rate",
      });
    });
};

exports.down = async function (knex) {
  await knex.schema.withSchema("public").dropTable("exchange_rate");
};
