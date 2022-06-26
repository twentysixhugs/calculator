import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { InterpretAsCommand } from "./InterpretAsCommand";

export class ProcessCalculationResultCommand implements ICommand {
  constructor(private calculator: ICalculator, private result: number) {}

  execute() {
    this.calculator.setOperand("left", parseFloat(this.result.toFixed(5)));
    this.calculator.setOperator(null);
    this.calculator.setOperand("right", null);

    if (!this.result.toString().includes(".")) {
      // if result is a whole number
      new InterpretAsCommand(this.calculator, "left", "whole").execute();
    } else {
      new InterpretAsCommand(this.calculator, "left", "decimal").execute();
    }

    new InterpretAsCommand(this.calculator, "right", "whole").execute();
  }
}
