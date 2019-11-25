const {
  CoversationFailedException,
} = require('./error/CoversationFailedException');

class MoneyConverter {
  constructor({
    exchanger,
    localRatesRepository,
    localRatesSaver,
    remoteRatesRepository,
  }) {
    this.exchanger = exchanger;
    this.localRatesRepository = localRatesRepository;
    this.localRatesSaver = localRatesSaver;
    this.remoteRatesRepository = remoteRatesRepository;
  }

  convert = async ({ amount, currency }, targetCurrency, date) => {
    const rate = await this._getRate(currency, targetCurrency, date);

    return this.exchanger.exchange(amount, rate);
  };

  _getRate = async (from, to, date) => {
    let rate = await this.localRatesRepository.find(from, to, date);

    if (!rate) {
      rate = await this.remoteRatesRepository.find(from, to, date);

      await this.localRatesSaver.save(rate).catch(() => {
        // okay, we can't save rate to local registry
      });
    }

    if (!rate) {
      throw new CoversationFailedException(from, to, date);
    }

    return rate;
  };
}

module.exports = {
  MoneyConverter,
};
