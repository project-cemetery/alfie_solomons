const { ExchangeRate } = require('../../domain/ExchangeRate');

class ExchangeRateModel extends ExchangeRate {
  reverse() {
    return new ExchangeRateModel(
      this.to,
      this.from,
      this.collectAt,
      1 / this.rate,
    );
  }

  static fromObject({ from, to, collectAt, rate }) {
    return new ExchangeRateModel(from, to, collectAt, rate);
  }

  static TABLE = 'exchange_rate';
}

module.exports = {
  ExchangeRateModel,
};
