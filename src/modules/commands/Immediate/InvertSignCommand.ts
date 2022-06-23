import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class InvertSignCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operand = this.calculator.getOperand(this.operandPosition);

    if (!operand) return false;

    this.calculator.setOperand(this.operandPosition, -operand);
    return true;
  }
}
