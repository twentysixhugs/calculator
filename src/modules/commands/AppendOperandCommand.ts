import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class AppendOperandCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private arg: number,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const valueToAppend = this.arg.toString();

    const operandAtPosition = this.calculator
      .getOperand(this.operandPosition)
      ?.toString();

    if (!operandAtPosition) {
      this.calculator.setOperand(this.operandPosition, +valueToAppend);
    } else {
      this.calculator.setOperand(
        this.operandPosition,
        parseFloat(operandAtPosition + valueToAppend)
      );
      console.log(operandAtPosition + valueToAppend);
    }
  }
}
