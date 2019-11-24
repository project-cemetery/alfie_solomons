const { ExchangeRateModel } = require('./model/ExchangeRateModel');

class LocalRatesSaver {
  constructor({ queryBuilder }) {
    this.queryBuilder = queryBuilder;
  }

  save = async rate => {
    await this.queryBuilder.insert(rate).table(ExchangeRateModel.TABLE);
  };
}

module.exports = {
  LocalRatesSaver,
};
