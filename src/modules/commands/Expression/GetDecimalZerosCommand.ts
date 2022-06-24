import { ICalculator } from "../../interfaces/Calculator.interface";
import { ICommand } from "../../interfaces/Command.interface";

export class GetDecimalZerosCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    return this.calculator.getDecimalZeros();
  }
}
