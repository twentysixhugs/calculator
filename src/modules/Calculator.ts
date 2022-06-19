/* Receiver */

class Calculator {
  private _memory = 0;

  add(a: number, b: number) {
    return a + b;
  }

  subtract(a: number, b: number) {
    return a - b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  divide(a: number, b: number) {
    return a / b;
  }

  reciprocal(a: number) {
    return 1 / a;
  }

  percentage(a: number) {
    return a / 100;
  }

  // TODO: Write math implementation

  root(a: number, power: number) {
    return a;
  }

  power(base: number, exponent: number) {
    return base + exponent;
  }

  // TODO: Write memory

  addToMemory(a: number) {
    this._memory += a;
  }

  subtractFromMemory(a: number) {
    this._memory -= a;
  }

  recallFromMemory() {
    return this._memory;
  }

  clearMemory() {
    this._memory = 0;
  }
}
