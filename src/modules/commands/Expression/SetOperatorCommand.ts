import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { Operator } from "../../constants";

export class SetOperatorCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operator: Operator | null
  ) {}

  execute() {
    return this.calculator.setOperator(this.operator);
  }
}
