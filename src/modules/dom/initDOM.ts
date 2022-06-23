import { initOperations } from "./init/initOperations";
import { initCurrentValueUpdate } from "./init/initCurrentValueUpdate";

export function initDOM() {
  initCurrentValueUpdate();
  initOperations();
}
