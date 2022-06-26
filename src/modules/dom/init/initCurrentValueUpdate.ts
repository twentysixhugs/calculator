import { calculator } from "../../Calculator";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { AppendOperandCommand } from "../../commands/Expression/AppendOperandCommand";
import { appendDisplay, updateDisplay } from "../display";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { initEquals } from "./initEquals";
import { ShouldChangeNextOperatorSignCommand } from "../../commands/Expression/ShouldChangeNextOperatorSignCommand";
import { OperatorCharacters } from "../../constants";

export function initCurrentValueUpdate() {
  // Appends current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;

      let number;

      if (new ShouldChangeNextOperatorSignCommand(calculator).execute()) {
        number = -Number(target.dataset.number);
        new ShouldChangeNextOperatorSignCommand(calculator, false).execute();
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

        updateDisplay();

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
        initEquals();
        updateDisplay();

        if (new ShouldChangeNextOperatorSignCommand(calculator).execute()) {
          appendDisplay(OperatorCharacters.Subtract);
        }

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    });
  });
}
