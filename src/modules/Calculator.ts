/* Receiver */

import { Operator } from "./constants";
import { ICalculator } from "./interfaces/Calculator.interface";

import { IExpression } from "./interfaces/Expression.interface";

export default class Calculator implements ICalculator {
  private _memory = 0;

  constructor(private _expression: IExpression) {}

  operate(): boolean {
    /* If there is a full expression like 2 + 3 */
    /* Returns true if success, false otherwise */
    if (
      this._expression.left &&
      this._expression.right &&
      this._expression.operator
    ) {
      const left = this._expression.left;
      const right = this._expression.right;

      switch (this._expression.operator) {
        case Operator.Add: {
          this.setOperand("left", this._add(left, right));
          break;
        }

        case Operator.Subtract: {
          this.setOperand("left", this._subtract(left, right));
          break;
        }

        case Operator.Multiply: {
          this.setOperand("left", this._multiply(left, right));
          break;
        }

        case Operator.Divide: {
          this.setOperand("left", this._divide(left, right));
          break;
        }
      }

      this.setOperator(null);
      this.setOperand("right", null);
      this.setCurrentOperandPosition("left");

      return true;
    }

    return false;
  }

  getCurrentOperand(): number | null {
    return this.getOperand(this.getCurrentOperandPosition());
  }

  setCurrentOperand(value: number | null) {
    this.setOperand(this.getCurrentOperandPosition(), value);
  }

  getCurrentOperandPosition(): "left" | "right" {
    return this._expression.current;
  }

  setCurrentOperandPosition(position: "left" | "right") {
    this._expression.current = position;
  }

  getOperand(operandPosition: "left" | "right") {
    return this._expression[operandPosition];
  }

  setOperand(operandPosition: "left" | "right", value: number | null) {
    if (operandPosition === "left" && value !== null) {
      this._expression.left = value;
      return true;
    }
    if (operandPosition === "right") {
      this._expression.right = value;
      return true;
    }

    return false;
  }

  setOperator(operator: Operator | null) {
    this._expression.operator = operator;

    if (!this._expression.operator || operator === null) {
      this._expression.operator = operator;

      return true;
    }

    return false;
  }

  private _add(a: number, b: number) {
    return a + b;
  }

  private _subtract(a: number, b: number) {
    return a - b;
  }

  private _multiply(a: number, b: number) {
    return a * b;
  }

  private _divide(a: number, b: number) {
    return a / b;
  }

  reciprocal() {
    // this._currentValue = 1 / this._currentValue;
  }

  percentage() {
    // this._currentValue = this._currentValue / 100;
  }

  // TODO: Write math implementation

  root(ofPower: number) {
    // this._currentValue = this._currentValue;
  }

  power(exponent: number) {
    // this._currentValue = this._currentValue;
  }

  addCurrentValueToMemory() {
    // this._memory += this._currentValue;
  }

  subtractCurrentValueFromMemory() {
    // this._memory -= this._currentValue;
  }

  recallFromMemory() {
    // this._currentValue = this._memory;
  }

  clearMemory() {
    // this._memory = 0;
  }
}
