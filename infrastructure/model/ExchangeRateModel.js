const { ExchangeRate } = require('../../domain/ExchangeRate');

class ExchangeRateModel extends ExchangeRate {
  reverse() {
    return new ExchangeRateModel(to, from, this.collectAt, 1 / rate);
  }

  static fromObject({ from, to, collectAt, rate }) {
    return new ExchangeRateModel(from, to, collectAt, rate);
  }

  static TABLE = 'exchange_rate';
}

module.exports = {
  ExchangeRateModel,
};
