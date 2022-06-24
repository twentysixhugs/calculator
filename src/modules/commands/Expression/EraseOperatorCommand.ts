import { ICalculator } from "../../interfaces/Calculator.interface";
import { ICommand } from "../../interfaces/Command.interface";

export class EraseOperatorCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    if (this.calculator.getOperator()) {
      this.calculator.setOperator(null);
    }
  }
}
