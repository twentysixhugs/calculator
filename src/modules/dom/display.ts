import { GetStringifiedExpressionCommand } from "../commands/Expression/GetStringifiedExpressionCommand";
import { calculator } from "../Calculator";

const inputOutput = document.querySelector(
  ".js-input-output"
) as HTMLInputElement;

export function updateDisplay() {
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
