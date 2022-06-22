import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class PercentageCommand implements ICommand {
  constructor(private calculator: ICalculator, private operand: number) {}

  execute() {
    return this.calculator.percentage(this.operand);
  }
}
