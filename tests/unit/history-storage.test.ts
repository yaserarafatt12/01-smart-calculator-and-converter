import { describe, it, expect, beforeEach } from 'vitest';
import {
  getHistory,
  addHistory,
  removeHistoryItem,
  clearHistory,
} from '../../lib/storage/history-storage';

describe('history-storage module', () => {
  beforeEach(() => {
    clearHistory();
  });

  it('should start with empty history', () => {
    expect(getHistory()).toEqual([]);
  });

  it('should add history items without artificial capping', () => {
    for (let i = 1; i <= 25; i++) {
      addHistory(`1 + ${i}`, i + 1);
    }
    const history = getHistory();
    expect(history.length).toBe(25);
    // Newest item should be at index 0
    expect(history[0].expression).toBe('1 + 25');
    expect(history[0].result).toBe(26);
  });

  it('should remove specific history item by id', () => {
    const history1 = addHistory('2 * 2', 4);
    const history2 = addHistory('3 * 3', 9);
    const itemToRemove = history1[history1.length - 1];

    const updated = removeHistoryItem(itemToRemove.id);
    expect(updated.length).toBe(1);
    expect(updated.find((item) => item.id === itemToRemove.id)).toBeUndefined();
  });

  it('should clear all history', () => {
    addHistory('10 / 2', 5);
    addHistory('5 + 5', 10);
    expect(getHistory().length).toBe(2);

    clearHistory();
    expect(getHistory()).toEqual([]);
  });
});
