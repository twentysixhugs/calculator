import { ICalculator } from "../../interfaces/Calculator.interface";
import { ICommand } from "../../interfaces/Command.interface";

export class ShouldChangeNextOperatorSignCommand implements ICommand {
  constructor(private calculator: ICalculator, private changeTo?: boolean) {}

  execute() {
    if (typeof this.changeTo === "boolean") {
      this.calculator.shouldChangeNextOperatorSign = this.changeTo;
      return;
    }

    return this.calculator.shouldChangeNextOperatorSign;
  }
}
