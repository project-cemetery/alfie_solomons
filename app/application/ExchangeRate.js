export class ExchangeRate {
  constructor(from, to, date, rate, source) {
    this.from = from;
    this.to = to;
    this.date = date;
    this.rate = rate;
    this.source = source;
  }

  reverse() {
    return new ExchangeRate(this.to, this.from, this.date, 1 / this.rate);
  }

  static fromObject({ from, to, date, rate, source }) {
    return new ExchangeRate(from, to, date, rate, source);
  }
}
