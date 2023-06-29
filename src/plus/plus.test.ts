import plus from '.';

describe('plus', () => {
  it('результат вычислений верен', () => {
    expect(plus(1, 5)).toBe(6);
    expect(plus(-1, 3)).toBe(2);
    expect(plus(-5, -5)).toBe(-10);
  });
});
