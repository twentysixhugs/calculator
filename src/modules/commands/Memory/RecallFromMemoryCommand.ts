import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class RecallFromMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    this.calculator.setOperand("left", this.calculator.recallFromMemory());

    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);
  }
}
