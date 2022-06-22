import { GetStringifiedExpressionCommand } from "../commands/GetStringifiedExpressionCommand";
import { ICalculator } from "../interfaces/Calculator.interface";

const inputOutput = document.querySelector(
  ".js-input-output"
) as HTMLInputElement;

export function updateDisplay(calculator: ICalculator) {
  const expression = new GetStringifiedExpressionCommand(calculator).execute();

  inputOutput.textContent = expression;
}

export function appendDisplay(value: string) {
  if (inputOutput.textContent === "0") {
    inputOutput.textContent = value;
  } else {
    inputOutput.textContent += value;
  }
}
