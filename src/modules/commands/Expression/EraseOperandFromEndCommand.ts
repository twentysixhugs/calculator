import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class EraseOperandFromEndCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const operandAtPosition = this.calculator
      .getOperand(this.operandPosition)
      ?.toString();

    if (operandAtPosition) {
      // Remove the last character from stringified operand
      const operandAfterErase = operandAtPosition.slice(0, -1);

      if (operandAfterErase === "") {
        const valueToSet = this.operandPosition === "left" ? 0 : null;

        this.calculator.setOperand(this.operandPosition, valueToSet);
      } else {
        this.calculator.setOperand(this.operandPosition, +operandAfterErase);
      }
    }
  }
}
