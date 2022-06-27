import { calculator } from "../../Calculator";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { AppendOperandCommand } from "../../commands/Expression/AppendOperandCommand";
import { appendDisplay, updateDisplay } from "../display";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { initEquals } from "./initEquals";
import { ShouldChangeNextOperatorSignCommand } from "../../commands/Expression/ShouldChangeNextOperatorSignCommand";
import { OperatorCharacters } from "../../constants";

export function initCurrentValueUpdate() {
  // Appends current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const left = new GetOperandCommand(calculator, "left").execute();
      const right = new GetOperandCommand(calculator, "right").execute();

      const leftLength = left !== null && left.toString().length;
      const rightLength = right !== null && right.toString().length;

      const target = e.target as HTMLButtonElement;

      let number;

      if (new ShouldChangeNextOperatorSignCommand(calculator).execute()) {
        number = -Number(target.dataset.number);
        new ShouldChangeNextOperatorSignCommand(calculator, false).execute();
      } else {
        number = Number(target.dataset.number);
      }

      // If the expression doesn't have an operator,
      // append the left operand on every input
      // Make sure it's not bigger than 8 characters

      const expressionHasOperator = new GetOperatorCommand(
        calculator
      ).execute();

      const leftIsNotBiggerThanPossible =
        (leftLength && leftLength < 8) || left === null;

      if (!expressionHasOperator && leftIsNotBiggerThanPossible) {
        new AppendOperandCommand(calculator, number, "left").execute();

        updateDisplay();

        return;
      }

      // If the expression has the left operand and an operator,
      // append the right operand on every input
      // Make sure the whole expression is not bigger than 12 characters

      const expressionHasLeftOperand =
        new GetOperandCommand(calculator, "left").execute() !== null;

      const expressionIsNotBiggerThanPossible =
        (leftLength &&
          leftLength <= 8 &&
          rightLength < 8 &&
          (rightLength < leftLength - 5 || leftLength - 5 <= 0)) ||
        right === null;

      if (
        expressionHasLeftOperand &&
        expressionHasOperator &&
        expressionIsNotBiggerThanPossible
      ) {
        new AppendOperandCommand(calculator, number, "right").execute();
        initEquals();
        updateDisplay();

        if (new ShouldChangeNextOperatorSignCommand(calculator).execute()) {
          appendDisplay(OperatorCharacters.Subtract);
        }

        return;
      }
    });
  });
}
