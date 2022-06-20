import { IDisplay } from "./interfaces/Display.interface";

export default class Display implements IDisplay {
  private _display = document.querySelector<HTMLDivElement>(".js-display");

  append(value: string) {
    this._display!.textContent += value;
  }
}
