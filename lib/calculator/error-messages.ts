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
        message: 'Ekspresi matematika tidak boleh kosong.',
        hint: 'Masukkan angka dan operator matematika terlebih dahulu (contoh: 12 + 5).',
        index,
      };

    case 'NUMBER_TOO_LONG':
      return {
        error: errorType,
        title: 'Angka Terlalu Panjang',
        message: 'Angka yang dimasukkan melebihi batas maksimum 15 digit.',
        hint: 'Gunakan angka yang lebih pendek untuk menjaga akurasi perhitungan.',
        index,
      };

    case 'CONSECUTIVE_OPERATORS':
      return {
        error: errorType,
        title: 'Operator Berurutan',
        message: `Ditemukan operator berurutan yang tidak valid pada indeks ${index}.`,
        hint: "Hapus salah satu operator yang berdampingan (contoh: ubah '5 ++ 3' menjadi '5 + 3').",
        index,
      };

    case 'INCOMPLETE_PARENTHESIS':
      return {
        error: errorType,
        title: 'Tanda Kurung Tidak Lengkap',
        message: `Tanda kurung tidak seimbang atau belum ditutup pada indeks ${index}.`,
        hint: "Pastikan setiap tanda kurung buka '(' memiliki pasangan tanda kurung tutup ')'.",
        index,
      };

    case 'DIVISION_BY_ZERO':
      return {
        error: errorType,
        title: 'Pembagian dengan Nol',
        message: `Operasi pembagian dengan nol ditemukan pada indeks ${index}.`,
        hint: 'Pembagian dengan angka 0 tidak didefinisikan dalam matematika. Ubah penyebut menjadi angka selain 0.',
        index,
      };

    case 'INVALID_CHARACTER':
      return {
        error: errorType,
        title: 'Karakter Tidak Valid',
        message: `Karakter '${rawToken || ''}' pada indeks ${index} tidak dikenali.`,
        hint: 'Gunakan hanya angka (0-9), titik desimal (.), operator (+, -, *, /), dan tanda kurung ().',
        index,
        rawToken,
      };

    case 'SYNTAX_ERROR':
    default:
      return {
        error: errorType,
        title: 'Sintaks Tidak Valid',
        message: `Format ekspresi matematika tidak sesuai pada indeks ${index}.`,
        hint: 'Periksa kembali urutan angka, operator, dan penempatan tanda kurung dalam ekspresi Anda.',
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
