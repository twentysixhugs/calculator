import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { CalculationError } from "../../constants";

export class DivideCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const left = this.calculator.getOperand("left");
    const right = this.calculator.getOperand("right");

    if (left === null || right === null) {
      return null;
    }

    if (right === 0) {
      throw new Error(CalculationError.DivisionByZero);
    }

    const result = this.calculator.divide(left, right);

    this.calculator.resetDecimalZeros();

    return result;
  }
}
