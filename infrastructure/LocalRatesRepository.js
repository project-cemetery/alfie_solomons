const { startOfDay, endOfDay } = require('date-fns');

const { ExchangeRateModel } = require('./model/ExchangeRateModel');

class LocalRatesRepository {
  constructor({ queryBuilder }) {
    this.queryBuilder = queryBuilder;
  }

  find = async (from, to, date) => {
    const actualRate = await this._findRate(from, to, date);
    if (actualRate) {
      return actualRate;
    }

    const reverseRate = await this._findRate(to, from, date);
    if (reverseRate) {
      return reverseRate.reverse();
    }

    return null;
  };

  _findRate = async (from, to, date) => {
    const period = [
      startOfDay(date).toISOString(),
      endOfDay(date).toISOString(),
    ];

    const rate = await this.queryBuilder
      .where({ from, to })
      .whereBetween('collectAt', period)
      .first()
      .table('exchange_rate');

    return ExchangeRateModel.fromObject(rate);
  };
}

module.exports = {
  LocalRatesRepository,
};
