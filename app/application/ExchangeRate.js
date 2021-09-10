export class ExchangeRate {
  constructor(from, to, date, rate, source, execution) {
    this.from = from;
    this.to = to;
    this.date = date;
    this.rate = rate;
    this.source = source;
    this.execution = execution;
  }

  reverse() {
    return new ExchangeRate(this.to, this.from, this.date, 1 / this.rate);
  }

  static fromObject({ from, to, date, rate, source }, { execution }) {
    return new ExchangeRate(from, to, date, rate, source, execution);
  }
}
