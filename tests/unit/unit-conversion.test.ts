import { describe, it, expect } from 'vitest';
import { convertUnit, roundToPrecision, UNIT_CATEGORIES } from '../../lib/converter/unit-conversion';

describe('unit-conversion module', () => {
  describe('Length Conversions', () => {
    it('should convert meters to kilometers', () => {
      expect(convertUnit('length', 1500, 'm', 'km')).toBe(1.5);
    });

    it('should convert kilometers to meters', () => {
      expect(convertUnit('length', 2.5, 'km', 'm')).toBe(2500);
    });

    it('should convert centimeters to millimeters', () => {
      expect(convertUnit('length', 10, 'cm', 'mm')).toBe(100);
    });

    it('should convert inches to centimeters', () => {
      // 1 inch = 2.54 cm
      expect(convertUnit('length', 10, 'inch', 'cm')).toBe(25.4);
    });

    it('should convert feet to meters', () => {
      // 1 ft = 0.3048 m
      expect(convertUnit('length', 100, 'ft', 'm')).toBe(30.48);
    });

    it('should convert miles to kilometers', () => {
      // 1 mile = 1.609344 km
      expect(convertUnit('length', 1, 'mile', 'km', 4)).toBe(1.6093);
    });
  });

  describe('Weight Conversions', () => {
    it('should convert kilograms to grams', () => {
      expect(convertUnit('weight', 2, 'kg', 'g')).toBe(2000);
    });

    it('should convert grams to milligrams', () => {
      expect(convertUnit('weight', 0.5, 'g', 'mg')).toBe(500);
    });

    it('should convert pounds to kilograms', () => {
      // 1 lb = 0.45359237 kg
      expect(convertUnit('weight', 10, 'lb', 'kg', 4)).toBe(4.5359);
    });

    it('should convert ounces to grams', () => {
      // 1 oz = 28.349523 g
      expect(convertUnit('weight', 1, 'oz', 'g', 2)).toBe(28.35);
    });
  });

  describe('Temperature Conversions', () => {
    it('should convert Celsius to Fahrenheit', () => {
      expect(convertUnit('temperature', 0, 'Celsius', 'Fahrenheit')).toBe(32);
      expect(convertUnit('temperature', 100, 'Celsius', 'Fahrenheit')).toBe(212);
    });

    it('should convert Fahrenheit to Celsius', () => {
      expect(convertUnit('temperature', 32, 'Fahrenheit', 'Celsius')).toBe(0);
      expect(convertUnit('temperature', 212, 'Fahrenheit', 'Celsius')).toBe(100);
    });

    it('should convert Celsius to Kelvin', () => {
      expect(convertUnit('temperature', 0, 'Celsius', 'Kelvin')).toBe(273.15);
      expect(convertUnit('temperature', 25, 'Celsius', 'Kelvin')).toBe(298.15);
    });

    it('should convert Kelvin to Celsius', () => {
      expect(convertUnit('temperature', 273.15, 'Kelvin', 'Celsius')).toBe(0);
    });

    it('should handle negative temperature equal point (-40 C = -40 F)', () => {
      expect(convertUnit('temperature', -40, 'Celsius', 'Fahrenheit')).toBe(-40);
    });
  });

  describe('Time Conversions', () => {
    it('should convert seconds to minutes', () => {
      expect(convertUnit('time', 120, 'detik', 'menit')).toBe(2);
    });

    it('should convert minutes to hours', () => {
      expect(convertUnit('time', 90, 'menit', 'jam')).toBe(1.5);
    });

    it('should convert hours to days', () => {
      expect(convertUnit('time', 36, 'jam', 'hari')).toBe(1.5);
    });

    it('should convert days to seconds', () => {
      expect(convertUnit('time', 1, 'hari', 'detik')).toBe(86400);
    });
  });

  describe('Area Conversions', () => {
    it('should convert m² to cm²', () => {
      expect(convertUnit('area', 1, 'm²', 'cm²')).toBe(10000);
    });

    it('should convert km² to m²', () => {
      expect(convertUnit('area', 1, 'km²', 'm²')).toBe(1000000);
    });

    it('should convert hectares to m²', () => {
      expect(convertUnit('area', 2.5, 'hectare', 'm²')).toBe(25000);
    });

    it('should convert acres to m²', () => {
      // 1 acre ≈ 4046.856422 m²
      expect(convertUnit('area', 1, 'acre', 'm²', 2)).toBe(4046.86);
    });

    it('should convert sq ft to m²', () => {
      expect(convertUnit('area', 100, 'sq ft', 'm²', 4)).toBe(9.2903);
    });
  });

  describe('Edge Cases and Validation', () => {
    it('should return same value when converting to same unit', () => {
      expect(convertUnit('length', 42, 'm', 'm')).toBe(42);
      expect(convertUnit('temperature', 36.6, 'Celsius', 'Celsius')).toBe(36.6);
    });

    it('should handle zero value across units', () => {
      expect(convertUnit('weight', 0, 'kg', 'g')).toBe(0);
      expect(convertUnit('time', 0, 'detik', 'jam')).toBe(0);
    });

    it('should support unit aliases and uppercase/lowercase', () => {
      expect(convertUnit('length', 1000, 'METER', 'KM')).toBe(1);
      expect(convertUnit('time', 60, 'SEC', 'MIN')).toBe(1);
    });

    it('should throw error for unknown units', () => {
      expect(() => convertUnit('length', 10, 'm', 'unknown')).toThrow();
    });

    it('should test roundToPrecision helper', () => {
      expect(roundToPrecision(3.14159265, 2)).toBe(3.14);
      expect(roundToPrecision(3.14159265, 4)).toBe(3.1416);
    });
  });
});
