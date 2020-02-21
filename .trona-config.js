const { container } = require('./app/container');

const client = container.resolve('dbClient');

client.connect().then(() => {
  console.log(`Connected to database`);
});

module.exports = {
  evolutionsFolderPath: ['evolutions'],
  runQuery(query) {
    return client.query(query).then(result => result.rows);
  },
};
