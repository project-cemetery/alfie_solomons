import { ExchangeRateModel } from "./model/ExchangeRateModel.js";

export class LocalRatesSaver {
  constructor({ queryBuilder }) {
    this.queryBuilder = queryBuilder;
  }

  save = async (rate) => {
    await this.queryBuilder.insert(rate).table(ExchangeRateModel.TABLE);
  };
}
