import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class RootCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operand: number,
    private ofPower: number
  ) {}

  execute() {
    return this.calculator.root(this.operand, this.ofPower);
  }
}
