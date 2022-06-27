import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { CalculationError } from "../../constants";

export class FactorialCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operand = this.calculator.getOperand(this.operandPosition);
    if (operand === null) return false;

    if (!Number.isInteger(operand)) {
      throw new Error(CalculationError.FactorialOfNumberWithDecimal);
    }

    const result = this.calculator.factorial(operand);
    this.calculator.setOperand(
      this.operandPosition,
      parseFloat(result.toFixed(5))
    );

    return result;
  }
}
