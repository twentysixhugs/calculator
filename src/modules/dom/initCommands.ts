import { Calculator } from "../Calculator";
import { AppendOperandCommand } from "../commands/AppendOperandCommand";
import { ChangeOperandSignCommand } from "../commands/ChangeOperandSignCommand";
import { GetOperandCommand } from "../commands/GetOperandCommand";
import { GetOperatorCommand } from "../commands/GetOperatorCommand";
import { GetStringifiedExpressionCommand } from "../commands/GetStringifiedExpressionCommand";
import { SetOperatorCommand } from "../commands/SetOperatorCommand";
import { Operator, OperatorCharacters } from "../constants";
import { Expression } from "../Expression";
import { ICalculator } from "../interfaces/Calculator.interface";

const inputOutput = document.querySelector(
  ".js-input-output"
) as HTMLInputElement;

let shouldChangeNextOperatorSign = false;

export default function initCommands() {
  const calculator = new Calculator(new Expression());

  initCurrentValueUpdate(calculator);
  initOperators(calculator);
}

function appendDisplay(value: string) {
  if (inputOutput.textContent === "0") {
    inputOutput.textContent = value;
  } else {
    inputOutput.textContent += value;
  }
}
function initCurrentValueUpdate(calculator: ICalculator) {
  // Appends current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;

      let number;

      if (shouldChangeNextOperatorSign) {
        number = -Number(target.id);
        shouldChangeNextOperatorSign = false;
      } else {
        number = Number(target.id);
      }

      // If the expression doesn't have an operator,
      // append the left operand on every input

      const expressionHasOperator = getOperator(calculator);

      if (!expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "left").execute();
        // appendDisplay(String(number));
        updateDisplay(calculator);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }

      // If the expression has the left operand and an operator,
      // append the left operand on every input

      const expressionHasLeftOperand = getOperand(calculator, "left") !== null;

      if (expressionHasLeftOperand && expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "right").execute();
        // appendDisplay(String(number));
        updateDisplay(calculator);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    });
  });
}
}

function updateDisplay(calculator: ICalculator) {
  const expression = getExpression(calculator);

  inputOutput.textContent = expression;
}

function getExpression(calculator: ICalculator) {
  const getStringifiedExpressionCommand = new GetStringifiedExpressionCommand(
    calculator
  );

  getStringifiedExpressionCommand.execute();

  return getStringifiedExpressionCommand.result!;
}
