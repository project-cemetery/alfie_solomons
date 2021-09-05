export class ExchangeRate {
  constructor(from, to, date, rate, source) {
    this.from = from;
    this.to = to;
    this.date = date;
    this.rate = rate;
    this.source = source;
  }
}
