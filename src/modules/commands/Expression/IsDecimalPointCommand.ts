import { ICalculator } from "../../interfaces/Calculator.interface";
import { ICommand } from "../../interfaces/Command.interface";

export class IsDecimalPointCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    return this.calculator.decimalPointState[this.operandPosition];
  }
}
