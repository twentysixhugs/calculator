import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class GetCurrentValueCommand implements ICommand {
  constructor(private receiver: ICalculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.getCurrentValue();
  }
}
