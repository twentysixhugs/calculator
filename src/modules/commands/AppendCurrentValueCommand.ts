import SetCurrentValueCommand from "./SetCurrentValueCommand";
import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class AppendCurrentValueCommand implements ICommand {
  constructor(private receiver: ICalculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    const currentValue = this.receiver.getCurrentValue().toString();
    const valueToAdd = this.arg.toString();

    new SetCurrentValueCommand(
      this.receiver,
      Number(currentValue + valueToAdd)
    ).execute();
  }
}
