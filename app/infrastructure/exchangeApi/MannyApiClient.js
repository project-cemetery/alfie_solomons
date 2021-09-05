import axios from "axios";
import { format, differenceInDays } from "date-fns";

import { identity } from "../../helpers/identity.js";

export class MannyApiClient {
  constructor({ config }) {
    this._apiKey = config.getOrThrow("MANNY_API_KEY");

    this._simplePromises = {};
    this._historyPromises = {};
  }

  name = "MannyApiClient";

  getExchangeRate = async (from, to) => {
    const query = `${from}_${to}`;

    if (!this._simplePromises[query]) {
      this._simplePromises[query] = this.#request({ query });
    }

    return this._simplePromises[query];
  };

  getHistoryExchangeRate = async (from, to, when) => {
    const MAX_RATE_AGE_IN_DAYS = 360;

    // Api not respond for date older than MAX_RATE_AGE_IN_DAYS
    // Blank-shot-requests not successful, but spend the limit
    if (Math.abs(differenceInDays(when, new Date())) > MAX_RATE_AGE_IN_DAYS) {
      return Promise.resolve(null);
    }

    const date = format(when, "yyyy-MM-dd");
    const query = `${from}_${to}`;

    const fullQuery = `${query}_${date}`;

    if (!this._historyPromises[fullQuery]) {
      this._historyPromises[fullQuery] = this.#request(
        {
          query,
          date,
        },
        (dateData) => dateData[date]
      );
    }

    return this._historyPromises[fullQuery];
  };

  #request = async ({ query, date }, mapper = identity) => {
    const API_URL = "https://free.currencyconverterapi.com/api/v6/convert";

    const dateParam = !!date ? `&date=${date}` : "";

    const requestUrl = `${API_URL}?q=${query}&apiKey=${this._apiKey}${dateParam}`;

    return axios
      .get(requestUrl)
      .then((response) => response.data)
      .then((data) => data.results)
      .then((results) => results[query])
      .then((rate) => rate.val)
      .then(mapper);
  };
}
