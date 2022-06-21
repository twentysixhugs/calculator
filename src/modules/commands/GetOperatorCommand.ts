import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { Operator } from "../constants";

export class GetOperatorCommand implements ICommand {
  public result?: Operator | null;

  constructor(private calculator: ICalculator) {}

  execute() {
    this.result = this.calculator.getOperator();
  }
}
