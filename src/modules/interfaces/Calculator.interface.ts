import { Operator } from "../constants";

export interface ICalculator {
  operate(): boolean;

  getCurrentOperand(): number | null;

  setCurrentOperand(value: number | null): void;

  getCurrentOperandPosition(): "left" | "right";

  setCurrentOperandPosition(position: "left" | "right"): void;

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
