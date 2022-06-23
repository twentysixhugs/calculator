import { calculator } from "../../Calculator";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { updateDisplay } from "../display";

export function initEquals() {
  const equalsButton = document.querySelector(
    ".js-equals"
  ) as HTMLButtonElement;
  equalsButton.addEventListener("click", (e) => {
    const expressionHasLeftOperand =
      new GetOperandCommand(calculator, "left") !== null;

    const expressionHasRightOperand =
      new GetOperandCommand(calculator, "right") !== null;

    const expressionOperator = new GetOperatorCommand(calculator).execute();

    const { CurrentCommand } = calculator;

    if (
      expressionHasLeftOperand &&
      expressionHasRightOperand &&
      expressionOperator &&
      CurrentCommand
    ) {
      if (new CurrentCommand(calculator).execute()) {
        console.log("called");
        updateDisplay();
      }
    }
  });
}
