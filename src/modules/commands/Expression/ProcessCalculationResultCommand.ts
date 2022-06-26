import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { InterpretAsCommand } from "./InterpretAsCommand";
import { CalculationError } from "../../constants";

export class ProcessCalculationResultCommand implements ICommand {
  constructor(private calculator: ICalculator, private result: number) {}

  execute() {
    console.log(this.result);

    let fixedResult = this.result.toFixed(5);

    if (
      fixedResult.toString().includes(".") &&
      fixedResult.toString().replace(".", "").length > 8
    ) {
      fixedResult = this.result.toFixed(1);
    }

    if (
      (!fixedResult.toString().includes(".") &&
        fixedResult.toString().length > 8) ||
      (fixedResult.toString().includes(".") &&
        fixedResult.toString().length > 10)
    ) {
      throw new Error(CalculationError.OutOfRange);
    }

    this.calculator.setOperand("left", parseFloat(fixedResult));
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
