import { ICalculator } from "../../interfaces/Calculator.interface";
import { ICommand } from "../../interfaces/Command.interface";

export class SetDecimalZerosCommand implements ICommand {
  constructor(private calculator: ICalculator, private value: number) {}

  execute() {
    return this.calculator.setDecimalZeros(this.value);
  }
}
