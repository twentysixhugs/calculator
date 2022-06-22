import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class PowerOfTwoCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operand = this.calculator.getOperand(this.operandPosition);
    if (!operand) return false;

    const result = this.calculator.power(operand, 2);
    this.calculator.setOperand(this.operandPosition, result);

    return true;
  }
}
