import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class ChangeOperandSignCommand implements ICommand {
  public result?: boolean;
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operandValue = this.calculator.getOperand(this.operandPosition);
    if (!operandValue) {
      this.result = false;
      return;
    }

    this.calculator.setOperand(this.operandPosition, -operandValue);
    this.result = true;
  }
}
