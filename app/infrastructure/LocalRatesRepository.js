import { startOfDay, endOfDay } from "date-fns";
import { differenceInDays } from "date-fns";

import { ExchangeRate } from "../application/ExchangeRate.js";

export class LocalRatesRepository {
  constructor({ queryBuilder }) {
    this.queryBuilder = queryBuilder;
  }

  #TABLE = "exchange_rate";

  save = async (rate) => {
    await this.queryBuilder.insert(rate).table(this.#TABLE);
  };

  findNearest = async (from, to, date) => {
    const [firstAfter, lastBefore] = await Promise.all([
      this.queryBuilder
        .where({ from, to })
        .andWhere("date", ">=", date.toISOString())
        .orderBy("date", "desc")
        .first()
        .table(this.#TABLE),
      this.queryBuilder
        .where({ from, to })
        .andWhere("date", "<", date.toISOString())
        .orderBy("date", "asc")
        .first()
        .table(this.#TABLE),
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

    const afterDistance = Math.abs(differenceInDays(firstAfter.date, date));
    const beforeDistance = Math.abs(differenceInDays(lastBefore.date, date));

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
      .whereBetween("date", period)
      .first()
      .table(this.#TABLE);

    if (rate) {
      return ExchangeRate.fromObject(rate);
    }

    return null;
  };
}
