/* Receiver */

import { Operator } from "./constants";
import { ICalculator } from "./interfaces/Calculator.interface";

import { IExpression } from "./interfaces/Expression.interface";

export class Calculator implements ICalculator {
  private _memory = 0;

  constructor(private _expression: IExpression) {}

  operate(): boolean {
    /* If there is a full expression like 2 + 3 */
    /* Returns true if success, false otherwise */
    const { left, right, operator } = this._expression;

    if (left !== null && right !== null && operator) {
      switch (operator) {
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

  reciprocal(operand: number) {
    return 1 / operand;
  }

  percentage(operand: number) {
    return operand / 100;
  }

  root(operand: number, ofPower: number) {
    return 1;
  }

  power(operand: number, exponent: number) {
    return 1;
  }

  addToMemory(operand: number): void {
    return;
  }

  subtractFromMemory(operand: number): void {
    return;
  }

  recallFromMemory() {
    return 1;
  }

  clearMemory(): void {
    return;
  }
}
