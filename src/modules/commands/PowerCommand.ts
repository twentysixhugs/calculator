import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class PowerCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operand: number,
    private exponent: number
  ) {}

  execute() {
    return this.calculator.power(this.operand, this.exponent);
  }
}
