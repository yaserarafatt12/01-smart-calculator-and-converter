import Decimal from 'decimal.js';
import { AngleMode, Token, CalculationResult } from './types';
export { evaluateMathExpressionLegacy as evaluateMathExpression } from './math-parser-legacy';

export type MathErrorType =
  | 'EMPTY_INPUT'
  | 'NUMBER_TOO_LONG'
  | 'CONSECUTIVE_OPERATORS'
  | 'INCOMPLETE_PARENTHESIS'
  | 'DIVISION_BY_ZERO'
  | 'INVALID_CHARACTER'
  | 'SYNTAX_ERROR';

export interface ParseError {
  success: false;
  error: MathErrorType;
  index: number;
  rawToken?: string;
  message?: string;
}

// Set high precision decimal configuration
Decimal.set({ precision: 32, rounding: Decimal.ROUND_HALF_UP });

// Helper: Calculate Factorial safely
function factorial(n: number): Decimal {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Faktorial hanya mendukung bilangan bulat nol atau positif.');
  }
  if (n > 170) {
    throw new Error('Hasil faktorial terlalu besar untuk ditampilkan.');
  }
  let res = new Decimal(1);
  for (let i = 2; i <= n; i++) {
    res = res.times(i);
  }
  return res;
}

/**
 * TOKENIZER
 * Converts string expression into structured tokens with implicit multiplication.
 */
export function tokenize(expression: string, ansValue: string = '0'): Token[] {
  const sanitized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/\s+/g, '');

  if (!sanitized) return [];

  const rawTokens: Token[] = [];
  let i = 0;

  while (i < sanitized.length) {
    const char = sanitized[i];

    // Numbers (digits and decimal point)
    if (/[\d.]/.test(char)) {
      let numStr = '';
      while (i < sanitized.length && /[\d.]/.test(sanitized[i])) {
        numStr += sanitized[i];
        i++;
      }
      // Validate decimal count
      if ((numStr.match(/\./g) || []).length > 1) {
        throw new Error(`Angka desimal tidak valid pada '${numStr}'`);
      }
      rawTokens.push({ type: 'number', value: numStr, position: i - numStr.length });
      continue;
    }

    // Identifiers (functions, constants, Ans)
    if (/[a-zA-Z]/.test(char)) {
      let ident = '';
      while (i < sanitized.length && /[a-zA-Z]/.test(sanitized[i])) {
        ident += sanitized[i];
        i++;
      }
      const lower = ident.toLowerCase();

      if (lower === 'pi') {
        rawTokens.push({ type: 'constant', value: 'pi', position: i - ident.length });
      } else if (lower === 'e') {
        rawTokens.push({ type: 'constant', value: 'e', position: i - ident.length });
      } else if (lower === 'ans') {
        rawTokens.push({ type: 'number', value: ansValue, position: i - ident.length });
      } else if (
        ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'abs', 'sqrt', 'cbrt', 'round', 'floor', 'ceil'].includes(lower)
      ) {
        rawTokens.push({ type: 'function', value: lower, position: i - ident.length });
      } else {
        throw new Error(`Fungsi atau nama '${ident}' tidak dikenal.`);
      }
      continue;
    }

    // Square root symbol √
    if (char === '√') {
      rawTokens.push({ type: 'function', value: 'sqrt', position: i });
      i++;
      continue;
    }

    // Factorial !
    if (char === '!') {
      rawTokens.push({ type: 'factorial', value: '!', position: i });
      i++;
      continue;
    }

    // Percentage %
    if (char === '%') {
      rawTokens.push({ type: 'percentage', value: '%', position: i });
      i++;
      continue;
    }

    // Operators and Parentheses
    if (['+', '-', '*', '/', '^'].includes(char)) {
      rawTokens.push({ type: 'operator', value: char, position: i });
      i++;
      continue;
    }

    if (char === '(') {
      rawTokens.push({ type: 'left-parenthesis', value: '(', position: i });
      i++;
      continue;
    }

    if (char === ')') {
      rawTokens.push({ type: 'right-parenthesis', value: ')', position: i });
      i++;
      continue;
    }

    throw new Error(`Karakter tidak sah '${char}' pada posisi ${i + 1}`);
  }

  // Insert Implicit Multiplication (*)
  const tokens: Token[] = [];
  for (let idx = 0; idx < rawTokens.length; idx++) {
    const curr = rawTokens[idx];
    tokens.push(curr);

    if (idx < rawTokens.length - 1) {
      const next = rawTokens[idx + 1];

      const currIsOperand =
        curr.type === 'number' ||
        curr.type === 'constant' ||
        curr.type === 'right-parenthesis' ||
        curr.type === 'factorial' ||
        curr.type === 'percentage';

      const nextIsStartOperand =
        next.type === 'number' ||
        next.type === 'constant' ||
        next.type === 'function' ||
        next.type === 'left-parenthesis';

      if (currIsOperand && nextIsStartOperand) {
        tokens.push({ type: 'operator', value: '*' });
      }
    }
  }

  return tokens;
}

