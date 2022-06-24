import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class PowerCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const left = this.calculator.getOperand("left");
    const right = this.calculator.getOperand("right");

    if (left === null || right === null) {
      return null;
    }

    const result = this.calculator.power(left, right);

    this.calculator.resetDecimalZeros();

    return result;
  }
}
