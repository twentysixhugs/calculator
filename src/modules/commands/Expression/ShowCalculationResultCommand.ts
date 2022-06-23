import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class ShowCalculationResultCommand implements ICommand {
  constructor(private calculator: ICalculator, private result: number) {}

  execute() {
    this.calculator.setOperand("left", this.result);
    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);
  }
}
