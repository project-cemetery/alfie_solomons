const { ExchangeRate } = require('../../domain/ExchangeRate');

class ExchangeRateModel extends ExchangeRate {
  reverse() {
    return new ExhangeRateModel(to, from, this.collectAt, 1 / rate);
  }

  static fromObject({ from, to, collectAt, rate }) {
    return new ExhangeRateModel(from, to, collectAt, rate);
  }
}

module.exports = {
  ExchangeRateModel,
};
