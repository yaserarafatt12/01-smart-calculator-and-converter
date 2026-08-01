import { describe, it, expect } from 'vitest';
import { convertUnit, convertAllUnitsInCategory, searchUnits } from '../../lib/converter/unit-conversion';

describe('Advanced Unit Converter Engine (18 Categories)', () => {
  it('converts 1 kilogram to pound ≈ 2.2046226218', () => {
    const res = convertUnit('weight', 1, 'kg', 'lb');
    expect(res).toBeCloseTo(2.2046226218, 5);
  });

  it('converts temperature: 0 °C to °F = 32 and 100 °C to K = 373.15', () => {
    const degF = convertUnit('temperature', 0, 'celsius', 'fahrenheit');
    expect(degF).toBe(32);

    const kelvin = convertUnit('temperature', 100, 'celsius', 'kelvin');
    expect(kelvin).toBe(373.15);
  });

  it('rejects temperatures below absolute zero (-300 °C)', () => {
    expect(() => convertUnit('temperature', -300, 'celsius', 'kelvin')).toThrow(
      'Nilai berada di bawah nol absolut'
    );
  });

  it('converts length: 1 kilometer to meter = 1000', () => {
    const res = convertUnit('length', 1, 'km', 'm');
    expect(res).toBe(1000);
  });

  it('converts area: 1 meter persegi to sentimeter persegi = 10000', () => {
    const res = convertUnit('area', 1, 'sqm', 'sqcm');
    expect(res).toBe(10000);
  });

  it('converts volume: 1 liter to meter kubik = 0.001', () => {
    const res = convertUnit('volume', 1, 'l', 'cum');
    expect(res).toBe(0.001);
  });

  it('converts digital data: 1 byte to bit = 8 and 1 KiB (binary) = 1024 B', () => {
    const bitRes = convertUnit('digital', 1, 'byte', 'bit');
    expect(bitRes).toBe(8);

    const kibRes = convertUnit('digital', 1, 'kib', 'byte');
    expect(kibRes).toBe(1024);
  });

  it('converts non-linear fuel consumption: 10 km/L = 10 L/100km', () => {
    const res = convertUnit('fuel', 10, 'kml', 'l100km');
    expect(res).toBe(10);
  });

  it('supports "Lihat Semua Hasil" batch conversion', () => {
    const all = convertAllUnitsInCategory('length', 1, 'km');
    expect(all.length).toBeGreaterThanOrEqual(7);

    const meterItem = all.find((i) => i.unitId === 'm');
    expect(meterItem?.value).toBe(1000);
  });

  it('supports unit keyword searching (e.g. "pon", "megabyte")', () => {
    const searchPon = searchUnits('pon');
    expect(searchPon.some((s) => s.unit.id === 'lb')).toBe(true);

    const searchMB = searchUnits('megabyte');
    expect(searchMB.some((s) => s.unit.id === 'mb')).toBe(true);
  });
});
