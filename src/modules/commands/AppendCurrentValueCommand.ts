import SetCurrentValueCommand from "./SetCurrentValueCommand";
import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { IDisplay } from "../interfaces/Display.interface";

export default class AppendCurrentValueCommand implements ICommand {
  constructor(private calculator: ICalculator, private arg: number) {
    this.calculator = calculator;
    this.arg = arg;
  }

  execute() {
    const currentValue = this.calculator.getCurrentValue().toString();
    const valueToAdd = this.arg.toString();

    new SetCurrentValueCommand(
      this.calculator,
      Number(currentValue + valueToAdd)
    ).execute();
  }
}
