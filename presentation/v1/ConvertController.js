const { isValid, parseISO } = require('date-fns');

class ConvertController {
  constructor({ moneyConverter }) {
    this.moneyConverter = moneyConverter;
  }

  handle = async ({ query }) => {
    const requestIsValid = this._validate(query);

    if (!requestIsValid) {
      // TODO: add real things
      throw new Error('Invalid query');
    }

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
  };

  _validate = query => {
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
}

module.exports = {
  ConvertController,
};
