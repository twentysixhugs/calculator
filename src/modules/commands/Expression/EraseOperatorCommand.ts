import { ICalculator } from "../../interfaces/Calculator.interface";

export class EraseOperatorCommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    if (this.calculator.getOperator()) {
      this.calculator.setOperator(null);
    }
  }
}
