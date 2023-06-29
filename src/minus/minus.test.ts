import minus from '.';

describe('minus', () => {
  it('результат вычислений верен', () => {
    expect(minus(1, 5)).toBe(-4);
    expect(minus(-1, 3)).toBe(-4);
    expect(minus(-5, -5)).toBe(0);
  });
});
