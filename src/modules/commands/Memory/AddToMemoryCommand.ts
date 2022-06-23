import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class AddToMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator, private operand: number) {}

  execute() {
    this.calculator.addToMemory(this.operand);
  }
}
