import { GetStringifiedExpressionCommand } from "../commands/Expression/GetStringifiedExpressionCommand";
import { calculator } from "../Calculator";
import { CalculationError } from "../constants";

const inputOutput = document.querySelector(
  ".js-input-output"
) as HTMLDivElement;

const errors = document.querySelector(".js-errors") as HTMLDivElement;

export function updateDisplay() {
  const expression = new GetStringifiedExpressionCommand(calculator).execute();

  inputOutput.textContent = expression;
}

export function appendDisplay(value: string) {
  if (inputOutput.textContent === "0" && value !== ".") {
    inputOutput.textContent = value;
  } else {
    inputOutput.textContent += value;
  }
}
export function showError(error: CalculationError) {
  errors.textContent = error;
  errors.classList.add("is-visible");

  setTimeout(() => {
    errors.classList.remove("is-visible");
  }, 2000);

  setTimeout(() => {
    errors.textContent = "";
  }, 2700);
}
