import { timeout } from "promise-timeout";

import { ExchangeRate } from "../application/ExchangeRate.js";

export class RemoteRatesRepository {
  constructor({ mannyApiClient, exchangeRatesApiClient }) {
    this.clients = [mannyApiClient, exchangeRatesApiClient];
  }

  find = async (from, to, date) => {
    for (const client of this.clients) {
      try {
        const { rate, source } = await timeout(
          client.find(from, to, date),
          1000
        );

        return new ExchangeRate(from, to, date, rate, source, "remote");
      } catch (e) {
        continue;
      }
    }

    return null;
  };
}
