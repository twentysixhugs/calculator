import { ICommand } from "../../interfaces/Command.interface";
import { ICalculator } from "../../interfaces/Calculator.interface";
import { OperatorCharacters } from "../../constants";
import { IsDecimalPointCommand } from "./IsDecimalPointCommand";
import { GetDecimalZerosCommand } from "./GetDecimalZerosCommand";

export class GetStringifiedExpressionCommand implements ICommand {
  constructor(private calculator: ICalculator) {}

  execute() {
    // Returns a stringified version of the current expression
    const { left, operator, right: rawRight } = this.calculator.getExpression();

    let right;

    if (rawRight === 0 && Object.is(rawRight, -0)) {
      right = "-0";
    } else {
      right = rawRight;
    }

    const leftHasDecimal = new IsDecimalPointCommand(
      this.calculator,
      "left"
    ).execute();
    const rightHasDecimal = new IsDecimalPointCommand(
      this.calculator,
      "right"
    ).execute();

    if (leftHasDecimal && !rightHasDecimal) {
      const zerosCount = new GetDecimalZerosCommand(this.calculator).execute();
      const zeros = Array(zerosCount).fill("0").join("");

      if (!left.toString().includes(".")) {
        return `${left !== null ? left + "." + zeros : ""}${
          operator ? OperatorCharacters[operator] : ""
        }${right ?? ""}`;
      }

      return `${left !== null ? left + zeros : ""}${
        operator ? OperatorCharacters[operator] : ""
      }${right ?? ""}`;
    }

    if (rightHasDecimal) {
      const zerosCount = new GetDecimalZerosCommand(this.calculator).execute();
      const zeros = Array(zerosCount).fill("0").join("");

      if (!right?.toString().includes(".")) {
        return `${left ?? ""}${operator ? OperatorCharacters[operator] : ""}${
          right !== null ? right + "." + zeros : ""
        }`;
      }

      return `${left ?? ""}${operator ? OperatorCharacters[operator] : ""}${
        right !== null ? right + zeros : ""
      }`;
    }

    return `${left ?? ""}${operator ? OperatorCharacters[operator] : ""}${
      right ?? ""
    }`;
  }
}
