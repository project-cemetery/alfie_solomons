const { differenceInDays } = require('date-fns');
const { timeout } = require('promise-timeout');
const { Option } = require('nanoption');

const { ExchangeRateModel } = require('./model/ExchangeRateModel');

class RemoteRatesRepository {
  constructor({ mannyApiClient, exchangeRatesApiClient }) {
    this.clients = [mannyApiClient, exchangeRatesApiClient];
  }

  get = async (from, to, date) => {
    const MIN_DAY_FOR_HISTORY_TRANSACTION = 2;

    const rateIsOld =
      Math.abs(differenceInDays(date, new Date())) >
      MIN_DAY_FOR_HISTORY_TRANSACTION;

    const actualRate = await (rateIsOld
      ? this._getHistoryExchangeRate(from, to, date)
      : this._getExchangeRate(from, to));

    if (actualRate.nonEmpty()) {
      return new ExchangeRateModel(from, to, date, actualRate.get());
    }

    return null;
  };

  _getExchangeRate = async (from, to) => {
    for (const client of this.clients) {
      // await in loop because we want try sequentially get rate
      // eslint-disable-next-line no-await-in-loop
      const rate = await this._fetchWithTimeout(
        client.getExchangeRate(from, to),
      );

      if (rate.nonEmpty()) {
        return rate;
      }
    }

    return Option.of(null);
  };

  _getHistoryExchangeRate = async (from, to, when) => {
    for (const client of this.clients) {
      // await in loop because we want try sequentially get rate
      // eslint-disable-next-line no-await-in-loop
      const rate = await this._fetchWithTimeout(
        client.getHistoryExchangeRate(from, to, when),
      );

      if (rate.nonEmpty()) {
        return rate;
      }
    }

    return Option.of(null);
  };

  _fetchWithTimeout = async promise => {
    return timeout(promise, 1000).catch(() => Option.of(null));
  };
}

module.exports = {
  RemoteRatesRepository,
};
