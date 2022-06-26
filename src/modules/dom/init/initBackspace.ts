import { calculator } from "../../Calculator";
import { EraseOperandFromEndCommand } from "../../commands/Expression/EraseOperandFromEndCommand";
import { EraseOperatorCommand } from "../../commands/Expression/EraseOperatorCommand";
import { GetDecimalZerosCommand } from "../../commands/Expression/GetDecimalZerosCommand";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { InterpretAsCommand } from "../../commands/Expression/InterpretAsCommand";
import { IsDecimalPointCommand } from "../../commands/Expression/IsDecimalPointCommand";
import { SetDecimalZerosCommand } from "../../commands/Expression/SetDecimalZerosCommand";
import { ShouldChangeNextOperatorSignCommand } from "../../commands/Expression/ShouldChangeNextOperatorSignCommand";
import { OperatorCharacters } from "../../constants";
import { appendDisplay, getDisplayValue, updateDisplay } from "../display";

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
      // If working with right operand
      initForOperand("right");
      return;
    }

    if (expressionHasLeft && !operator) {
      // If working with left operand
      initForOperand("left");
      updateDisplay();
      return;
    }

    if (expressionHasLeft && operator) {
      // If working with operator
      new EraseOperatorCommand(calculator).execute();
      updateDisplay();
      return;
    }
  });
}

function initForOperand(operandPosition: "left" | "right") {
  const operand = new GetOperandCommand(calculator, operandPosition).execute();
  const operandHasDecimal = new IsDecimalPointCommand(
    calculator,
    operandPosition
  ).execute();

  if (operand === null) return;

  const displayValue = getDisplayValue();

  if (!displayValue) return;

  const lastCharOnDisplay = displayValue[displayValue.length - 1];

  if (
    operandHasDecimal &&
    !operand.toString().includes(".") &&
    lastCharOnDisplay === "."
  ) {
    // If we're erasing the dot, make the operand whole and remove the dot from display
    new InterpretAsCommand(calculator, operandPosition, "whole").execute();
    updateDisplay();

    console.log("left: " + calculator.getOperand("left"));
    console.log("operator: " + calculator.getOperator());
    console.log("right: " + calculator.getOperand("right"));

    return;
  }

  const decimalZeros = new GetDecimalZerosCommand(calculator).execute();

  if (operandHasDecimal && displayValue.includes(".") && decimalZeros) {
    new SetDecimalZerosCommand(calculator, decimalZeros - 1).execute();
    updateDisplay();
    return;
  }

  if (operandHasDecimal && operand.toString().includes(".")) {
    // If we're erasing something after the dot, just remove one digit from the end
    new EraseOperandFromEndCommand(calculator, operandPosition).execute();

    updateDisplay();

    console.log("left: " + calculator.getOperand("left"));
    console.log("operator: " + calculator.getOperator());
    console.log("right: " + calculator.getOperand("right"));

    return;
  }

  new EraseOperandFromEndCommand(calculator, operandPosition).execute();
  updateDisplay();

  if (new ShouldChangeNextOperatorSignCommand(calculator).execute()) {
    appendDisplay(OperatorCharacters.Subtract);
  }
  console.log("left: " + calculator.getOperand("left"));
  console.log("operator: " + calculator.getOperator());
  console.log("right: " + calculator.getOperand("right"));
}
