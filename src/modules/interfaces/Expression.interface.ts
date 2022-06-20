import { Operator } from "../constants";

export interface IExpression {
  left: number;
  right: null | number;
  operator: null | Operator;
  current: "left" | "right";
}
