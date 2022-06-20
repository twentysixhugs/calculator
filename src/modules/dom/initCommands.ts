import Calculator from "../Calculator";
import AppendCurrentValueCommand from "../commands/AppendCurrentValueCommand";
import { ICalculator } from "../interfaces/Calculator.interface";

export default function initCommands() {
  const calculator = new Calculator();

  initCurrentValueUpdate(calculator);
}

function initCurrentValueUpdate(receiver: ICalculator) {
  // increase current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      new AppendCurrentValueCommand(
        receiver,
        Number((e.target as HTMLButtonElement).id)
      ).execute();
    });
  });
}
