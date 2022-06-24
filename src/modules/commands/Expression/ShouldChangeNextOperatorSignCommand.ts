import { ICalculator } from "../../interfaces/Calculator.interface";

export class ShouldChangeNextOperatorSignCommand {
  constructor(private calculator: ICalculator, private changeTo?: boolean) {}

  execute() {
    if (typeof this.changeTo === "boolean") {
      this.calculator.shouldChangeNextOperatorSign = this.changeTo;
      return;
    }

    return this.calculator.shouldChangeNextOperatorSign;
  }
}
