import Decimal from 'decimal.js';

export type UnitCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'time'
  | 'speed'
  | 'digital'
  | 'energy'
  | 'power'
  | 'pressure'
  | 'angle'
  | 'frequency'
  | 'force'
  | 'torque'
  | 'density'
  | 'flow'
  | 'fuel';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  aliases: string[];
  toBase: (val: number) => number;
  fromBase: (baseVal: number) => number;
  code?: string;
}

export type UnitInfo = UnitDefinition;

export interface CategoryDefinition {
  id: UnitCategory;
  name: string;
  description: string;
  baseUnitId: string;
  units: UnitDefinition[];
}

export function roundToPrecision(val: number, precision: number = 6): number {
  const p = Math.pow(10, precision);
  return Math.round((val + Number.EPSILON) * p) / p;
}

// 18 Comprehensive Unit Categories Definition Registry
export const UNIT_CATEGORIES: Record<UnitCategory, CategoryDefinition> = {
  length: {
    id: 'length',
    name: 'Panjang',
    description: 'mm, cm, m, km, in, ft, yd, mi',
    baseUnitId: 'm',
    units: [
      { id: 'mm', code: 'mm', name: 'Milimeter', symbol: 'mm', aliases: ['mm', 'milimeter', 'millimeter'], toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'cm', code: 'cm', name: 'Sentimeter', symbol: 'cm', aliases: ['cm', 'sentimeter', 'centimeter'], toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'm', code: 'm', name: 'Meter', symbol: 'm', aliases: ['m', 'meter'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', code: 'km', name: 'Kilometer', symbol: 'km', aliases: ['km', 'kilometer'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'in', code: 'in', name: 'Inci', symbol: 'in', aliases: ['in', 'inci', 'inch'], toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'ft', code: 'ft', name: 'Kaki (Feet)', symbol: 'ft', aliases: ['ft', 'kaki', 'feet', 'foot'], toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'yd', code: 'yd', name: 'Yard', symbol: 'yd', aliases: ['yd', 'yard'], toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'mi', code: 'mi', name: 'Mil (Mile)', symbol: 'mi', aliases: ['mi', 'mil', 'mile'], toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ],
  },

  weight: {
    id: 'weight',
    name: 'Berat & Massa',
    description: 'mg, g, kg, ton, oz, lb',
    baseUnitId: 'kg',
    units: [
      { id: 'mg', code: 'mg', name: 'Miligram', symbol: 'mg', aliases: ['mg', 'miligram'], toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'g', code: 'g', name: 'Gram', symbol: 'g', aliases: ['g', 'gram'], toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'kg', code: 'kg', name: 'Kilogram', symbol: 'kg', aliases: ['kg', 'kilogram', 'kilo'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'ton', code: 'ton', name: 'Ton (Metrik)', symbol: 'ton', aliases: ['ton', 'tonne'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'oz', code: 'oz', name: 'Ons (Ounce)', symbol: 'oz', aliases: ['oz', 'ons', 'ounce'], toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      { id: 'lb', code: 'lb', name: 'Pon (Pound)', symbol: 'lb', aliases: ['lb', 'pon', 'pound', 'pounds'], toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
    ],
  },

  temperature: {
    id: 'temperature',
    name: 'Suhu',
    description: '°C, °F, K, °R',
    baseUnitId: 'K',
    units: [
      {
        id: 'celsius',
        code: 'celsius',
        name: 'Celsius',
        symbol: '°C',
        aliases: ['c', 'celsius', 'celcius', 'selsius', '°c'],
        toBase: (v) => {
          if (v < -273.15) throw new Error('Nilai berada di bawah nol absolut (-273.15 °C).');
          return v + 273.15;
        },
        fromBase: (v) => v - 273.15,
      },
      {
        id: 'fahrenheit',
        code: 'fahrenheit',
        name: 'Fahrenheit',
        symbol: '°F',
        aliases: ['f', 'fahrenheit', '°f'],
        toBase: (v) => {
          if (v < -459.67) throw new Error('Nilai berada di bawah nol absolut (-459.67 °F).');
          return ((v - 32) * 5) / 9 + 273.15;
        },
        fromBase: (v) => ((v - 273.15) * 9) / 5 + 32,
      },
      {
        id: 'kelvin',
        code: 'kelvin',
        name: 'Kelvin',
        symbol: 'K',
        aliases: ['k', 'kelvin'],
        toBase: (v) => {
          if (v < 0) throw new Error('Nilai berada di bawah nol absolut (0 K).');
          return v;
        },
        fromBase: (v) => v,
      },
      {
        id: 'rankine',
        code: 'rankine',
        name: 'Rankine',
        symbol: '°R',
        aliases: ['r', 'rankine'],
        toBase: (v) => {
          if (v < 0) throw new Error('Nilai berada di bawah nol absolut (0 °R).');
          return (v * 5) / 9;
        },
        fromBase: (v) => (v * 9) / 5,
      },
    ],
  },

  area: {
    id: 'area',
    name: 'Luas',
    description: 'm², km², ha, acre, sq ft',
    baseUnitId: 'sqm',
    units: [
      { id: 'sqmm', code: 'sqmm', name: 'Milimeter Persegi', symbol: 'mm²', aliases: ['mm2', 'sqmm', 'mm²'], toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'sqcm', code: 'sqcm', name: 'Sentimeter Persegi', symbol: 'cm²', aliases: ['cm2', 'sqcm', 'cm²'], toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      { id: 'sqm', code: 'sqm', name: 'Meter Persegi', symbol: 'm²', aliases: ['m2', 'sqm', 'm²'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'sqkm', code: 'sqkm', name: 'Kilometer Persegi', symbol: 'km²', aliases: ['km2', 'sqkm', 'km²'], toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'ha', code: 'ha', name: 'Hektare', symbol: 'ha', aliases: ['ha', 'hektare', 'hectare'], toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: 'acre', code: 'acre', name: 'Acre', symbol: 'acre', aliases: ['acre', 'eker'], toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      { id: 'sqft', code: 'sqft', name: 'Kaki Persegi', symbol: 'ft²', aliases: ['ft2', 'sqft', 'sq ft', 'ft²'], toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
    ],
  },

  volume: {
    id: 'volume',
    name: 'Volume',
    description: 'mL, L, m³, galon, pint',
    baseUnitId: 'l',
    units: [
      { id: 'ml', code: 'ml', name: 'Mililiter', symbol: 'mL', aliases: ['ml', 'mililiter'], toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'l', code: 'l', name: 'Liter', symbol: 'L', aliases: ['l', 'liter'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'cum', code: 'cum', name: 'Meter Kubik', symbol: 'm³', aliases: ['m3', 'cum', 'm³'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'gal', code: 'gal', name: 'Galon (US)', symbol: 'gal', aliases: ['gal', 'galon', 'gallon'], toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: 'pt', code: 'pt', name: 'Pint (US)', symbol: 'pt', aliases: ['pt', 'pint'], toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
    ],
  },

  time: {
    id: 'time',
    name: 'Waktu',
    description: 'ms, s, min, jam, hari, minggu, thn',
    baseUnitId: 's',
    units: [
      { id: 'ms', code: 'ms', name: 'Milidetik', symbol: 'ms', aliases: ['ms', 'milidetik'], toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 's', code: 's', name: 'Detik', symbol: 'detik', aliases: ['s', 'detik', 'second', 'sec'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'min', code: 'min', name: 'Menit', symbol: 'menit', aliases: ['min', 'menit', 'minute'], toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'hr', code: 'hr', name: 'Jam', symbol: 'jam', aliases: ['hr', 'jam', 'hour'], toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'day', code: 'day', name: 'Hari', symbol: 'hari', aliases: ['day', 'hari'], toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'week', code: 'week', name: 'Minggu', symbol: 'minggu', aliases: ['week', 'minggu'], toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'yr', code: 'yr', name: 'Tahun', symbol: 'tahun', aliases: ['yr', 'tahun', 'year'], toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    ],
  },

  speed: {
    id: 'speed',
    name: 'Kecepatan',
    description: 'm/s, km/h, mph, knot',
    baseUnitId: 'mps',
    units: [
      { id: 'mps', code: 'mps', name: 'Meter/Detik', symbol: 'm/s', aliases: ['mps', 'm/s'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kmh', code: 'kmh', name: 'Kilometer/Jam', symbol: 'km/h', aliases: ['kmh', 'km/h', 'km/jam'], toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', code: 'mph', name: 'Mil/Jam', symbol: 'mph', aliases: ['mph', 'mil/jam'], toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'knot', code: 'knot', name: 'Knot', symbol: 'kn', aliases: ['knot', 'knots'], toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },

  digital: {
    id: 'digital',
    name: 'Data Digital',
    description: 'bit, B, KB, MB, GB, TB, KiB, MiB',
    baseUnitId: 'byte',
    units: [
      { id: 'bit', code: 'bit', name: 'Bit', symbol: 'b', aliases: ['bit', 'b'], toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: 'byte', code: 'byte', name: 'Byte', symbol: 'B', aliases: ['byte', 'B'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kb', code: 'kb', name: 'Kilobyte (Desimal 1000)', symbol: 'KB', aliases: ['kb', 'kilobyte'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'kib', code: 'kib', name: 'Kibibyte (Biner 1024)', symbol: 'KiB', aliases: ['kib', 'kibibyte'], toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'mb', code: 'mb', name: 'Megabyte (Desimal)', symbol: 'MB', aliases: ['mb', 'megabyte'], toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'mib', code: 'mib', name: 'Mebibyte (Biner)', symbol: 'MiB', aliases: ['mib', 'mebibyte'], toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: 'gb', code: 'gb', name: 'Gigabyte (Desimal)', symbol: 'GB', aliases: ['gb', 'gigabyte'], toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
      { id: 'gib', code: 'gib', name: 'Gibibyte (Biner)', symbol: 'GiB', aliases: ['gib', 'gibibyte'], toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: 'tb', code: 'tb', name: 'Terabyte (Desimal)', symbol: 'TB', aliases: ['tb', 'terabyte'], toBase: (v) => v * 1000000000000, fromBase: (v) => v / 1000000000000 },
    ],
  },

  energy: {
    id: 'energy',
    name: 'Energi',
    description: 'J, kJ, cal, kcal, Wh, kWh',
    baseUnitId: 'j',
    units: [
      { id: 'j', code: 'j', name: 'Joule', symbol: 'J', aliases: ['j', 'joule'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kj', code: 'kj', name: 'Kilojoule', symbol: 'kJ', aliases: ['kj', 'kilojoule'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cal', code: 'cal', name: 'Kalori', symbol: 'cal', aliases: ['cal', 'kalori'], toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: 'kcal', code: 'kcal', name: 'Kilokalori', symbol: 'kcal', aliases: ['kcal', 'kilokalori'], toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: 'wh', code: 'wh', name: 'Watt-Jam', symbol: 'Wh', aliases: ['wh', 'watt-jam'], toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'kwh', code: 'kwh', name: 'Kilowatt-Jam', symbol: 'kWh', aliases: ['kwh', 'kilowatt-jam'], toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
    ],
  },

  power: {
    id: 'power',
    name: 'Daya',
    description: 'W, kW, HP',
    baseUnitId: 'w',
    units: [
      { id: 'w', code: 'w', name: 'Watt', symbol: 'W', aliases: ['w', 'watt'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kw', code: 'kw', name: 'Kilowatt', symbol: 'kW', aliases: ['kw', 'kilowatt'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'hp', code: 'hp', name: 'Tenaga Kuda (HP)', symbol: 'HP', aliases: ['hp', 'horsepower'], toBase: (v) => v * 745.699872, fromBase: (v) => v / 745.699872 },
    ],
  },

  pressure: {
    id: 'pressure',
    name: 'Tekanan',
    description: 'Pa, kPa, bar, atm, psi',
    baseUnitId: 'pa',
    units: [
      { id: 'pa', code: 'pa', name: 'Pascal', symbol: 'Pa', aliases: ['pa', 'pascal'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kpa', code: 'kpa', name: 'Kilopascal', symbol: 'kPa', aliases: ['kpa', 'kilopascal'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'bar', code: 'bar', name: 'Bar', symbol: 'bar', aliases: ['bar'], toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: 'atm', code: 'atm', name: 'Atmosfer', symbol: 'atm', aliases: ['atm', 'atmosfer'], toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: 'psi', code: 'psi', name: 'PSI', symbol: 'psi', aliases: ['psi'], toBase: (v) => v * 6894.75729, fromBase: (v) => v / 6894.75729 },
    ],
  },

  angle: {
    id: 'angle',
    name: 'Sudut',
    description: '° (Derajat), rad, grad',
    baseUnitId: 'rad',
    units: [
      { id: 'deg', code: 'deg', name: 'Derajat', symbol: '°', aliases: ['deg', 'derajat', 'degree'], toBase: (v) => (v * Math.PI) / 180, fromBase: (v) => (v * 180) / Math.PI },
      { id: 'rad', code: 'rad', name: 'Radian', symbol: 'rad', aliases: ['rad', 'radian'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'grad', code: 'grad', name: 'Gradian', symbol: 'grad', aliases: ['grad', 'gradian'], toBase: (v) => (v * Math.PI) / 200, fromBase: (v) => (v * 200) / Math.PI },
    ],
  },

  frequency: {
    id: 'frequency',
    name: 'Frekuensi',
    description: 'Hz, kHz, MHz, GHz',
    baseUnitId: 'hz',
    units: [
      { id: 'hz', code: 'hz', name: 'Hertz', symbol: 'Hz', aliases: ['hz', 'hertz'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'khz', code: 'khz', name: 'Kilohertz', symbol: 'kHz', aliases: ['khz', 'kilohertz'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mhz', code: 'mhz', name: 'Megahertz', symbol: 'MHz', aliases: ['mhz', 'megahertz'], toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'ghz', code: 'ghz', name: 'Gigahertz', symbol: 'GHz', aliases: ['ghz', 'gigahertz'], toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
    ],
  },

  force: {
    id: 'force',
    name: 'Gaya',
    description: 'N, kN, lbf',
    baseUnitId: 'n',
    units: [
      { id: 'n', code: 'n', name: 'Newton', symbol: 'N', aliases: ['n', 'newton'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'kn', code: 'kn', name: 'Kilonewton', symbol: 'kN', aliases: ['kn', 'kilonewton'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'lbf', code: 'lbf', name: 'Pound-Force', symbol: 'lbf', aliases: ['lbf', 'pound-force'], toBase: (v) => v * 4.448222, fromBase: (v) => v / 4.448222 },
    ],
  },

  torque: {
    id: 'torque',
    name: 'Torsi',
    description: 'N·m, lbf·ft',
    baseUnitId: 'nm',
    units: [
      { id: 'nm', code: 'nm', name: 'Newton-Meter', symbol: 'N·m', aliases: ['nm', 'newton-meter'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'lbfft', code: 'lbfft', name: 'Pound-Foot', symbol: 'lbf·ft', aliases: ['lbfft', 'pound-foot'], toBase: (v) => v * 1.355818, fromBase: (v) => v / 1.355818 },
    ],
  },

  density: {
    id: 'density',
    name: 'Kepadatan',
    description: 'kg/m³, g/cm³',
    baseUnitId: 'kgm3',
    units: [
      { id: 'kgm3', code: 'kgm3', name: 'Kilogram/Meter Kubik', symbol: 'kg/m³', aliases: ['kgm3', 'kg/m3'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'gcm3', code: 'gcm3', name: 'Gram/Sentimeter Kubik', symbol: 'g/cm³', aliases: ['gcm3', 'g/cm3'], toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },

  flow: {
    id: 'flow',
    name: 'Debit Aliran',
    description: 'L/s, L/min, m³/h',
    baseUnitId: 'lps',
    units: [
      { id: 'lps', code: 'lps', name: 'Liter/Detik', symbol: 'L/s', aliases: ['lps', 'l/s'], toBase: (v) => v, fromBase: (v) => v },
      { id: 'lpm', code: 'lpm', name: 'Liter/Menit', symbol: 'L/min', aliases: ['lpm', 'l/min'], toBase: (v) => v / 60, fromBase: (v) => v * 60 },
      { id: 'cmh', code: 'cmh', name: 'Meter Kubik/Jam', symbol: 'm³/h', aliases: ['cmh', 'm3/h'], toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    ],
  },

  fuel: {
    id: 'fuel',
    name: 'Konsumsi Bahan Bakar',
    description: 'km/L, L/100km, mpg',
    baseUnitId: 'kml',
    units: [
      {
        id: 'kml',
        code: 'kml',
        name: 'Kilometer/Liter',
        symbol: 'km/L',
        aliases: ['kml', 'km/l'],
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        id: 'l100km',
        code: 'l100km',
        name: 'Liter/100 Kilometer',
        symbol: 'L/100km',
        aliases: ['l100km', 'l/100km'],
        toBase: (v) => {
          if (v === 0) return 0;
          return 100 / v;
        },
        fromBase: (v) => {
          if (v === 0) return 0;
          return 100 / v;
        },
      },
      {
        id: 'mpg',
        code: 'mpg',
        name: 'Mil/Galon (US MPG)',
        symbol: 'mpg',
        aliases: ['mpg'],
        toBase: (v) => v * 0.425143707,
        fromBase: (v) => v / 0.425143707,
      },
    ],
  },
};

/**
 * Perform unit conversion between fromUnit and toUnit
 */
export function convertUnit(
  catId: UnitCategory,
  val: number,
  fromUnitId: string,
  toUnitId: string,
  precision?: number
): number {
  const cat = UNIT_CATEGORIES[catId];
  if (!cat) throw new Error(`Kategori '${catId}' tidak ditemukan.`);

  const fromLower = fromUnitId.trim().toLowerCase();
  const toLower = toUnitId.trim().toLowerCase();

  const fromObj = cat.units.find(
    (u) =>
      u.id.toLowerCase() === fromLower ||
      (u.code && u.code.toLowerCase() === fromLower) ||
      u.symbol.toLowerCase() === fromLower ||
      u.aliases.some((a) => a.toLowerCase() === fromLower)
  );

  const toObj = cat.units.find(
    (u) =>
      u.id.toLowerCase() === toLower ||
      (u.code && u.code.toLowerCase() === toLower) ||
      u.symbol.toLowerCase() === toLower ||
      u.aliases.some((a) => a.toLowerCase() === toLower)
  );

  if (!fromObj || !toObj) {
    throw new Error('Satuan tidak cocok atau tidak ditemukan dalam kategori.');
  }

  const baseVal = fromObj.toBase(val);
  const rawResult = toObj.fromBase(baseVal);

  if (precision !== undefined) {
    return roundToPrecision(rawResult, precision);
  }

  return Number(new Decimal(rawResult).toFixed(8));
}

/**
 * Search units across all categories by keyword query
 */
export function searchUnits(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches: { category: CategoryDefinition; unit: UnitDefinition }[] = [];

  Object.values(UNIT_CATEGORIES).forEach((cat) => {
    cat.units.forEach((unit) => {
      const matchName = unit.name.toLowerCase().includes(q);
      const matchSymbol = unit.symbol.toLowerCase().includes(q);
      const matchAlias = unit.aliases.some((a) => a.toLowerCase().includes(q));
      const matchCat = cat.name.toLowerCase().includes(q);

      if (matchName || matchSymbol || matchAlias || matchCat) {
        matches.push({ category: cat, unit });
      }
    });
  });

  return matches;
}

/**
 * Convert 1 input value to all units in the specified category simultaneously ("Lihat Semua Hasil")
 */
export function convertAllUnitsInCategory(
  catId: UnitCategory,
  val: number,
  fromUnitId: string
) {
  const cat = UNIT_CATEGORIES[catId];
  if (!cat) return [];

  const fromLower = fromUnitId.trim().toLowerCase();
  const fromObj = cat.units.find(
    (u) =>
      u.id.toLowerCase() === fromLower ||
      (u.code && u.code.toLowerCase() === fromLower) ||
      u.symbol.toLowerCase() === fromLower ||
      u.aliases.some((a) => a.toLowerCase() === fromLower)
  );
  if (!fromObj) return [];

  const baseVal = fromObj.toBase(val);

  return cat.units.map((u) => {
    const result = u.fromBase(baseVal);
    const formatted = new Decimal(result).isInteger()
      ? new Decimal(result).toString()
      : new Decimal(result).toFixed(6).replace(/0+$/, '').replace(/\.$/, '');

    return {
      unitId: u.id,
      name: u.name,
      symbol: u.symbol,
      value: result,
      formattedValue: formatted,
    };
  });
}
