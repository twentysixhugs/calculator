/* Receiver */

export default class Calculator {
  private _memory = 0;
  private _currentValue = 0;

  getCurrentValue() {
    return this._currentValue;
  }

  setCurrentValue(newValue: number) {
    // for keyboard input
    this._currentValue = newValue;
  }

  add(arg: number) {
    this._currentValue += arg;
  }

  subtract(arg: number) {
    this._currentValue -= arg;
  }

  multiply(arg: number) {
    this._currentValue *= arg;
  }

  divide(arg: number) {
    this._currentValue /= arg;
  }

  reciprocal() {
    this._currentValue = 1 / this._currentValue;
  }

  percentage() {
    this._currentValue = this._currentValue / 100;
  }

  // TODO: Write math implementation

  root(ofPower: number) {
    this._currentValue = this._currentValue;
  }

  power(exponent: number) {
    this._currentValue = this._currentValue;
  }

  addCurrentValueToMemory() {
    this._memory += this._currentValue;
  }

  subtractCurrentValueFromMemory() {
    this._memory -= this._currentValue;
  }

  recallFromMemory() {
    this._currentValue = this._memory;
  }

  clearMemory() {
    this._memory = 0;
  }
}
