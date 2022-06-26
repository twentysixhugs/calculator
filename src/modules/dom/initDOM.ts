import { initOperations } from "./init/initOperations";
import { initCurrentValueUpdate } from "./init/initCurrentValueUpdate";
import { initMemoryOperations } from "./init/Memory/initMemoryOperations";
import { initBackspace } from "./init/initBackspace";
import { initDecimalPoint } from "./init/initDecimalPoint";
import { initHistory } from "./init/initHistory";
import { initThemeSwitch } from "./init/initThemeSwitch";

export function initDOM() {
  initCurrentValueUpdate();
  initOperations();
  initMemoryOperations();
  initBackspace();
  initDecimalPoint();
  initHistory();
  initThemeSwitch();
}
