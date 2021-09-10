import { startOfDay, endOfDay } from "date-fns";
import { differenceInDays } from "date-fns";
import { Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";

import { ExchangeRate } from "../application/ExchangeRate.js";
import { ExchangeRateSchema } from "../entity/ExchangeRateSchema.js";

export class LocalRatesRepository {
  constructor({ ormConnection }) {
    this.waitableConnection = ormConnection;
  }

  save = async (rate) => {
    const connection = await this.waitableConnection;

    await connection
      .createQueryBuilder()
      .insert()
      .into(ExchangeRateSchema)
      .values([rate])
      .execute();
  };

  findNearest = async (from, to, date) => {
    const connection = await this.waitableConnection;

    const [firstAfter, lastBefore] = await Promise.all([
      connection.getRepository(ExchangeRateSchema).findOne({
        where: {
          from,
          to,
          date: MoreThanOrEqual(date),
        },
        order: {
          date: "DESC",
        },
      }),
      connection.getRepository(ExchangeRateSchema).findOne({
        where: {
          from,
          to,
          date: LessThanOrEqual(date),
        },
        order: {
          date: "ASC",
        },
      }),
    ]);

    console.log(firstAfter, lastBefore);

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

    return ExchangeRate.fromObject(nearest, { execution: "local" });
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
    const connection = await this.waitableConnection;

    const rate = await connection.getRepository(ExchangeRateSchema).findOne({
      from,
      to,
      date: Between(startOfDay(date), endOfDay(date)),
    });

    if (rate) {
      return ExchangeRate.fromObject(rate, { execution: "local" });
    }

    return null;
  };
}
