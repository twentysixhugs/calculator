import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class SubtractCommand implements ICommand {
  constructor(private receiver: ICalculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.subtract(this.arg);
  }
}
