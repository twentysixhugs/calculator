import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { CalculationError } from "../../constants";

export class CubicRootCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operand = this.calculator.getOperand(this.operandPosition);

    if (operand === null) return false;

    if (operand < 0) {
      throw new Error(CalculationError.RootOfNegativeNumber);
    }

    const result = this.calculator.root(operand, 3);
    this.calculator.setOperand(
      this.operandPosition,
      parseFloat(result.toFixed(5))
    );

    return result;
  }
}
