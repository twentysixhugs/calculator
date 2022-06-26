import { calculator } from "../../Calculator";
import { RecallFromHistoryStackCommand } from "../../commands/Expression/RecallFromHistoryStackCommand";
import { updateDisplay } from "../display";

export function initHistory() {
  const btn = document.querySelector(".js-revert") as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    if (new RecallFromHistoryStackCommand(calculator).execute()) {
      updateDisplay();
    }
  });
}
