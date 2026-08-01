import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../../lib/calculator/math-parser';

describe('Scientific Calculator Engine (No eval & High Precision)', () => {
  it('calculates 2 + 3 * 4 = 14 following operator precedence', () => {
    const res = evaluateExpression('2 + 3 * 4');
    expect(res.error).toBeNull();
    expect(res.formattedValue).toBe('14');
  });

  it('calculates (2 + 3) * 4 = 20 respecting parentheses', () => {
    const res = evaluateExpression('(2 + 3) * 4');
    expect(res.error).toBeNull();
    expect(res.formattedValue).toBe('20');
  });

  it('handles exact decimal floating point precision: 0.1 + 0.2 = 0.3', () => {
    const res = evaluateExpression('0.1 + 0.2');
    expect(res.error).toBeNull();
    expect(res.formattedValue).toBe('0.3');
  });

  it('calculates sin(30) in DEGREE mode = 0.5', () => {
    const res = evaluateExpression('sin(30)', 'degree');
    expect(res.error).toBeNull();
    expect(parseFloat(res.formattedValue)).toBeCloseTo(0.5, 10);
  });

  it('calculates sin(pi / 6) in RADIAN mode = 0.5', () => {
    const res = evaluateExpression('sin(pi / 6)', 'radian');
    expect(res.error).toBeNull();
    expect(parseFloat(res.formattedValue)).toBeCloseTo(0.5, 10);
  });

  it('calculates ln(e) = 1', () => {
    const res = evaluateExpression('ln(e)');
    expect(res.error).toBeNull();
    expect(parseFloat(res.formattedValue)).toBeCloseTo(1, 10);
  });

  it('calculates 5! = 120 and 0! = 1', () => {
    const res5 = evaluateExpression('5!');
    expect(res5.formattedValue).toBe('120');

    const res0 = evaluateExpression('0!');
    expect(res0.formattedValue).toBe('1');
  });

  it('calculates exponents: 2^8 = 256', () => {
    const res = evaluateExpression('2^8');
    expect(res.formattedValue).toBe('256');
  });

  it('calculates square root: √(144) = 12', () => {
    const res = evaluateExpression('sqrt(144)');
    expect(res.formattedValue).toBe('12');
  });

  it('handles division by zero domain error: 5 / 0', () => {
    const res = evaluateExpression('5 / 0');
    expect(res.error).toBe('Tidak dapat membagi dengan nol.');
  });

  it('handles negative logarithm domain error: log(-1)', () => {
    const res = evaluateExpression('log(-1)');
    expect(res.error).toBe('Logaritma membutuhkan nilai lebih besar dari nol.');
  });

  it('handles negative square root domain error: sqrt(-1)', () => {
    const res = evaluateExpression('sqrt(-1)');
    expect(res.error).toBe('Tidak tersedia dalam mode bilangan nyata.');
  });

  it('handles unbalanced parenthesis error: (2 + 3', () => {
    const res = evaluateExpression('(2 + 3');
    expect(res.error).toBe('Periksa kembali tanda kurung.');
  });

  it('handles implicit multiplication: 2pi and 2(3+4)', () => {
    const resPi = evaluateExpression('2pi');
    expect(parseFloat(resPi.formattedValue)).toBeCloseTo(6.283185307, 6);

    const resParen = evaluateExpression('2(3+4)');
    expect(resParen.formattedValue).toBe('14');
  });

  it('handles contextual percentages correctly', () => {
    const res1 = evaluateExpression('10%');
    expect(res1.formattedValue).toBe('0.1');

    const res2 = evaluateExpression('200 * 10%');
    expect(res2.formattedValue).toBe('20');
  });
});
