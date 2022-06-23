import { initOperations } from "./init/initOperations";
import { initCurrentValueUpdate } from "./init/initCurrentValueUpdate";
import { initMemoryOperations } from "./init/Memory/initMemoryOperations";

export function initDOM() {
  initCurrentValueUpdate();
  initOperations();
  initMemoryOperations();
}
