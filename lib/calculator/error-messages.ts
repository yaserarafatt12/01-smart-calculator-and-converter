import { MathErrorType, ParseError } from './math-parser';

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
  options?: { index?: number; rawToken?: string }
): FormattedError {
  const index = options?.index ?? 0;
  const rawToken = options?.rawToken;

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
        hint: "Contoh susunan yang benar: (7 × 4) ÷ 7",
        index,
      };
  }
}

export function getFormattedError(errorResult: ParseError): FormattedError {
  return getErrorMessage(errorResult.error, {
    index: errorResult.index,
    rawToken: errorResult.rawToken,
  });
}
