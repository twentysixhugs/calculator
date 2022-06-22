import { Calculator } from "../Calculator";
import { AppendOperandCommand } from "../commands/AppendOperandCommand";
import { GetOperandCommand } from "../commands/GetOperandCommand";
import { GetOperatorCommand } from "../commands/GetOperatorCommand";
import { OperateCommand } from "../commands/OperateCommand";
import { SetOperatorCommand } from "../commands/SetOperatorCommand";
import {
  ImmediateOperations,
  Operator,
  OperatorCharacters,
} from "../constants";
import { Expression } from "../Expression";
import { ICalculator } from "../interfaces/Calculator.interface";
import { ICommand } from "../interfaces/Command.interface";
import { updateDisplay, appendDisplay } from "./display";

let shouldChangeNextOperatorSign = false;

export function initCommands() {
  const calculator = new Calculator(new Expression());

  initCurrentValueUpdate(calculator);
  initOperators(calculator);
  initEquals(calculator);
}

function initCurrentValueUpdate(calculator: ICalculator) {
  // Appends current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;

      let number;

      if (shouldChangeNextOperatorSign) {
        number = -Number(target.dataset.number);
        shouldChangeNextOperatorSign = false;
      } else {
        number = Number(target.dataset.number);
      }

      // If the expression doesn't have an operator,
      // append the left operand on every input

      const expressionHasOperator = new GetOperatorCommand(
        calculator
      ).execute();

      if (!expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "left").execute();

        updateDisplay(calculator);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }

      // If the expression has the left operand and an operator,
      // append the left operand on every input

      const expressionHasLeftOperand =
        new GetOperandCommand(calculator, "left").execute() !== null;

      if (expressionHasLeftOperand && expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "right").execute();
        updateDisplay(calculator);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    });
  });
}

function initOperators(calculator: ICalculator) {
  document
    .querySelectorAll<HTMLButtonElement>(".js-operation")
    .forEach((el) => {
      el.addEventListener("click", (e) => {
        const target = e.target as HTMLButtonElement;
        const receivedOperator = target.dataset.operator;

        if (!isOperatorAssignable(receivedOperator)) {
          return;
        }

        const leftOperand = new GetOperandCommand(calculator, "left").execute();

        const rightOperand = new GetOperandCommand(
          calculator,
          "right"
        ).execute();

        const expressionHasLeftOperand = leftOperand !== null;

        const expressionHasRightOperand = rightOperand !== null;

        const expressionOperator = new GetOperatorCommand(calculator).execute();

        if (expressionHasLeftOperand) {
          // If there's no right operand and operator, save input to operator
          if (!expressionHasRightOperand && !expressionOperator) {
            new SetOperatorCommand(calculator, receivedOperator).execute();
            updateDisplay(calculator);

            console.log("left: " + calculator.getOperand("left"));
            console.log("operator: " + calculator.getOperator());
            console.log("right: " + calculator.getOperand("right"));

            return;
          }

          // If there's operator, no right operand and the input operator is subtract,
          // Then make sure it will be saved as negative and display minus
          if (
            expressionOperator &&
            !expressionHasRightOperand &&
            !rightOperand &&
            receivedOperator === Operator.Subtract
          ) {
            shouldChangeNextOperatorSign = true;

            updateDisplay(calculator);
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
            shouldChangeNextOperatorSign = true;

            updateDisplay(calculator);
            appendDisplay(OperatorCharacters.Subtract);

            return;
          }
        }

        // If there are both operands and the operator, calculate the value and display it

        if (
          expressionHasLeftOperand &&
          expressionHasRightOperand &&
          expressionOperator
        ) {
          if (new OperateCommand(calculator).execute()) {
            new SetOperatorCommand(calculator, receivedOperator).execute();
            updateDisplay(calculator);
          }
        }
      });
    });
}

function initEquals(calculator: ICalculator) {
  const equalsButton = document.querySelector(
    ".js-equals"
  ) as HTMLButtonElement;
  equalsButton.addEventListener("click", (e) => {
    const expressionHasLeftOperand =
      new GetOperandCommand(calculator, "left") !== null;

    const expressionHasRightOperand =
      new GetOperandCommand(calculator, "right") !== null;

    const expressionOperator = new GetOperatorCommand(calculator);

    if (
      expressionHasLeftOperand &&
      expressionHasRightOperand &&
      expressionOperator
    ) {
      if (new OperateCommand(calculator).execute()) {
        updateDisplay(calculator);
      }
    }
  });
}

function isOperatorAssignable(
  arg: string | undefined | null
): arg is Operator | null {
  if (arg === undefined) {
    return false;
  }

  if (
    arg === null ||
    Object.values(Operator).includes(arg as unknown as Operator)
  ) {
    return true;
  }

  return false;
}
