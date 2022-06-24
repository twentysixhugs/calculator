import { calculator } from "../../Calculator";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { ShowCalculationResultCommand } from "../../commands/Expression/ShowCalculationResultCommand";
import { updateDisplay } from "../display";
import { isCalculationError } from "../helpers";
import { showError } from "../display";

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
      try {
        const result = new CurrentCommand(calculator).execute();

        if (result !== null && typeof result === "number") {
          new ShowCalculationResultCommand(calculator, result).execute();
          updateDisplay();
        }
      } catch (err) {
        new ShowCalculationResultCommand(calculator, 0).execute();
        updateDisplay();

        if (isCalculationError(err)) {
          showError(err.message);
        }
      }
    }
  });
}
