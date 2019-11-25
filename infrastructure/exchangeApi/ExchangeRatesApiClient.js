const axios = require('axios');
const { format } = require('date-fns');
const { Option } = require('nanoption');

class ExchangeRatesApiClient {
  constructor() {
    this._simplePromises = {};
    this._historyPromises = {};
  }

  getExchangeRate = async (from, to) => {
    const query = `${from}_${to}`;

    if (!this._simplePromises[query]) {
      this._simplePromises[query] = this._request({ from, to });
    }

    return this._simplePromises[query];
  };

  getHistoryExchangeRate = async (from, to, when) => {
    const date = format(when, 'yyyy-MM-dd');
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
    const API_URL = 'https://api.exchangeratesapi.io';

    const dateParam = !!date ? `${date}` : 'latest';

    const requestUrl = `${API_URL}/${dateParam}?base=${from}&symbols=${to}`;

    return axios
      .get(requestUrl)
      .then(response => response.data)
      .then(data => data.rates)
      .then(rates => rates[to])
      .then(rate => parseFloat(rate))
      .then(rate => Option.of(rate))
      .catch(() => Option.of(null));
  };
}

module.exports = {
  ExchangeRatesApiClient,
};
