import { ImmediateOperations } from "../../constants";
import {
  CommandConstructor,
  ImmediateCommandConstructor,
} from "../../interfaces/Command.interface";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { updateDisplay } from "../display";
import { calculator } from "../../Calculator";

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
      // expression: "2", command is applied to "2"
      new ImmediateCommand(calculator, "left").execute();
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
      if (new CurrentCommand(calculator).execute()) {
        new ImmediateCommand(calculator, "left").execute();
        updateDisplay();
      }
    }
  });
}
