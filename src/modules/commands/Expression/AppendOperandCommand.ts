import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";

export class AppendOperandCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private arg: number,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    const valueToAppend = this.arg.toString();

    const operandAtPosition = this.calculator
      .getOperand(this.operandPosition)
      ?.toString();

    const decimalZerosCount = this.calculator.getDecimalZeros();

    if (!operandAtPosition) {
      this.calculator.setOperand(this.operandPosition, +valueToAppend);
    } else {
      // If it should append decimal part
      if (this.calculator.decimalPointState[this.operandPosition]) {
        if (valueToAppend === "0") {
          // No matter how many zeros we add, the operand remains the same
          // Just keep track of the number of zeros

          this.calculator.incrementDecimalZeros();

          return;
        }

        // If the operand is whole, i.e. display value is "1."
        if (
          !decimalZerosCount &&
          (+operandAtPosition % 1 === 0 || +operandAtPosition === 0)
        ) {
          this.calculator.setOperand(
            this.operandPosition,
            parseFloat(operandAtPosition + "." + valueToAppend)
          );
        } else {
          const zeros = new Array(decimalZerosCount).fill("0").join("");

          this.calculator.setOperand(
            this.operandPosition,
            parseFloat(
              operandAtPosition +
                tryToInsertDecimalPoint() +
                zeros +
                valueToAppend
            )
          );
          this.calculator.resetDecimalZeros();
        }
      } else {
        this.calculator.setOperand(
          this.operandPosition,
          parseFloat(operandAtPosition + valueToAppend)
        );
      }
    }

    // if it should not append decimal part

    function tryToInsertDecimalPoint() {
      return operandAtPosition?.includes(".") ? "" : ".";
    }
  }
}
