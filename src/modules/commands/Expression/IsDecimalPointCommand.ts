import { ICalculator } from "../../interfaces/Calculator.interface";

export class IsDecimalPointCommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    return this.calculator.decimalPointState[this.operandPosition];
  }
}
