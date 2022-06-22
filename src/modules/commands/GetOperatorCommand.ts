import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { Operator } from "../constants";

export class GetOperatorCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    return this.calculator.getOperator();
  }
}
