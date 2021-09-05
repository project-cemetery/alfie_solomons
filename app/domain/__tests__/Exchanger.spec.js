const { Exchanger } = require("../Exchanger");

describe("Exchanger", () => {
  let exchanger;

  beforeAll(() => {
    exchanger = new Exchanger();
  });

  test("should convert with rate > 1", () => {
    expect(exchanger.exchange(10n, { rate: 12 })).toEqual(120n);
    expect(exchanger.exchange(100n, { rate: 2 })).toEqual(200n);
  });

  test("should convert with rate < 1", () => {
    expect(exchanger.exchange(200n, { rate: 0.2 })).toEqual(40n);
    expect(exchanger.exchange(100n, { rate: 0.1 })).toEqual(10n);

    expect(exchanger.exchange(100n, { rate: 0.1234 })).toEqual(12n);
    expect(exchanger.exchange(1000n, { rate: 0.1234 })).toEqual(123n);
    expect(exchanger.exchange(10000n, { rate: 0.1234 })).toEqual(1234n);
  });

  test("should convert with rate = 1", () => {
    expect(exchanger.exchange(100n, { rate: 1 })).toEqual(100n);
    expect(exchanger.exchange(200n, { rate: 1 })).toEqual(200n);
    expect(exchanger.exchange(2230n, { rate: 1 })).toEqual(2230n);
    expect(exchanger.exchange(32320n, { rate: 1 })).toEqual(32320n);
    expect(exchanger.exchange(4324320n, { rate: 1 })).toEqual(4324320n);
  });
});
