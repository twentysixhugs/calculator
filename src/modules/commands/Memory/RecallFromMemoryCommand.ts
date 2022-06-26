import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class RecallFromMemoryCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const valueFromMemory = this.calculator.recallFromMemory();
    this.calculator.setOperand("left", valueFromMemory);

    if (valueFromMemory.toString().includes(".")) {
      this.calculator.setDecimalPointState(true, "left");
    } else {
      this.calculator.setDecimalPointState(false, "left");
    }

    // Reset decimal point and expression state
    this.calculator.setDecimalPointState(false, "right");
    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);
  }
}
