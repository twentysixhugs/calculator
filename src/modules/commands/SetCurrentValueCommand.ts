import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class SetCurrentValueCommand implements ICommand {
  constructor(private receiver: ICalculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.setCurrentValue(this.arg);
  }
}
