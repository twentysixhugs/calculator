import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";
import { IDisplay } from "../interfaces/Display.interface";

export default class AppendCurrentValueCommand implements ICommand {
  constructor(
    private calculator: ICalculator,
    private display: IDisplay,
    private arg: number
  ) {
    this.calculator = calculator;
    this.arg = arg;
  }

  execute() {
    const currentValue = this.calculator.getCurrentValue().toString();
    const valueToAdd = this.arg.toString();

    const concatenated = currentValue + valueToAdd;

    this.calculator.setCurrentValue(Number(concatenated));
    this.display.append(concatenated);
  }
}
