import { Operator } from "../constants";
import { IExpression } from "./Expression.interface";
import { CommandConstructor } from "./Command.interface";

export interface IDecimalPointState {
  left: boolean;
  right: boolean;
}

export interface ICalculator {
  shouldChangeNextOperatorSign: boolean;
  CurrentCommand: CommandConstructor | null;
  decimalPointState: IDecimalPointState;

  setOperand(operandPosition: "left" | "right", value: number | null): boolean;

  getOperand(operandPosition: "left" | "right"): number | null;

  getOperator(): Operator | null;

  setOperator(operator: Operator | null): boolean;

  getExpression(): IExpression;

  setDecimalPointState(
    value: boolean,
    position: keyof IDecimalPointState
  ): void;

  getDecimalZeros(): number;

  decrementDecimalZeros(): void;

  incrementDecimalZeros(): void;

  resetDecimalZeros(): void;

  setDecimalZeros(value: number): void;

  add(a: number, b: number): number;

  subtract(a: number, b: number): number;

  divide(a: number, b: number): number;

  multiply(a: number, b: number): number;

  reciprocal(operand: number): number;

  percentage(operand: number): number;

  root(operand: number, ofPower: number): number;

  power(operand: number, exponent: number): number;

  factorial(operand: number): number;

  addToMemory(operand: number): void;

  subtractFromMemory(operand: number): void;

  recallFromMemory(): number;

  clearMemory(): void;
}
