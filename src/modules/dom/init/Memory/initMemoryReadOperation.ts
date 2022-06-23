import { CommandConstructor } from "../../../interfaces/Command.interface";
import { MemoryOperation } from "../../../constants";
import { calculator } from "../../../Calculator";
import { updateDisplay } from "../../display";

export function initMemoryReadOperation(
  selector: MemoryOperation,
  Command: CommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    new Command(calculator).execute();
    updateDisplay();
  });
}
