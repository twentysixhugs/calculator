import { ICalculator } from "../../interfaces/Calculator.interface";

export class PushExpressionToHistoryStackCommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    this.calculator.pushExpressionToHistoryStack();
  }
}
