import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class ChangeOperandSignCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operandValue = this.calculator.getOperand(this.operandPosition);

    if (!operandValue) {
      return false;
    }

    this.calculator.setOperand(this.operandPosition, -operandValue);
    return true;
  }
}
