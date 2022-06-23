import { MemoryUpdateOperation } from "../../constants";
import { GetOperandCommand } from "../../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../../commands/Expression/GetOperatorCommand";
import { calculator } from "../../Calculator";

function initMemoryOperations() {
  const memoryPlus = document.querySelector(".js-m-plus") as HTMLButtonElement;
  const memoryMinus = document.querySelector(
    ".js-m-minus"
  ) as HTMLButtonElement;
  const memoryClear = document.querySelector(".js-mc") as HTMLButtonElement;
  const memoryRecall = document.querySelector(".js-mr") as HTMLButtonElement;

  memoryPlus.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Add)
  );
  memoryPlus.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Subtract)
  );

  memoryClear.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Clear)
  );

  function handleMemoryUpdate(
    updateOperation: MemoryUpdateOperation,
    e: MouseEvent
  ) {
    // Used for handling adding to and subtracting from the memory
    const target = e.target as HTMLButtonElement;

    // Left -> save

    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();
    const operator = new GetOperatorCommand(calculator);

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = leftOperand !== null;

    let updateValue;

    // Only left operand is entered, no operator after it. E.g. "5"
    if (expressionHasLeftOperand && !operator) {
      // Use left operand for updating memory
      updateValue = leftOperand;
    }

    // Full expression is entered
    if (expressionHasLeftOperand && operator && expressionHasRightOperand) {
      // Operate on both operands, save their result to memory
      // updateValue = new OperateCommand(calculator).execute();
    }

    if (!updateValue) {
      return;
    }
  }
}
