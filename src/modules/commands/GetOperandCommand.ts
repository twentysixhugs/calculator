import { ICommand } from "../interfaces/Command.interface";
import { ICalculator } from "../interfaces/Calculator.interface";

export class GetOperandCommand implements ICommand {
  public result?: number | null;

  constructor(
    private calculator: ICalculator,
    private operandPosition: "left" | "right"
  ) {}

  execute() {
    this.result = this.calculator.getOperand(this.operandPosition);
  }
}
