import { ExchangeRate } from "../../domain/ExchangeRate.js";

export class ExchangeRateModel extends ExchangeRate {
  reverse() {
    return new ExchangeRateModel(
      this.to,
      this.from,
      this.date,
      1 / this.rate
    );
  }

  static fromObject({ from, to, date, rate, source }) {
    return new ExchangeRateModel(from, to, date, rate, source);
  }

  static TABLE = "exchange_rate";
}
