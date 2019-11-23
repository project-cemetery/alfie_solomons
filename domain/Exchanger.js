const PRECISION_MULTIPLIER = 1000;

class Exchanger {
  exchange = (amount, { rate }) =>
    (amount * BigInt(Math.round(rate * PRECISION_MULTIPLIER))) /
    BigInt(PRECISION_MULTIPLIER);
}

module.exports = {
  Exchanger,
};
