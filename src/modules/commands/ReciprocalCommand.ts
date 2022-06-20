import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class ReciprocalCommand implements ICommand {
  constructor(private calculator: ICalculator) {
    this.calculator = calculator;
  }

  execute() {
    this.calculator.reciprocal();
  }
}
