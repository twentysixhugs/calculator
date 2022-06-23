import {
  DoubleOperandOperations,
  Operator,
  OperatorCharacters,
} from "../../constants";
import { CommandConstructor } from "../../interfaces/Command.interface";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { SetOperatorCommand } from "../../commands/Expression/SetOperatorCommand";

import { updateDisplay } from "../display";
import { appendDisplay } from "../display";
import { calculator } from "../../Calculator";
import { isOperatorAssignable } from "../helpers";
import { ShowCalculationResultCommand } from "../../commands/Expression/ShowCalculationResultCommand";

export function initDoubleOperandOperation(
  selector: DoubleOperandOperations,
  Command: CommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = rightOperand !== null;

    const expressionHasOperator = !!new GetOperatorCommand(
      calculator
    ).execute();

    const receivedOperator = target.dataset.operator;

    const canAssignOperator = isOperatorAssignable(receivedOperator);

    if (expressionHasLeftOperand) {
      // If there's no right operand and operator, save input to operator
      if (!expressionHasRightOperand && !expressionHasOperator) {
        canAssignOperator &&
          new SetOperatorCommand(calculator, receivedOperator).execute();
        updateDisplay();

        calculator.CurrentCommand = Command;

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }

      // If there's operator, no right operand and the input operator is subtract,
      // Then make sure it will be saved as negative and display minus
      if (
        expressionHasOperator &&
        !expressionHasRightOperand &&
        !rightOperand &&
        receivedOperator === Operator.Subtract
      ) {
        calculator.shouldChangeNextOperatorSign = true;

        updateDisplay();
        appendDisplay(OperatorCharacters.Subtract);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    }

    // If there's no left and the input is minus,
    // then make sure the left operand will be saved as negative and display minus
    if (!expressionHasLeftOperand) {
      if (receivedOperator === Operator.Subtract) {
        calculator.shouldChangeNextOperatorSign = true;

        updateDisplay();
        appendDisplay(OperatorCharacters.Subtract);

        return;
      }
    }

    // If there are both operands and the operator, calculate the value and display it
    const { CurrentCommand } = calculator;

    if (
      expressionHasLeftOperand &&
      expressionHasOperator &&
      expressionHasRightOperand &&
      CurrentCommand
    ) {
      const result = new CurrentCommand(calculator).execute();

      if (result !== null && typeof result === "number") {
        new ShowCalculationResultCommand(calculator, result).execute();

        canAssignOperator &&
          new SetOperatorCommand(calculator, receivedOperator).execute();

        calculator.CurrentCommand = Command;

        updateDisplay();
      }
    }
  });
}
