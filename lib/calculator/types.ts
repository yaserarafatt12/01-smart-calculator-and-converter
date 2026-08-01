export type ApplicationMode = 'default' | 'complete';
export type AngleMode = 'degree' | 'radian';

export type TokenType =
  | 'number'
  | 'operator'
  | 'function'
  | 'constant'
  | 'left-parenthesis'
  | 'right-parenthesis'
  | 'factorial'
  | 'percentage';

export interface Token {
  type: TokenType;
  value: string;
  position?: number;
}

export interface CalculationResult {
  rawValue: string;
  formattedValue: string;
  scientificNotation?: string;
  isApproximate?: boolean;
  error?: string | null;
  errorIndex?: number | null;
}

export interface MemoryState {
  value: number;
  hasValue: boolean;
}

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  angleMode: AngleMode;
  createdAt: string;
  isFavorite: boolean;
}
