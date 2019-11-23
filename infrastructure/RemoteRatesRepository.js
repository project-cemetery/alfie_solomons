const { ExchangeRate } = require('../domain/ExchangeRate');

class RemoteRatesRepository {
  get = async (from, to, date) => {
    // TODO: get from remote source

    return new ExchangeRate(from, to, date, 12);
  };
}

module.exports = {
  RemoteRatesRepository,
};
