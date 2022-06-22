import { Operator } from "../constants";
import { IExpression } from "./Expression.interface";

export interface ICalculator {
  operate(): boolean;

  setOperand(operandPosition: "left" | "right", value: number | null): boolean;

  getOperand(operandPosition: "left" | "right"): number | null;

  getOperator(): Operator | null;

  setOperator(operator: Operator | null): boolean;

  getExpression(): IExpression;

  reciprocal(): number;

  percentage(): number;

  root(ofPower: number): number;

  power(exponent: number): number;

  addToMemory(operand: number): void;

  subtractFromMemory(operand: number): void;

  recallFromMemory(): number;

  clearMemory(): void;
}
