import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export default class SaveCurrentOperandCommand implements ICommand {
  constructor(private calculator: ICalculator, private arg: number) {
    this.calculator = calculator;
    this.arg = arg;
  }

  execute() {
    const valueToAdd = this.arg.toString();

    const currentOperand = this.calculator.getCurrentOperand();

    if (currentOperand === null || currentOperand === 0) {
      this.calculator.setCurrentOperand(Number(valueToAdd));
    } else {
      this.calculator.setCurrentOperand(Number(currentOperand + valueToAdd));
    }
  }
}
