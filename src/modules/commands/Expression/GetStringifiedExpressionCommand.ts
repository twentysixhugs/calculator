import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { OperatorCharacters } from "../../constants";

export class GetStringifiedExpressionCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    // Returns a stringified version of the current expression
    const { left, operator, right } = this.calculator.getExpression();

    return `${left ?? ""}${operator ? OperatorCharacters[operator] : ""}${
      right ?? ""
    }`;
  }
}