import { MemoryOperation } from "../../../constants";
import { MemoryCommandConstructor } from "../../../interfaces/Command.interface";
import { GetOperandCommand } from "../../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../../commands/Expression/GetOperatorCommand";
import { calculator } from "../../../Calculator";

export function initMemoryUpdateOperation(
  selector: MemoryOperation,
  Command: MemoryCommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();
    const operator = new GetOperatorCommand(calculator).execute();

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = rightOperand !== null;

    let updateValue;

    // Only left operand is entered, no operator after it. E.g. "5"
    if (expressionHasLeftOperand && !operator) {
      // Use left operand for updating memory
      updateValue = leftOperand;
    }

    const { CurrentCommand } = calculator;

    // Full expression is entered
    if (
      expressionHasLeftOperand &&
      operator &&
      expressionHasRightOperand &&
      CurrentCommand
    ) {
      // Operate on both operands
      updateValue = new CurrentCommand(calculator).execute();
    }

    if (typeof updateValue === "number") {
      new Command(calculator, updateValue).execute();
    }
  });
}
