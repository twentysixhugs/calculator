import { Operator } from "../constants";
import { IExpression } from "./Expression.interface";

export interface ICalculator {
  operate(): boolean;

  setOperand(operandPosition: "left" | "right", value: number | null): boolean;

  getOperand(operandPosition: "left" | "right"): number | null;

  getOperator(): Operator | null;

  setOperator(operator: Operator | null): boolean;

  getExpression(): IExpression;

  reciprocal(): void;

  percentage(): void;

  root(ofPower: number): void;

  power(exponent: number): void;

  addCurrentValueToMemory(): void;

  subtractCurrentValueFromMemory(): void;

  recallFromMemory(): void;

  clearMemory(): void;
}
