const { isValid, parseISO } = require('date-fns');

const { InvalidQueryException } = require('../error/InvalidQueryException');

class ConvertController {
  constructor({ moneyConverter, errorHandler }) {
    this.moneyConverter = moneyConverter;
    this.errorHandler = errorHandler;
  }

  handle = async ({ query }, reply) =>
    this.errorHandler.invoke(reply, async () => {
      await this._throwUnlessValid(query);

      const { amount, from, to, date } = query;

      const money = {
        amount: BigInt(amount),
        currency: from.toUpperCase(),
      };
      const targetCurrency = to.toUpperCase();
      const when = parseISO(date);

      const result = await this.moneyConverter.convert(
        money,
        targetCurrency,
        when,
      );

      return {
        result: result.toString(),
      };
    });

  _throwUnlessValid = async query => {
    const requestIsValid = () => {
      try {
        const { from, to, amount, date } = query;

        const fromValid = from && from.length === 3;
        const toValid = to && to.length === 3;
        const amountValid = !isNaN(Number(amount));
        const dateValid = isValid(parseISO(date));

        return fromValid && toValid && amountValid && dateValid;
      } catch (error) {
        return false;
      }
    };

    if (!requestIsValid()) {
      throw new InvalidQueryException(query);
    }
  };
}

module.exports = {
  ConvertController,
};
