import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class RootCommand implements ICommand {
  constructor(private receiver: ICalculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.root(this.arg);
  }
}