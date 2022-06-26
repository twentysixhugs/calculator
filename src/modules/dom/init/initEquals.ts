import { calculator } from "../../Calculator";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { ProcessCalculationResultCommand } from "../../commands/Expression/ProcessCalculationResultCommand";
import { IsDecimalPointCommand } from "../../commands/Expression/IsDecimalPointCommand";
import { updateDisplay } from "../display";
import { isCalculationError } from "../helpers";
import { showError, getDisplayValue } from "../display";
import { PushExpressionToHistoryStackCommand } from "../../commands/Expression/PushExpressionToHistoryStackCommand";

export function initEquals() {
  const equalsButton = document.querySelector(
    ".js-equals"
  ) as HTMLButtonElement;
  equalsButton.addEventListener("click", (e) => {
    const left = new GetOperandCommand(calculator, "left").execute();

    const right = new GetOperandCommand(calculator, "right").execute();

    const rightHasDecimal = new IsDecimalPointCommand(
      calculator,
      "right"
    ).execute();

    const displayValue = getDisplayValue();

    if (!displayValue) return;

    const lastCharOnDisplay = displayValue[displayValue.length - 1];

    if (rightHasDecimal && lastCharOnDisplay === ".") {
      return;
    }

    const expressionHasLeftOperand = left !== null;

    const expressionHasRightOperand = right !== null;

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
          new PushExpressionToHistoryStackCommand(calculator).execute();

          new ProcessCalculationResultCommand(calculator, result).execute();
          updateDisplay();
        }
      } catch (err) {
        new PushExpressionToHistoryStackCommand(calculator).execute();

        new ProcessCalculationResultCommand(calculator, 0).execute();
        updateDisplay();

        if (isCalculationError(err)) {
          showError(err.message);
        }
      }
    }
  });
}
