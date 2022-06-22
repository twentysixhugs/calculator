/* Receiver */

import { Operator } from "./constants";
import { Expression } from "./Expression";
import { ICalculator } from "./interfaces/Calculator.interface";

import { IExpression } from "./interfaces/Expression.interface";

export class Calculator implements ICalculator {
  private _memory = 0;

  constructor(private _expression: IExpression) {}

  operate(): boolean {
    /* If there is a full expression like 2 + 3 */
    /* Returns true if success, false otherwise */
    if (
      this._expression.left !== null &&
      this._expression.right !== null &&
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

      return true;
    }

    return false;
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

  getOperator(): Operator | null {
    return this._expression.operator;
  }

  getExpression(): IExpression {
    return this._expression;
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
    return 1;
  }

  percentage() {
    // this._currentValue = this._currentValue / 100;
    return 1;
  }

  // TODO: Write math implementation

  root(ofPower: number) {
    // this._currentValue = this._currentValue;
    return 1;
  }

  power(exponent: number) {
    // this._currentValue = this._currentValue;
    return 1;
  }

  addCurrentValueToMemory() {
    // this._memory += this._currentValue;
    return;
  }

  subtractCurrentValueFromMemory() {
    // this._memory -= this._currentValue;
    return;
  }

  recallFromMemory() {
    // this._currentValue = this._memory;
    return 1;
  }

  clearMemory() {
    // this._memory = 0;
    return;
  }
}
