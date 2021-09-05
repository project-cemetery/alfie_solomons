import axios from "axios";
import { format, differenceInDays } from "date-fns";

export class ExchangeRatesApiClient {
  constructor({ config }) {
    this._apiKey = config.getOrThrow("EXCHANGE_RATES_API_KEY");

    this._simplePromises = {};
    this._historyPromises = {};
  }

  #NAME = "ExchangeRatesApiClient";

  find = async (from, to, date) => {
    const MIN_DAY_FOR_HISTORY_TRANSACTION = 2;

    const rateIsOld =
      Math.abs(differenceInDays(date, new Date())) >
      MIN_DAY_FOR_HISTORY_TRANSACTION;

    const rate = await (rateIsOld
      ? this.#getHistoryExchangeRate(from, to, date)
      : this.#getExchangeRate(from, to));

    return { rate, source: this.#NAME };
  };

  #getExchangeRate = async (from, to) => {
    const query = `${from}_${to}`;

    if (!this._simplePromises[query]) {
      this._simplePromises[query] = this.#request({ from, to });
    }

    return this._simplePromises[query];
  };

  #getHistoryExchangeRate = async (from, to, when) => {
    const date = format(when, "yyyy-MM-dd");
    const query = `${from}_${to}`;

    const fullQuery = `${query}_${date}`;

    if (!this._historyPromises[fullQuery]) {
      this._historyPromises[fullQuery] = this.#request({
        from,
        to,
        date,
      });
    }

    return this._historyPromises[fullQuery];
  };

  #request = async ({ from, to, date }) => {
    const API_URL = "http://api.exchangeratesapi.io";

    const dateParam = !!date ? `${date}` : "latest";

    const rateFromEuroToAnything = (currecy) => {
      const requestUrl = `${API_URL}/${dateParam}?&symbols=${currecy}&access_key=${this._apiKey}`;

      return axios
        .get(requestUrl)
        .then((response) => response.data)
        .then((data) => {
          if (!data.success) {
            throw new Error(
              `${data.error.code}: ${data.error.type}: ${
                data.error.info || "Something went wrong"
              }`
            );
          }

          return data.rates;
        })
        .then((rates) => rates[currecy])
        .then((rate) => parseFloat(rate));
    };

    const [eurTo, eurFrom] = await Promise.all([
      rateFromEuroToAnything(to),
      rateFromEuroToAnything(from),
    ]);

    return eurTo / eurFrom;
  };
}
