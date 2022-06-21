import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class OperateCommand implements ICommand {
  public result?: boolean;

  constructor(private calculator: ICalculator) {
    this.calculator = calculator;
  }

  execute() {
    this.result = this.calculator.operate();
  }
}
