/* Receiver */

import { Operator } from "./constants";
import {
  ICalculator,
  IDecimalPointState,
} from "./interfaces/Calculator.interface";

import { IExpression } from "./interfaces/Expression.interface";
import { Expression } from "./Expression";

import { CommandConstructor } from "./interfaces/Command.interface";
import { HistoryStack } from "./HistoryStack";
import { IHistoryStack } from "./interfaces/HistoryStack.interface";

class Calculator implements ICalculator {
  private _shouldChangeNextOperatorSign = false;
  private _CurrentCommand: CommandConstructor | null = null;

  get CurrentCommand() {
    return this._CurrentCommand;
  }

  set CurrentCommand(value: CommandConstructor | null) {
    this._CurrentCommand = value;
  }

  get shouldChangeNextOperatorSign() {
    return this._shouldChangeNextOperatorSign;
  }

  set shouldChangeNextOperatorSign(value: boolean) {
    this._shouldChangeNextOperatorSign = value;
  }

  private _decimalPointState: IDecimalPointState = {
    left: false,
    right: false,
  };

  private _decimalZerosCount = 0;

  get decimalPointState(): IDecimalPointState {
    return { ...this._decimalPointState };
  }

  setDecimalPointState(value: boolean, position: "left" | "right") {
    this._decimalPointState = {
      ...this._decimalPointState,
      [position]: value,
    };

    console.log(this._decimalPointState);
  }

  incrementDecimalZeros() {
    this._decimalZerosCount++;
  }

  decrementDecimalZeros() {
    if (!this._decimalZerosCount) return;

    this._decimalZerosCount--;
  }

  getDecimalZeros() {
    return this._decimalZerosCount;
  }

  resetDecimalZeros() {
    this._decimalZerosCount = 0;
  }

  setDecimalZeros(value: number): void {
    this._decimalZerosCount = value;
  }

  private _memory = 0;

  constructor(
    private _expression: IExpression,
    private _historyStack: IHistoryStack<IExpression>
  ) {}

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
    console.log("add");
  }

  subtractFromMemory(operand: number): void {
    this._memory -= operand;
    console.log("subtract");
  }

  recallFromMemory() {
    return this._memory;
  }

  clearMemory(): void {
    this._memory = 0;
  }

  getPreviousExpression(): IExpression | undefined {
    return this._historyStack.pop();
  }

  pushExpressionToHistoryStack() {
    this._historyStack.push({ ...this._expression });
  }
}

export const calculator = new Calculator(
  new Expression(),
  new HistoryStack<IExpression>(10)
);
