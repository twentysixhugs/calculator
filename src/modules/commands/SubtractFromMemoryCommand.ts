import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class SubtractFromMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator) {
    this.calculator = calculator;
  }

  execute() {
    return this.calculator.subtractCurrentValueFromMemory();
  }
}
