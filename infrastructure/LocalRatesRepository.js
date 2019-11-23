class LocalRatesRepository {
  find = async (from, to, date) => {
    console.log(from, to, date);
    // TODO: get from db
    return null;
  };
}

module.exports = {
  LocalRatesRepository,
};
