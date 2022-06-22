import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { OperatorCharacters } from "../constants";

export class GetStringifiedExpressionCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    const expression = this.calculator.getExpression();

    return `${expression.left ?? ""}${
      expression.operator ? OperatorCharacters[expression.operator] : ""
    }${expression.right ?? ""}`;
  }
}
