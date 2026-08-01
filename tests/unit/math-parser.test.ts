import { describe, it, expect } from 'vitest';
import { evaluateMathExpression } from '../../lib/calculator/math-parser';
import { getFormattedError, getErrorMessage } from '../../lib/calculator/error-messages';

describe('math-parser engine', () => {
  describe('Basic Operations', () => {
    it('should evaluate addition correctly', () => {
      const res = evaluateMathExpression('5 + 3');
      expect(res).toEqual({ success: true, value: 8 });
    });

    it('should evaluate subtraction correctly', () => {
      const res = evaluateMathExpression('10 - 4');
      expect(res).toEqual({ success: true, value: 6 });
    });

    it('should evaluate multiplication correctly', () => {
      const res = evaluateMathExpression('6 * 7');
      expect(res).toEqual({ success: true, value: 42 });
    });

    it('should evaluate division correctly', () => {
      const res = evaluateMathExpression('20 / 4');
      expect(res).toEqual({ success: true, value: 5 });
    });

    it('should respect operator precedence (* and / over + and -)', () => {
      const res = evaluateMathExpression('2 + 3 * 4 - 6 / 2');
      // 2 + 12 - 3 = 11
      expect(res).toEqual({ success: true, value: 11 });
    });
  });

  describe('Decimal Numbers', () => {
    it('should handle decimal inputs and prevent floating point errors', () => {
      const res = evaluateMathExpression('0.1 + 0.2');
      expect(res).toEqual({ success: true, value: 0.3 });
    });

    it('should evaluate numbers with leading dot', () => {
      const res = evaluateMathExpression('.5 * 4');
      expect(res).toEqual({ success: true, value: 2 });
    });

    it('should handle complex decimal operations', () => {
      const res = evaluateMathExpression('12.5 / 2.5 + 3.14');
      expect(res).toEqual({ success: true, value: 8.14 });
    });
  });

  describe('Parentheses & Unary Operators', () => {
    it('should respect single parentheses', () => {
      const res = evaluateMathExpression('(2 + 3) * 4');
      expect(res).toEqual({ success: true, value: 20 });
    });

    it('should evaluate nested parentheses', () => {
      const res = evaluateMathExpression('((5 + 3) * (10 - 2)) / 4');
      // (8 * 8) / 4 = 16
      expect(res).toEqual({ success: true, value: 16 });
    });

    it('should evaluate unary negative numbers', () => {
      const res = evaluateMathExpression('-5 + 12');
      expect(res).toEqual({ success: true, value: 7 });
    });

    it('should evaluate unary positive numbers', () => {
      const res = evaluateMathExpression('+8 - 3');
      expect(res).toEqual({ success: true, value: 5 });
    });

    it('should evaluate multiplication with negative numbers', () => {
      const res = evaluateMathExpression('5 * -3');
      expect(res).toEqual({ success: true, value: -15 });
    });

    it('should evaluate nested unary minus in parentheses', () => {
      const res = evaluateMathExpression('-(-10)');
      expect(res).toEqual({ success: true, value: 10 });
    });
  });

  describe('Specific Error Handling & Error Indexing', () => {
    it('should detect EMPTY_INPUT', () => {
      const res = evaluateMathExpression('   ');
      expect(res).toEqual({ success: false, error: 'EMPTY_INPUT', index: 0 });

      const formatted = getFormattedError(res as any);
      expect(formatted.title).toBe('Masukan Kosong');
    });

    it('should detect NUMBER_TOO_LONG (>15 digits)', () => {
      const res = evaluateMathExpression('1234567890123456');
      expect(res).toEqual({ success: false, error: 'NUMBER_TOO_LONG', index: 0 });

      const formatted = getFormattedError(res as any);
      expect(formatted.title).toBe('Angka Terlalu Panjang');
    });

    it('should detect CONSECUTIVE_OPERATORS', () => {
      const res = evaluateMathExpression('5 ++ 3');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('CONSECUTIVE_OPERATORS');
        expect(res.index).toBe(3);
      }
    });

    it('should detect CONSECUTIVE_OPERATORS for multiply and divide', () => {
      const res = evaluateMathExpression('5 * / 2');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('CONSECUTIVE_OPERATORS');
        expect(res.index).toBe(4);
      }
    });

    it('should detect INCOMPLETE_PARENTHESIS (unclosed open parenthesis)', () => {
      const res = evaluateMathExpression('(5 + 3');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('INCOMPLETE_PARENTHESIS');
        expect(res.index).toBe(0);
      }
    });

    it('should detect INCOMPLETE_PARENTHESIS (unmatched close parenthesis)', () => {
      const res = evaluateMathExpression('5 + 3)');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('INCOMPLETE_PARENTHESIS');
        expect(res.index).toBe(5);
      }
    });

    it('should detect DIVISION_BY_ZERO', () => {
      const res = evaluateMathExpression('10 / 0');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('DIVISION_BY_ZERO');
        expect(res.index).toBe(3);
      }
    });

    it('should detect DIVISION_BY_ZERO when expression evaluates to zero', () => {
      const res = evaluateMathExpression('25 / (5 - 5)');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('DIVISION_BY_ZERO');
        expect(res.index).toBe(3);
      }
    });

    it('should detect INVALID_CHARACTER', () => {
      const res = evaluateMathExpression('5 + x');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('INVALID_CHARACTER');
        expect(res.index).toBe(4);
        expect(res.rawToken).toBe('x');
      }

      const formatted = getFormattedError(res as any);
      expect(formatted.message).toContain("'x'");
    });

    it('should detect SYNTAX_ERROR for multiple decimal dots', () => {
      const res = evaluateMathExpression('3.14.5 + 2');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('SYNTAX_ERROR');
        expect(res.index).toBe(4);
      }
    });

    it('should detect SYNTAX_ERROR for trailing operator', () => {
      const res = evaluateMathExpression('5 + 3 -');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toBe('SYNTAX_ERROR');
        expect(res.index).toBe(6);
      }
    });

    it('should format error messages with getErrorMessage helper', () => {
      const msg = getErrorMessage('DIVISION_BY_ZERO', { index: 5 });
      expect(msg.title).toBe('Pembagian dengan Nol');
      expect(msg.hint).toContain('tidak didefinisikan');
      expect(msg.index).toBe(5);
    });
  });
});
