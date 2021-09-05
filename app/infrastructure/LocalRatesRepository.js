import { startOfDay, endOfDay } from "date-fns";
import { differenceInDays } from "date-fns";

import { ExchangeRateModel } from "./model/ExchangeRateModel.js";

export class LocalRatesRepository {
  constructor({ queryBuilder }) {
    this.queryBuilder = queryBuilder;
  }

  findNearest = async (from, to, date) => {
    const [firstAfter, lastBefore] = await Promise.all([
      this.queryBuilder
        .where({ from, to })
        .andWhere("collectAt", ">=", date.toISOString())
        .orderBy("collectAt", "desc")
        .first()
        .table(ExchangeRateModel.TABLE),
      this.queryBuilder
        .where({ from, to })
        .andWhere("collectAt", "<", date.toISOString())
        .orderBy("collectAt", "asc")
        .first()
        .table(ExchangeRateModel.TABLE),
    ]);

    if (!firstAfter && !lastBefore) {
      return null;
    }

    if (!firstAfter) {
      return lastBefore;
    }

    if (!lastBefore) {
      return firstAfter;
    }

    const afterDistance = Math.abs(
      differenceInDays(firstAfter.collectAt, date)
    );
    const beforeDistance = Math.abs(
      differenceInDays(lastBefore.collectAt, date)
    );

    const nearest = afterDistance > beforeDistance ? lastBefore : firstAfter;

    return nearest;
  };

  find = async (from, to, date) => {
    const actualRate = await this.#findRate(from, to, date);
    if (actualRate) {
      return actualRate;
    }

    const reverseRate = await this.#findRate(to, from, date);
    if (reverseRate) {
      return reverseRate.reverse();
    }

    return null;
  };

  #findRate = async (from, to, date) => {
    const period = [
      startOfDay(date).toISOString(),
      endOfDay(date).toISOString(),
    ];

    const rate = await this.queryBuilder
      .where({ from, to })
      .whereBetween("collectAt", period)
      .first()
      .table(ExchangeRateModel.TABLE);

    if (rate) {
      return ExchangeRateModel.fromObject(rate);
    }

    return null;
  };
}
