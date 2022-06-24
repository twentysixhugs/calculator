// Takes the expression part and defines whether it should be

import { ICalculator } from "../../interfaces/Calculator.interface";

// interpreted as decimal or whole
export class InterpretAsCommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right",
    private interpretAs: "whole" | "decimal"
  ) {}

  execute() {
    if (this.interpretAs === "whole") {
      this.calculator.setDecimalPointState(false, this.operandPosition);
      return;
    }
    if (this.interpretAs === "decimal") {
      this.calculator.setDecimalPointState(true, this.operandPosition);

      return;
    }
  }
}
