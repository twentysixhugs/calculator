import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class SubtractCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const left = this.calculator.getOperand("left");
    const right = this.calculator.getOperand("right");

    if (left === null || right === null) {
      return false;
    }

    const result = this.calculator.subtract(left, right);

    this.calculator.setOperand("left", result);
    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);

    return true;
  }
}
