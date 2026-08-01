import { MemoryState } from './types';

const MEMORY_STORAGE_KEY = 'smart_calc_memory_value';
const ANS_STORAGE_KEY = 'smart_calc_ans_value';

export function getStoredMemory(): MemoryState {
  if (typeof window === 'undefined') return { value: 0, hasValue: false };
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    if (raw !== null) {
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        return { value: parsed, hasValue: true };
      }
    }
  } catch {
    // fallback
  }
  return { value: 0, hasValue: false };
}

export function saveMemory(val: number): MemoryState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(MEMORY_STORAGE_KEY, String(val));
    } catch {
      // fallback
    }
  }
  return { value: val, hasValue: true };
}

export function clearMemory(): MemoryState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(MEMORY_STORAGE_KEY);
    } catch {
      // fallback
    }
  }
  return { value: 0, hasValue: false };
}

export function getStoredAns(): string {
  if (typeof window === 'undefined') return '0';
  try {
    const raw = localStorage.getItem(ANS_STORAGE_KEY);
    return raw !== null ? raw : '0';
  } catch {
    return '0';
  }
}

export function saveAns(ans: string): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(ANS_STORAGE_KEY, ans);
    } catch {
      // fallback
    }
  }
}
