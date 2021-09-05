import { CoversationFailedException } from "./error/CoversationFailedException.js";

export class ExchangeRateFinder {
  constructor({ localRatesRepository, remoteRatesRepository }) {
    this.localRatesRepository = localRatesRepository;
    this.remoteRatesRepository = remoteRatesRepository;
  }

  find = async (sourceCurrency, targetCurrency, date) => {
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

    await this.localRatesRepository.save(rate).catch((e) => {
      // okay, we can't save rate to local registry
      // TODO: logging
      console.error(e);
    });

    return { ...rate, execution: "remote" };
  };
}
