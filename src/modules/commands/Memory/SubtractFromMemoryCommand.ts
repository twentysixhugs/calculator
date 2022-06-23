import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class SubtractFromMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator, private operand: number) {}

  execute() {
    return this.calculator.subtractFromMemory(this.operand);
  }
}
