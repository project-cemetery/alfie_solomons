import { differenceInDays } from "date-fns";
import { timeout } from "promise-timeout";
import { isNull } from "lodash-es";

import { ExchangeRateModel } from "./model/ExchangeRateModel.js";

export class RemoteRatesRepository {
  constructor({ mannyApiClient, exchangeRatesApiClient }) {
    this.clients = [mannyApiClient, exchangeRatesApiClient];
  }

  find = async (from, to, date) => {
    const MIN_DAY_FOR_HISTORY_TRANSACTION = 2;

    const rateIsOld =
      Math.abs(differenceInDays(date, new Date())) >
      MIN_DAY_FOR_HISTORY_TRANSACTION;

    const result = await (rateIsOld
      ? this._getHistoryExchangeRate(from, to, date)
      : this._getExchangeRate(from, to));

    if (isNull(result)) {
      return null;
    }

    const { rate, source } = result;

    return new ExchangeRateModel(from, to, date, rate, source);
  };

  _getExchangeRate = async (from, to) => {
    for (const client of this.clients) {
      try {
        const rate = await this._fetchWithTimeout(
          client.getExchangeRate(from, to)
        );

        return { rate, source: client.name };
      } catch (e) {
        // TODO: correct logger
        console.error(e);
      }
    }

    return null;
  };

  _getHistoryExchangeRate = async (from, to, when) => {
    for (const client of this.clients) {
      try {
        const rate = await this._fetchWithTimeout(
          client.getHistoryExchangeRate(from, to, when)
        );

        return { rate, source: client.name };
      } catch (e) {
        // TODO: correct logger
        console.error(e);
      }
    }

    return null;
  };

  _fetchWithTimeout = async (promise) => {
    return timeout(promise, 1000);
  };
}
