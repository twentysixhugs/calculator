import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class MultiplyCommand implements ICommand {
  constructor(private calculator: ICalculator, private arg: number) {
    this.calculator = calculator;
    this.arg = arg;
  }

  execute() {
    this.calculator.multiply(this.arg);
  }
}
