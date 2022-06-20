import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class PercentageCommand implements ICommand {
  constructor(private receiver: ICalculator, private arg: number) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.percentage();
  }
}
