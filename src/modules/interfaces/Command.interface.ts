import { ICalculator } from "./Calculator.interface";

export interface CommandConstructor {
  new (calculator: ICalculator): ICommand;
}

export interface ImmediateCommandConstructor {
  new (calculator: ICalculator, operandPosition: "left" | "right"): ICommand;
}

export interface ICommand {
  execute(): unknown;
}
