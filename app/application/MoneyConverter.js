import { CoversationFailedException } from "./error/CoversationFailedException.js";

export class MoneyConverter {
  constructor({
    localRatesRepository,
    localRatesSaver,
    remoteRatesRepository,
  }) {
    this.localRatesRepository = localRatesRepository;
    this.localRatesSaver = localRatesSaver;
    this.remoteRatesRepository = remoteRatesRepository;
  }

  convert = async (sourceCurrency, targetCurrency, date) => {
    let accurate = true;
    let rate = await this.#findAccurateRate(
      sourceCurrency,
      targetCurrency,
      date
    );

    if (!rate) {
      accurate = false;
      rate = await this.localRatesRepository.findNearest(
        sourceCurrency,
        targetCurrency,
        date
      );
    }

    if (!rate) {
      throw new CoversationFailedException(
        sourceCurrency,
        targetCurrency,
        date
      );
    }

    return {
      ...rate,
      accurate,
    };
  };

  #findAccurateRate = async (from, to, date) => {
    let rate = await this.localRatesRepository.find(from, to, date);

    if (rate) {
      return { ...rate, execution: "local" };
    }

    rate = await this.remoteRatesRepository.find(from, to, date);

    await this.localRatesSaver.save(rate).catch((e) => {
      // okay, we can't save rate to local registry
      // TODO: logging
      console.error(e);
    });

    return { ...rate, execution: "remote" };
  };
}
