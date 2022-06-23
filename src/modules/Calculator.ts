/* Receiver */

import { Operator } from "./constants";
import { ICalculator } from "./interfaces/Calculator.interface";

import { IExpression } from "./interfaces/Expression.interface";
import { Expression } from "./Expression";

class Calculator implements ICalculator {
  private _memory = 0;

  constructor(private _expression: IExpression) {}

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

  factorial(operand: number) {
    return 1;
  }

  addToMemory(operand: number): void {
    this._memory += operand;
  }

  subtractFromMemory(operand: number): void {
    this._memory -= operand;
  }

  recallFromMemory() {
    return this._memory;
  }

  clearMemory(): void {
    this._memory = 0;
  }
}

export const calculator = new Calculator(new Expression());
