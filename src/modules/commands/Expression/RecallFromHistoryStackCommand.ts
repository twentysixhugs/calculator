import { ICalculator } from "../../interfaces/Calculator.interface";

export class RecallFromHistoryStackCommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const prevExpression = this.calculator.getPreviousExpression();

    if (!prevExpression) return false;

    const { left, right, operator } = prevExpression;

    this.calculator.setOperand("left", left);
    this.calculator.setOperand("right", right);
    this.calculator.setOperator(operator);

    return true;
  }
}
