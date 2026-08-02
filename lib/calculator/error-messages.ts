import { MathErrorType, ParseError } from './math-parser';
import { Language } from '../i18n/translations';

export interface FormattedError {
  error: MathErrorType;
  title: string;
  message: string;
  hint: string;
  index: number;
  rawToken?: string;
}

export function getErrorMessage(
  errorType: MathErrorType,
  options?: { index?: number; rawToken?: string; language?: Language }
): FormattedError {
  const index = options?.index ?? 0;
  const rawToken = options?.rawToken;
  const lang = options?.language ?? 'en';

  if (lang === 'en') {
    switch (errorType) {
      case 'EMPTY_INPUT':
        return {
          error: errorType,
          title: 'Empty Input',
          message: 'Please enter numbers or a mathematical expression.',
          hint: 'Example: 12 + 5 or sin(45)',
          index,
        };

      case 'NUMBER_TOO_LONG':
        return {
          error: errorType,
          title: 'Number Too Long',
          message: 'Maximum recommended number length is 15 digits.',
          hint: 'Use concise numbers to preserve calculation precision.',
          index,
        };

      case 'CONSECUTIVE_OPERATORS':
        return {
          error: errorType,
          title: 'Consecutive Operators',
          message: 'Two adjacent operators found.',
          hint: "Delete one operator (e.g. change '5 ++ 3' to '5 + 3').",
          index,
        };

      case 'INCOMPLETE_PARENTHESIS':
        return {
          error: errorType,
          title: 'Unbalanced Parentheses',
          message: "Number of opening '(' and closing ')' parentheses do not match.",
          hint: "Ensure every opening '(' has a matching closing ')'.",
          index,
        };

      case 'DIVISION_BY_ZERO':
        return {
          error: errorType,
          title: 'Division by Zero',
          message: 'Division by zero is undefined in mathematics.',
          hint: 'Replace the denominator with a non-zero value.',
          index,
        };

      case 'INVALID_CHARACTER':
        return {
          error: errorType,
          title: 'Unrecognized Character',
          message: `Character '${rawToken || ''}' cannot be evaluated.`,
          hint: 'Use digits (0-9), operators (+, -, ×, ÷), or scientific functions.',
          index,
          rawToken,
        };

      case 'SYNTAX_ERROR':
      default:
        return {
          error: errorType,
          title: 'Syntax Error',
          message: 'Please check your formula arrangement, operators, or parentheses.',
          hint: 'Example of valid arrangement: (7 × 4) ÷ 7',
          index,
        };
    }
  }

  // Indonesian fallback
  switch (errorType) {
    case 'EMPTY_INPUT':
      return {
        error: errorType,
        title: 'Masukan Kosong',
        message: 'Ketik angka atau rumus matematika terlebih dahulu.',
        hint: 'Contoh: 12 + 5 atau sin(45)',
        index,
      };

    case 'NUMBER_TOO_LONG':
      return {
        error: errorType,
        title: 'Angka Terlalu Panjang',
        message: 'Panjang angka disarankan maksimal 15 digit.',
        hint: 'Gunakan angka yang lebih ringkas agar hasil tetap presisi.',
        index,
      };

    case 'CONSECUTIVE_OPERATORS':
      return {
        error: errorType,
        title: 'Simbol Berurutan',
        message: 'Terdapat dua operator yang berdampingan secara tidak sah.',
        hint: "Hapus salah satu simbol (contoh: ubah '5 ++ 3' menjadi '5 + 3').",
        index,
      };

    case 'INCOMPLETE_PARENTHESIS':
      return {
        error: errorType,
        title: 'Tanda Kurung Belum Pas',
        message: 'Jumlah tanda kurung buka `(` dan tutup `)` belum seimbang.',
        hint: "Pastikan setiap tanda buka '(' memiliki pasangan tanda tutup ')'.",
        index,
      };

    case 'DIVISION_BY_ZERO':
      return {
        error: errorType,
        title: 'Pembagian dengan Nol',
        message: 'Pembagian dengan angka 0 tidak terdefinisi dalam matematika.',
        hint: 'Pembagian dengan nol tidak didefinisikan. Ganti angka penyebut dengan nilai selain nol.',
        index,
      };

    case 'INVALID_CHARACTER':
      return {
        error: errorType,
        title: 'Karakter Tidak Dikenali',
        message: `Karakter '${rawToken || ''}' tidak dapat dihitung.`,
        hint: 'Gunakan angka (0-9), operator (+, -, ×, ÷), atau fungsi ilmiah.',
        index,
        rawToken,
      };

    case 'SYNTAX_ERROR':
    default:
      return {
        error: errorType,
        title: 'Format Rumus Belum Sesuai',
        message: 'Periksa kembali susunan angka, simbol, atau tanda kurung.',
        hint: 'Contoh susunan yang benar: (7 × 4) ÷ 7',
        index,
      };
  }
}

export function getFormattedError(
  errorResult: ParseError,
  language: Language = 'en'
): FormattedError {
  return getErrorMessage(errorResult.error, {
    index: errorResult.index,
    rawToken: errorResult.rawToken,
    language,
  });
}
