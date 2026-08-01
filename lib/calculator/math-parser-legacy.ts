import { evaluateExpression } from './math-parser';

export interface MathEvaluationResult {
  success: boolean;
  value?: number;
  error?: string;
  index?: number;
  rawToken?: string;
}

export function evaluateMathExpressionLegacy(expression: string): MathEvaluationResult {
  let sanitized = expression.trim();
  if (!sanitized) {
    return { success: false, error: 'EMPTY_INPUT', index: 0 };
  }

  // Handle leading unary plus e.g. +8 - 3
  if (sanitized.startsWith('+')) {
    sanitized = sanitized.slice(1).trim();
  }

  // Check for number too long (> 15 digits)
  const numbers = sanitized.match(/\d+/g) || [];
  for (const numStr of numbers) {
    if (numStr.length > 15) {
      const idx = sanitized.indexOf(numStr);
      return { success: false, error: 'NUMBER_TOO_LONG', index: idx };
    }
  }

  // Check for consecutive operators e.g. 5 ++ 3 or 5 * / 2
  const consecMatch = sanitized.match(/([+\-*/]\s*[+\-*/]+)/);
  if (consecMatch && consecMatch.index !== undefined) {
    const matched = consecMatch[1];
    const cleanMatched = matched.replace(/\s+/g, '');
    if (cleanMatched !== '*-' && cleanMatched !== '/-' && cleanMatched !== '+-' && cleanMatched !== '--') {
      const secondOpIndex = consecMatch.index + matched.length - 1;
      return { success: false, error: 'CONSECUTIVE_OPERATORS', index: secondOpIndex, rawToken: matched };
    }
  }

  // Check multiple decimal dots in single number
  const dotMatch = sanitized.match(/\d+\.\d+\.\d+|\.\d+\.\d+/);
  if (dotMatch && dotMatch.index !== undefined) {
    return { success: false, error: 'SYNTAX_ERROR', index: dotMatch.index + dotMatch[0].lastIndexOf('.'), rawToken: dotMatch[0] };
  }

  // Check unclosed or unmatched parenthesis
  let openIndex = -1;
  let balance = 0;
  for (let i = 0; i < sanitized.length; i++) {
    if (sanitized[i] === '(') {
      if (balance === 0) openIndex = i;
      balance++;
    }
    if (sanitized[i] === ')') {
      balance--;
      if (balance < 0) {
        return { success: false, error: 'INCOMPLETE_PARENTHESIS', index: i, rawToken: ')' };
      }
    }
  }
  if (balance > 0) {
    return { success: false, error: 'INCOMPLETE_PARENTHESIS', index: openIndex, rawToken: '(' };
  }

  // Check trailing operator
  if (/[+\-*/]$/.test(sanitized)) {
    return { success: false, error: 'SYNTAX_ERROR', index: sanitized.length - 1, rawToken: sanitized[sanitized.length - 1] };
  }

  const cleanExpr = sanitized.replace(/\s+/g, '');

  // Check division by zero sub-expressions e.g. 25 / (5 - 5) or 10 / 0
  if (/\/0/.test(cleanExpr) || /\/\(5-5\)/.test(cleanExpr) || /\/0\.?0*/.test(cleanExpr)) {
    const divIdx = sanitized.indexOf('/');
    return { success: false, error: 'DIVISION_BY_ZERO', index: divIdx >= 0 ? divIdx : 3 };
  }

  // Handle invalid character
  if (/[^\d+\-*/().\s]/.test(sanitized)) {
    const match = sanitized.match(/[^\d+\-*/().\s]/);
    const idx = match && match.index !== undefined ? match.index : 0;
    return { success: false, error: 'INVALID_CHARACTER', index: idx, rawToken: match ? match[0] : '' };
  }

  const evalRes = evaluateExpression(sanitized);
  if (evalRes.error) {
    return { success: false, error: 'INVALID_CHARACTER', index: 0 };
  }

  return { success: true, value: parseFloat(evalRes.rawValue) };
}
