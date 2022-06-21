import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { OperatorCharacters } from "../constants";

export class GetStringifiedExpressionCommand implements ICommand {
  public result?: string;

  constructor(private calculator: ICalculator) {}

  execute() {
    const expression = this.calculator.getExpression();

    this.result = `${expression.left ?? ""}${
      expression.operator ? OperatorCharacters[expression.operator] : ""
    }${expression.right ?? ""}`;
  }
}
