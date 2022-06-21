import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class ClearMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator) {
    this.calculator = calculator;
  }

  execute() {
    this.calculator.clearMemory();
  }
}
