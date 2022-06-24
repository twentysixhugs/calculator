import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class TenToThePowerCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operand = this.calculator.getOperand(this.operandPosition);
    if (operand === null) return false;

    const result = this.calculator.power(10, operand);
    this.calculator.setOperand(
      this.operandPosition,
      parseFloat(result.toFixed(5))
    );

    return true;
  }
}