/**
 * PARSER & EVALUATOR (Shunting-Yard + AST Evaluator)
 */
export function evaluateExpression(
  expression: string,
  angleMode: AngleMode = 'degree',
  ansValue: string = '0'
): CalculationResult {
  const sanitized = expression.trim();
  if (!sanitized) {
    return {
      rawValue: '0',
      formattedValue: '0',
      isApproximate: false,
      error: null,
    };
  }

  try {
    const tokens = tokenize(sanitized, ansValue);
    if (tokens.length === 0) {
      return { rawValue: '0', formattedValue: '0', error: null };
    }

    // Check parenthesis balance
    let openCount = 0;
    for (const t of tokens) {
      if (t.type === 'left-parenthesis') openCount++;
      if (t.type === 'right-parenthesis') openCount--;
      if (openCount < 0) {
        throw new Error('Periksa kembali tanda kurung.');
      }
    }
    if (openCount !== 0) {
      throw new Error('Periksa kembali tanda kurung.');
    }

    // Operator Precedence
    const precedence: Record<string, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 2,
      '^': 3,
    };

    const outputQueue: Token[] = [];
    const operatorStack: Token[] = [];

    for (let idx = 0; idx < tokens.length; idx++) {
      const token = tokens[idx];

      if (token.type === 'number' || token.type === 'constant') {
        outputQueue.push(token);
      } else if (token.type === 'function') {
        operatorStack.push(token);
      } else if (token.type === 'factorial' || token.type === 'percentage') {
        outputQueue.push(token);
      } else if (token.type === 'operator') {
        const prev = idx > 0 ? tokens[idx - 1] : null;
        const isUnary =
          token.value === '-' &&
          (!prev ||
            prev.type === 'operator' ||
            prev.type === 'left-parenthesis');

        if (isUnary) {
          outputQueue.push({ type: 'number', value: '-1' });
          operatorStack.push({ type: 'operator', value: '*' });
        } else {
          while (
            operatorStack.length > 0 &&
            operatorStack[operatorStack.length - 1].type === 'operator' &&
            precedence[operatorStack[operatorStack.length - 1].value] >= precedence[token.value]
          ) {
            outputQueue.push(operatorStack.pop()!);
          }
          operatorStack.push(token);
        }
      } else if (token.type === 'left-parenthesis') {
        operatorStack.push(token);
      } else if (token.type === 'right-parenthesis') {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1].type !== 'left-parenthesis'
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        if (operatorStack.length === 0) {
          throw new Error('Periksa kembali tanda kurung.');
        }
        operatorStack.pop();

        if (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1].type === 'function'
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
      }
    }

    while (operatorStack.length > 0) {
      const top = operatorStack.pop()!;
      if (top.type === 'left-parenthesis' || top.type === 'right-parenthesis') {
        throw new Error('Periksa kembali tanda kurung.');
      }
      outputQueue.push(top);
    }

    const evalStack: Decimal[] = [];
    let isApproximate = false;

    for (let i = 0; i < outputQueue.length; i++) {
      const token = outputQueue[i];

      if (token.type === 'number') {
        evalStack.push(new Decimal(token.value));
      } else if (token.type === 'constant') {
        if (token.value === 'pi') {
          evalStack.push(new Decimal('3.1415926535897932384626433832795'));
        } else if (token.value === 'e') {
          evalStack.push(new Decimal('2.7182818284590452353602874713527'));
        }
        isApproximate = true;
      } else if (token.type === 'factorial') {
        if (evalStack.length < 1) throw new Error('Ekspresi belum selesai.');
        const val = evalStack.pop()!;
        evalStack.push(factorial(val.toNumber()));
      } else if (token.type === 'percentage') {
        if (evalStack.length < 1) throw new Error('Ekspresi belum selesai.');
        const val = evalStack.pop()!;
        evalStack.push(val.div(100));
      } else if (token.type === 'function') {
        if (evalStack.length < 1) throw new Error('Ekspresi belum selesai.');
        const val = evalStack.pop()!;
        const fn = token.value;

        let res: Decimal;
        const numVal = val.toNumber();

        if (fn === 'sqrt') {
          if (val.isNegative()) {
            throw new Error('Tidak tersedia dalam mode bilangan nyata.');
          }
          res = val.sqrt();
        } else if (fn === 'cbrt') {
          res = new Decimal(Math.cbrt(numVal));
          isApproximate = true;
        } else if (fn === 'log') {
          if (val.lte(0)) {
            throw new Error('Logaritma membutuhkan nilai lebih besar dari nol.');
          }
          res = new Decimal(Math.log10(numVal));
          isApproximate = true;
        } else if (fn === 'ln') {
          if (val.lte(0)) {
            throw new Error('Logaritma membutuhkan nilai lebih besar dari nol.');
          }
          res = new Decimal(Math.log(numVal));
          isApproximate = true;
        } else if (fn === 'abs') {
          res = val.abs();
        } else if (fn === 'round') {
          res = val.round();
        } else if (fn === 'floor') {
          res = val.floor();
        } else if (fn === 'ceil') {
          res = val.ceil();
        } else {
          let radVal = numVal;
          if (angleMode === 'degree' && ['sin', 'cos', 'tan'].includes(fn)) {
            radVal = (numVal * Math.PI) / 180;
          }

          if (fn === 'sin') {
            res = new Decimal(Math.sin(radVal));
          } else if (fn === 'cos') {
            res = new Decimal(Math.cos(radVal));
          } else if (fn === 'tan') {
            if (Math.abs(Math.cos(radVal)) < 1e-15) {
              throw new Error('Hasil tan tidak terdefinisi.');
            }
            res = new Decimal(Math.tan(radVal));
          } else if (fn === 'asin') {
            if (numVal < -1 || numVal > 1) {
              throw new Error('Nilai asin/acos harus berada di rentang -1 hingga 1.');
            }
            let radRes = Math.asin(numVal);
            if (angleMode === 'degree') radRes = (radRes * 180) / Math.PI;
            res = new Decimal(radRes);
          } else if (fn === 'acos') {
            if (numVal < -1 || numVal > 1) {
              throw new Error('Nilai asin/acos harus berada di rentang -1 hingga 1.');
            }
            let radRes = Math.acos(numVal);
            if (angleMode === 'degree') radRes = (radRes * 180) / Math.PI;
            res = new Decimal(radRes);
          } else if (fn === 'atan') {
            let radRes = Math.atan(numVal);
            if (angleMode === 'degree') radRes = (radRes * 180) / Math.PI;
            res = new Decimal(radRes);
          } else {
            throw new Error(`Fungsi '${fn}' belum didukung.`);
          }
          isApproximate = true;
        }

        evalStack.push(res);
      } else if (token.type === 'operator') {
        if (evalStack.length < 2) throw new Error('Ekspresi belum selesai.');
        const right = evalStack.pop()!;
        const left = evalStack.pop()!;
        const op = token.value;

        let res: Decimal;

        if (op === '+') {
          res = left.plus(right);
        } else if (op === '-') {
          res = left.minus(right);
        } else if (op === '*') {
          res = left.times(right);
        } else if (op === '/') {
          if (right.isZero()) {
            throw new Error('Tidak dapat membagi dengan nol.');
          }
          res = left.div(right);
        } else if (op === '%') {
          if (right.isZero()) {
            throw new Error('Tidak dapat membagi dengan nol.');
          }
          res = left.mod(right);
        } else if (op === '^') {
          res = left.pow(right);
        } else {
          throw new Error(`Operator '${op}' tidak dikenal.`);
        }

        evalStack.push(res);
      }
    }

    if (evalStack.length !== 1) {
      throw new Error('Ekspresi belum selesai.');
    }

    const finalVal = evalStack[0];
    let rawStr = finalVal.toString();

    if (isApproximate) {
      const numFloat = finalVal.toNumber();
      const roundedFixed = Number(numFloat.toFixed(12));
      if (Math.abs(numFloat - roundedFixed) < 1e-11) {
        rawStr = String(roundedFixed);
      }
    }

    const parsedDec = new Decimal(rawStr);
    const formattedStr = parsedDec.isInteger()
      ? parsedDec.toString()
      : parsedDec.toFixed(10).replace(/0+$/, '').replace(/\.$/, '');

    const scientificStr = parsedDec.toExponential(6);

    return {
      rawValue: rawStr,
      formattedValue: formattedStr,
      scientificNotation: scientificStr,
      isApproximate,
      error: null,
    };
  } catch (err: any) {
    return {
      rawValue: '0',
      formattedValue: '0',
      error: err.message || 'Error Sintaks',
    };
  }
}
