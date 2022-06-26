import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { OperatorCharacters } from "../../constants";

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

      if (
        operandAfterErase[operandAfterErase.length - 1] === "0" &&
        operandAfterErase.includes(".")
      ) {
        const decimalZerosAfterErase = (
          operandAfterErase.split(".")[1].match(/0/g) || []
        ).length;

        this.calculator.setDecimalZeros(decimalZerosAfterErase);
      }

      if (operandAfterErase === "") {
        const valueToSet = this.operandPosition === "left" ? 0 : null;

        this.calculator.setOperand(this.operandPosition, valueToSet);
      } else if (
        operandAfterErase === OperatorCharacters.SubtractJSConverted &&
        this.operandPosition === "right"
      ) {
        this.calculator.shouldChangeNextOperatorSign = true;
        this.calculator.setOperand(this.operandPosition, null);
      } else {
        this.calculator.setOperand(this.operandPosition, +operandAfterErase);
      }
    }
  }
}
