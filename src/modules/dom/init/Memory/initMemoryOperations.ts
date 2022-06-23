import { MemoryOperation } from "../../../constants";
import { initMemoryUpdateOperation } from "./initMemoryUpdateOperation";
import { AddToMemoryCommand } from "../../../commands/Memory/AddToMemoryCommand";
import { SubtractFromMemoryCommand } from "../../../commands/Memory/SubtractFromMemoryCommand";
import { ClearMemoryCommand } from "../../../commands/Memory/ClearMemoryCommand";
import { initMemoryReadOperation } from "./initMemoryReadOperation";
import { RecallFromMemoryCommand } from "../../../commands/Memory/RecallFromMemoryCommand";

export function initMemoryOperations() {
  initMemoryUpdateOperation(MemoryOperation.Add, AddToMemoryCommand);
  initMemoryUpdateOperation(
    MemoryOperation.Subtract,
    SubtractFromMemoryCommand
  );
  initMemoryUpdateOperation(MemoryOperation.Clear, ClearMemoryCommand);

  initMemoryReadOperation(MemoryOperation.Recall, RecallFromMemoryCommand);
}
