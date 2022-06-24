import { calculator } from "../../Calculator";
import { EraseOperandFromEndCommand } from "../../commands/Expression/EraseOperandFromEndCommand";
import { EraseOperatorCommand } from "../../commands/Expression/EraseOperatorCommand";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { updateDisplay } from "../display";

export function initBackspace() {
  const btn = document.querySelector(".js-delete") as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    // If left, operator and right are present
    // Erase operand from the end.

    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();
    const operator = new GetOperatorCommand(calculator).execute();

    const expressionHasLeft = leftOperand !== null;
    const expressionHasRight = rightOperand !== null;

    if (expressionHasLeft && operator && expressionHasRight) {
      new EraseOperandFromEndCommand(calculator, "right").execute();
      updateDisplay();
      return;
    }

    if (expressionHasLeft && !operator) {
      new EraseOperandFromEndCommand(calculator, "left").execute();
      updateDisplay();
      return;
    }

    if (expressionHasLeft && operator) {
      new EraseOperatorCommand(calculator).execute();
      updateDisplay();
      return;
    }
  });
}
