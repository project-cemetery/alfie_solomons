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
    let accurate = true;
    let rate = await this._findAccurateRate(currency, targetCurrency, date);

    if (!rate) {
      accurate = false;
      rate = await this.localRatesRepository.findNearest(from, to, date);
    }

    if (!rate) {
      throw new CoversationFailedException(currency, targetCurrency, date);
    }

    return {
      value: this.exchanger.exchange(amount, rate),
      accurate,
    };
  };

  _findAccurateRate = async (from, to, date) => {
    let rate = await this.localRatesRepository.find(from, to, date);

    if (!rate) {
      rate = await this.remoteRatesRepository.find(from, to, date);

      await this.localRatesSaver.save(rate).catch(() => {
        // okay, we can't save rate to local registry
      });
    }

    return rate;
  };
}

module.exports = {
  MoneyConverter,
};
