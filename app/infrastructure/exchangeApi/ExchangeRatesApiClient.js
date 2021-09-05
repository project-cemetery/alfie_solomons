const axios = require("axios");
const { format } = require("date-fns");

class ExchangeRatesApiClient {
  constructor({ config }) {
    this._apiKey = config.getOrThrow("EXCHANGE_RATES_API_KEY");

    this._simplePromises = {};
    this._historyPromises = {};
  }

  name = "ExchangeRatesApiClient";

  getExchangeRate = async (from, to) => {
    const query = `${from}_${to}`;

    if (!this._simplePromises[query]) {
      this._simplePromises[query] = this._request({ from, to });
    }

    return this._simplePromises[query];
  };

  getHistoryExchangeRate = async (from, to, when) => {
    const date = format(when, "yyyy-MM-dd");
    const query = `${from}_${to}`;

    const fullQuery = `${query}_${date}`;

    if (!this._historyPromises[fullQuery]) {
      this._historyPromises[fullQuery] = this._request({
        from,
        to,
        date,
      });
    }

    return this._historyPromises[fullQuery];
  };

  _request = async ({ from, to, date }) => {
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
                data.error.info ?? "Something went wrong"
              }`
            );
          }

          return data.rates;
        })
        .then((rates) => rates[currecy])
        .then((rate) => parseFloat(rate));
    }

    const [eurTo, eurFrom] = await Promise.all([
      rateFromEuroToAnything(to),
      rateFromEuroToAnything(from),
    ]);

    return eurFrom / eurTo;
  };
}

module.exports = {
  ExchangeRatesApiClient,
};
