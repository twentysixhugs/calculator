import Calculator from "../Calculator";
import AppendCurrentValueCommand from "../commands/AppendCurrentValueCommand";
import Display from "../Display";
import { ICalculator } from "../interfaces/Calculator.interface";
import { IDisplay } from "../interfaces/Display.interface";

export default function initCommands() {
  const calculator = new Calculator();
  const display = new Display();

  try {
    initCurrentValueUpdate(calculator, display);
  } catch (err) {
    // TODO: Show on screen
    console.log(err);
  }
}

function initCurrentValueUpdate(calculator: ICalculator, display: IDisplay) {
  // append current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224
  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const number = Number((e.target as HTMLButtonElement).id);

      if (number >= 0 && number <= 9) {
        new AppendCurrentValueCommand(calculator, display, number).execute();
      } else {
        throw new Error("Incorrect input");
      }
    });
  });
}
