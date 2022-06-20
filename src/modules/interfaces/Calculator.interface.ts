export interface ICalculator {
  getCurrentValue(): number;

  setCurrentValue(newValue: number): void;

  add(arg: number): void;

  subtract(arg: number): void;

  multiply(arg: number): void;

  divide(arg: number): void;

  reciprocal(): void;

  percentage(): void;

  root(ofPower: number): void;

  power(exponent: number): void;

  addCurrentValueToMemory(): void;

  subtractCurrentValueFromMemory(): void;

  recallFromMemory(): void;

  clearMemory(): void;
}
