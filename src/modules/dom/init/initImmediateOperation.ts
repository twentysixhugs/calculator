import { ImmediateOperations } from "../../constants";
import {
  CommandConstructor,
  ImmediateCommandConstructor,
} from "../../interfaces/Command.interface";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { showError, updateDisplay } from "../display";
import { calculator } from "../../Calculator";
import { isCalculationError } from "../helpers";
import { ProcessCalculationResultCommand } from "../../commands/Expression/ProcessCalculationResultCommand";

export function initImmediateOperation(
  selector: ImmediateOperations,
  ImmediateCommand: ImmediateCommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = rightOperand !== null;

    const expressionHasOperator = !!new GetOperatorCommand(
      calculator
    ).execute();

    if (expressionHasLeftOperand && !expressionHasOperator) {
      // if it looks like "2." (with decimal point at the end), don't execute
      if (
        calculator.decimalPointState.left &&
        !leftOperand.toString().includes(".")
      ) {
        return;
      }

      // expression: "2", command is applied to "2"
      try {
        new ImmediateCommand(calculator, "left").execute();
      } catch (err) {
        if (isCalculationError(err)) {
          showError(err.message);
          new ProcessCalculationResultCommand(calculator, 0).execute();
        }
      }
      updateDisplay();
    }

    // expression: "2 + 4", expression result is calculated and the command is applied to it

    const { CurrentCommand } = calculator;

    if (
      expressionHasLeftOperand &&
      expressionHasOperator &&
      expressionHasRightOperand &&
      CurrentCommand
    ) {
      // if it looks like "2+3." (with decimal point at the end), don't execute
      if (
        calculator.decimalPointState.right &&
        !rightOperand.toString().includes(".")
      ) {
        return;
      }

      try {
        const result = new CurrentCommand(calculator).execute();
        if (result !== null && typeof result === "number") {
          new ProcessCalculationResultCommand(calculator, result).execute();
          new ImmediateCommand(calculator, "left").execute();
        }
      } catch (err) {
        if (isCalculationError(err)) {
          showError(err.message);

          new ProcessCalculationResultCommand(calculator, 0);
        }
      }
      updateDisplay();
    }
  });
}
