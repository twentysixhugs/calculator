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
import { add } from "./math/add";
import { subtract } from "./math/subtract";
import { multiply } from "./math/multiply";
import { divide } from "./math/divide";
import { reciprocal } from "./math/reciprocal";
import { percentage } from "./math/percentage";
import { power } from "./math/power";
import { factorial } from "./math/factorial";
import { root } from "./math/root";

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
    return add(a, b);
  }

  subtract(a: number, b: number) {
    return subtract(a, b);
  }

  multiply(a: number, b: number) {
    return multiply(a, b);
  }

  divide(a: number, b: number) {
    return divide(a, b);
  }

  reciprocal(operand: number) {
    return reciprocal(operand);
  }

  percentage(operand: number) {
    return percentage(operand);
  }

  root(operand: number, ofPower: number) {
    return root(operand, ofPower);
  }

  power(operand: number, exponent: number) {
    return power(operand, exponent);
  }

  factorial(operand: number) {
    return factorial(operand);
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
