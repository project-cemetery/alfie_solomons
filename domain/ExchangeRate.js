class ExchangeRate {
  constructor(from, to, collectAt, rate) {
    this.from = from;
    this.to = to;
    this.collectAt = collectAt;
    this.rate = rate;
  }
}

module.exports = {
  ExchangeRate,
};
