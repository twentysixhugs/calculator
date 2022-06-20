import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class RecallFromMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator) {
    this.calculator = calculator;
  }

  execute() {
    this.calculator.recallFromMemory();
  }
}
