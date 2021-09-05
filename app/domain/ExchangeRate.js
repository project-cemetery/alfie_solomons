class ExchangeRate {
  constructor(from, to, collectAt, rate, source) {
    this.from = from;
    this.to = to;
    this.collectAt = collectAt;
    this.rate = rate;
    this.source = source;
  }
}

module.exports = {
  ExchangeRate,
};
