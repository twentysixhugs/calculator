import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class ProcessCalculationResultCommand implements ICommand {
  constructor(private calculator: ICalculator, private result: number) {}

  execute() {
    this.calculator.setOperand("left", parseFloat(this.result.toFixed(5)));
    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);

    if (!this.result.toString().includes(".")) {
      // if result is a whole number
      this.calculator.setDecimalPointState(false, "left");
    }

    this.calculator.setDecimalPointState(false, "right");
  }
}
