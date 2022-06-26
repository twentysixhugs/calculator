import {
  CalculationError,
  DoubleOperandOperations,
  Operator,
  OperatorCharacters,
} from "../../constants";
import { CommandConstructor } from "../../interfaces/Command.interface";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { SetOperatorCommand } from "../../commands/Expression/SetOperatorCommand";
import { IsDecimalPointCommand } from "../../commands/Expression/IsDecimalPointCommand";
import { showError, updateDisplay } from "../display";
import { appendDisplay } from "../display";
import { calculator } from "../../Calculator";
import { isCalculationError, isOperatorAssignable } from "../helpers";
import { ProcessCalculationResultCommand } from "../../commands/Expression/ProcessCalculationResultCommand";
import { ShouldChangeNextOperatorSignCommand } from "../../commands/Expression/ShouldChangeNextOperatorSignCommand";
import { getDisplayValue } from "../display";
import { SetDecimalZerosCommand } from "../../commands/Expression/SetDecimalZerosCommand";
import { InterpretAsCommand } from "../../commands/Expression/InterpretAsCommand";
import { PushExpressionToHistoryStackCommand } from "../../commands/Expression/PushExpressionToHistoryStackCommand";

export function initDoubleOperandOperation(
  selector: DoubleOperandOperations,
  Command: CommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();

    const leftHasDecimal = new IsDecimalPointCommand(
      calculator,
      "left"
    ).execute();
    const rightHasDecimal = new IsDecimalPointCommand(
      calculator,
      "right"
    ).execute();

    const displayValue = getDisplayValue();

    if (!displayValue) return;

    const lastCharOnDisplay = displayValue[displayValue.length - 1];

    if (leftHasDecimal && lastCharOnDisplay === ".") {
      return;
    }

    if (rightHasDecimal && lastCharOnDisplay === ".") {
      return;
    }

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
        if (canAssignOperator) {
          new SetOperatorCommand(calculator, receivedOperator).execute();
          new SetDecimalZerosCommand(calculator, 0).execute();
        }

        if (!leftOperand.toString().includes(".")) {
          new InterpretAsCommand(calculator, "left", "whole").execute();
          // Prevent "5.+", "0.+" etc.
        }

        updateDisplay();

        calculator.CurrentCommand = Command;

        return;
      }

      // If there's operator, no right operand and the input operator is subtract,
      // Then make sure it will be saved as negative and display minus
      if (
        expressionHasOperator &&
        !expressionHasRightOperand &&
        receivedOperator === Operator.Subtract
      ) {
        new ShouldChangeNextOperatorSignCommand(calculator, true).execute();

        updateDisplay();
        appendDisplay(OperatorCharacters.Subtract);

        return;
      }
    }

    if (expressionHasOperator && !expressionHasRightOperand) {
      if (canAssignOperator) {
        new SetOperatorCommand(calculator, receivedOperator).execute();
        new SetDecimalZerosCommand(calculator, 0).execute();
      }

      calculator.CurrentCommand = Command;

      new ShouldChangeNextOperatorSignCommand(calculator, false).execute();

      updateDisplay();

      return;
    }

    // If there's no left and the input is minus,
    // then make sure the left operand will be saved as negative and display minus
    if (!expressionHasLeftOperand) {
      if (receivedOperator === Operator.Subtract) {
        new ShouldChangeNextOperatorSignCommand(calculator, true).execute();

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
      try {
        new PushExpressionToHistoryStackCommand(calculator).execute();

        const result = new CurrentCommand(calculator).execute();

        if (result !== null && typeof result === "number") {
          new ProcessCalculationResultCommand(calculator, result).execute();

          if (canAssignOperator) {
            new SetOperatorCommand(calculator, receivedOperator).execute();
            new SetDecimalZerosCommand(calculator, 0).execute();
          }

          calculator.CurrentCommand = Command;

          updateDisplay();
        }
      } catch (err) {
        new ProcessCalculationResultCommand(calculator, 0).execute();
        updateDisplay();

        if (isCalculationError(err)) {
          showError(err.message);
        }
      }
    }
  });
}
