export interface HistoryItem {
  id: string;
  expression: string;
  result: string | number;
  timestamp: number;
}

const STORAGE_KEY = 'smart_calculator_history';

let memoryFallback: HistoryItem[] = [];

function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function getHistory(): HistoryItem[] {
  if (isLocalStorageAvailable()) {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Gagal membaca riwayat dari localStorage:', e);
      return [];
    }
  }
  return [...memoryFallback];
}

export function addHistory(expression: string, result: string | number): HistoryItem[] {
  const newItem: HistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    expression,
    result,
    timestamp: Date.now(),
  };

  const currentHistory = getHistory();
  // Store all history without artificially restricting count
  const updatedHistory = [newItem, ...currentHistory];

  if (isLocalStorageAvailable()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Gagal menyimpan riwayat ke localStorage:', e);
    }
  } else {
    memoryFallback = updatedHistory;
  }

  return updatedHistory;
}

export function removeHistoryItem(id: string): HistoryItem[] {
  const currentHistory = getHistory();
  const updatedHistory = currentHistory.filter((item) => item.id !== id);

  if (isLocalStorageAvailable()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Gagal memperbarui riwayat di localStorage:', e);
    }
  } else {
    memoryFallback = updatedHistory;
  }

  return updatedHistory;
}

export function clearHistory(): void {
  if (isLocalStorageAvailable()) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Gagal menghapus riwayat dari localStorage:', e);
    }
  }
  memoryFallback = [];
}
