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
    let rate = await this.localRatesRepository.find(
      currency,
      targetCurrency,
      date,
    );

    if (!rate) {
      rate = await this.remoteRatesRepository.get(
        currency,
        targetCurrency,
        date,
      );
      await this.localRatesSaver.save(rate);
    }

    return this.exchanger.exchange(amount, rate);
  };
}

module.exports = {
  MoneyConverter,
};
