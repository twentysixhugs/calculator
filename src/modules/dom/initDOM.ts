import { initOperations } from "./init/initOperations";
import { initCurrentValueUpdate } from "./init/initCurrentValueUpdate";
import { initMemoryOperations } from "./init/Memory/initMemoryOperations";
import { initBackspace } from "./init/initBackspace";
import { initDecimalPoint } from "./init/initDecimalPoint";

export function initDOM() {
  initCurrentValueUpdate();
  initOperations();
  initMemoryOperations();
  initBackspace();
  initDecimalPoint();
}
