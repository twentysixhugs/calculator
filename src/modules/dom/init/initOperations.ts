import { InvertSignCommand } from "../../commands/Immediate/InvertSignCommand";
import { CubicRootCommand } from "../../commands/Immediate/CubicRootCommand";
import { FactorialCommand } from "../../commands/Immediate/FactorialCommand";
import { SquareRootCommand } from "../../commands/Immediate/SquareRootCommand";
import { DoubleOperandOperations, ImmediateOperations } from "../../constants";
import { ReciprocalCommand } from "../../commands/Immediate/ReciprocalCommand";
import { PercentageCommand } from "../../commands/Immediate/PercentageCommand";
import { PowerOfThreeCommand } from "../../commands/Immediate/PowerOfThreeCommand";
import { PowerOfTwoCommand } from "../../commands/Immediate/PowerOfTwoCommand";
import { TenToThePowerCommand } from "../../commands/Immediate/TenToThePowerCommand";

import { AddCommand } from "../../commands/DoubleOperand/AddCommand";
import { SubtractCommand } from "../../commands/DoubleOperand/SubtractCommand";
import { MultiplyCommand } from "../../commands/DoubleOperand/MultiplyCommand";
import { DivideCommand } from "../../commands/DoubleOperand/DivideCommand";
import { RootCommand } from "../../commands/DoubleOperand/RootCommand";
import { PowerCommand } from "../../commands/DoubleOperand/PowerCommand";

import { initDoubleOperandOperation } from "./initDoubleOperandOperation";
import { initImmediateOperation } from "./initImmediateOperation";

export function initOperations() {
  initAllDoubleOperandOperations();
  initAllImmediateOperations();
}

function initAllDoubleOperandOperations() {
  // Inputs like 2 + 3, 2 +, etc.
  initDoubleOperandOperation(DoubleOperandOperations.Add, AddCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Subtract, SubtractCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Multiply, MultiplyCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Divide, DivideCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Yroot, RootCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Power, PowerCommand);
}

function initAllImmediateOperations() {
  // Inputs like cubic root, 1 / x, etc.
  // They are calculated immediately on button click

  // Executed immediately either on a single operand,
  // Or on the expression result

  initImmediateOperation(ImmediateOperations.CubicRoot, CubicRootCommand);

  initImmediateOperation(ImmediateOperations.Factorial, FactorialCommand);

  initImmediateOperation(ImmediateOperations.InvertSign, InvertSignCommand);

  initImmediateOperation(ImmediateOperations.OneDividedByX, ReciprocalCommand);

  initImmediateOperation(ImmediateOperations.Percentage, PercentageCommand);

  initImmediateOperation(ImmediateOperations.SquareRoot, SquareRootCommand);

  initImmediateOperation(ImmediateOperations.TenPowerX, TenToThePowerCommand);

  initImmediateOperation(ImmediateOperations.XPowerThree, PowerOfThreeCommand);

  initImmediateOperation(ImmediateOperations.XPowerTwo, PowerOfTwoCommand);
}
