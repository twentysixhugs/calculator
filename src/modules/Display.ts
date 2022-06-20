import { IDisplay } from "./interfaces/Display.interface";

export default class Display implements IDisplay {
  private _inputOutput =
    document.querySelector<HTMLInputElement>(".js-input-output");

  append(value: string) {
    if (this._inputOutput!.value === "0") {
      this._inputOutput!.value = value;
    } else {
      this._inputOutput!.value += value;
    }
  }
}
