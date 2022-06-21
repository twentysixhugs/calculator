import { Operator } from "../constants";

export interface ICalculator {
  operate(): boolean;

  setOperand(operandPosition: "left" | "right", value: number | null): boolean;

  getOperand(operandPosition: "left" | "right"): number | null;

  setOperator(operator: Operator | null): boolean;

  reciprocal(): void;

  percentage(): void;

  root(ofPower: number): void;

  power(exponent: number): void;

  addCurrentValueToMemory(): void;

  subtractCurrentValueFromMemory(): void;

  recallFromMemory(): void;

  clearMemory(): void;
}
