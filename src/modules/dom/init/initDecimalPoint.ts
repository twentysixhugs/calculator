import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { calculator } from "../../Calculator";
import { appendDisplay } from "../display";
import { IsDecimalPointCommand } from "../../commands/Expression/IsDecimalPointCommand";
import { InterpretAsCommand } from "../../commands/Expression/InterpretAsCommand";

export function initDecimalPoint() {
  const btn = document.querySelector(".js-decimal-point") as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();
    const operator = new GetOperatorCommand(calculator).execute();

    const expressionHasLeft = leftOperand !== null;
    const expressionHasRight = rightOperand !== null;

    // Left operand, no operator, no right operand, no decimal point
    if (
      expressionHasLeft &&
      !operator &&
      !expressionHasRight &&
      !new IsDecimalPointCommand(calculator, "left").execute()
    ) {
      // Interpret everything that comes next as decimal part
      new InterpretAsCommand(calculator, "left", "decimal").execute();
      appendDisplay(".");
    }

    // Left operand, operator, right operand, no decimal point
    if (
      expressionHasLeft &&
      operator &&
      expressionHasRight &&
      !new IsDecimalPointCommand(calculator, "right").execute()
    ) {
      // Same way, interpret everything that comes next as decimal part
      new InterpretAsCommand(calculator, "right", "decimal").execute();
      appendDisplay(".");
    }
  });
}
