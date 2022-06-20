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
    // Update display
    const valueToAdd = this.arg.toString();
    this.display.append(valueToAdd);

    // Update calculator state
    const currentValue = this.calculator.getCurrentValue().toString();
    const concatenated =
      currentValue !== "0" ? currentValue + valueToAdd : valueToAdd;

    this.calculator.setCurrentValue(Number(concatenated));
  }
}
