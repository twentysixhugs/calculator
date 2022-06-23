import { AppendOperandCommand } from "../commands/Expression/AppendOperandCommand";
import { InvertSignCommand } from "../commands/Immediate/InvertSignCommand";
import { CubicRootCommand } from "../commands/Immediate/CubicRootCommand";
import { FactorialCommand } from "../commands/Immediate/FactorialCommand";
import { GetOperandCommand } from "../commands/Expression/GetOperandCommand";
import { GetOperatorCommand } from "../commands/Expression/GetOperatorCommand";
import { SetOperatorCommand } from "../commands/Expression/SetOperatorCommand";
import { SquareRootCommand } from "../commands/Immediate/SquareRootCommand";
import {
  DoubleOperandOperations,
  ImmediateOperations,
  MemoryUpdateOperation,
  Operator,
  OperatorCharacters,
} from "../constants";
import {
  CommandConstructor,
  ICommand,
  ImmediateCommandConstructor,
} from "../interfaces/Command.interface";
import { updateDisplay, appendDisplay } from "./display";
import { ReciprocalCommand } from "../commands/Immediate/ReciprocalCommand";
import { PercentageCommand } from "../commands/Immediate/PercentageCommand";
import { PowerOfThreeCommand } from "../commands/Immediate/PowerOfThreeCommand";
import { PowerOfTwoCommand } from "../commands/Immediate/PowerOfTwoCommand";
import { TenToThePowerCommand } from "../commands/Immediate/TenToThePowerCommand";

import { calculator } from "../Calculator";
import { AddToMemoryCommand } from "../commands/Memory/AddToMemoryCommand";
import { SubtractFromMemoryCommand } from "../commands/Memory/SubtractFromMemoryCommand";
import { AddCommand } from "../commands/DoubleOperand/AddCommand";
import { SubtractCommand } from "../commands/DoubleOperand/SubtractCommand";
import { MultiplyCommand } from "../commands/DoubleOperand/MultiplyCommand";
import { DivideCommand } from "../commands/DoubleOperand/DivideCommand";
import { RootCommand } from "../commands/DoubleOperand/RootCommand";
import { PowerCommand } from "../commands/DoubleOperand/PowerCommand";

export function initCommands() {
  initCurrentValueUpdate();
  initAllDoubleOperandOperations();
  initAllImmediateOperations();
}

function initCurrentValueUpdate() {
  // Appends current value when clicking on 0-9
  // 1, 2, 2, 4 results in 1224

  document.querySelectorAll<HTMLButtonElement>(".js-number").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;

      let number;

      if (calculator.shouldChangeNextOperatorSign) {
        number = -Number(target.dataset.number);
        calculator.shouldChangeNextOperatorSign = false;
      } else {
        number = Number(target.dataset.number);
      }

      // If the expression doesn't have an operator,
      // append the left operand on every input

      const expressionHasOperator = new GetOperatorCommand(
        calculator
      ).execute();

      if (!expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "left").execute();

        updateDisplay();

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }

      // If the expression has the left operand and an operator,
      // append the left operand on every input

      const expressionHasLeftOperand =
        new GetOperandCommand(calculator, "left").execute() !== null;

      if (expressionHasLeftOperand && expressionHasOperator) {
        new AppendOperandCommand(calculator, number, "right").execute();
        initEquals();
        updateDisplay();

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    });
  });
}

function initEquals() {
  const equalsButton = document.querySelector(
    ".js-equals"
  ) as HTMLButtonElement;
  equalsButton.addEventListener("click", (e) => {
    const expressionHasLeftOperand =
      new GetOperandCommand(calculator, "left") !== null;

    const expressionHasRightOperand =
      new GetOperandCommand(calculator, "right") !== null;

    const expressionOperator = new GetOperatorCommand(calculator);

    const { CurrentCommand } = calculator;

    if (
      expressionHasLeftOperand &&
      expressionHasRightOperand &&
      expressionOperator &&
      CurrentCommand
    ) {
      if (new CurrentCommand(calculator).execute()) {
        console.log("called");
        updateDisplay();
      }
    }
  });
}

function initAllDoubleOperandOperations() {
  initDoubleOperandOperation(DoubleOperandOperations.Add, AddCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Subtract, SubtractCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Multiply, MultiplyCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Divide, DivideCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Yroot, RootCommand);

  initDoubleOperandOperation(DoubleOperandOperations.Power, PowerCommand);
}

function initDoubleOperandOperation(
  selector: DoubleOperandOperations,
  Command: CommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = rightOperand !== null;

    const expressionHasOperator = !!new GetOperatorCommand(
      calculator
    ).execute();

    const receivedOperator = target.dataset.operator;

    const canAssignOperator = isOperatorAssignable(receivedOperator);

    if (expressionHasLeftOperand) {
      // If there's no right operand and operator, save input to operator
      if (!expressionHasRightOperand && !expressionHasOperator) {
        canAssignOperator &&
          new SetOperatorCommand(calculator, receivedOperator).execute();
        updateDisplay();

        calculator.CurrentCommand = Command;

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }

      // If there's operator, no right operand and the input operator is subtract,
      // Then make sure it will be saved as negative and display minus
      if (
        expressionHasOperator &&
        !expressionHasRightOperand &&
        !rightOperand &&
        receivedOperator === Operator.Subtract
      ) {
        calculator.shouldChangeNextOperatorSign = true;

        updateDisplay();
        appendDisplay(OperatorCharacters.Subtract);

        console.log("left: " + calculator.getOperand("left"));
        console.log("operator: " + calculator.getOperator());
        console.log("right: " + calculator.getOperand("right"));

        return;
      }
    }

    // If there's no left and the input is minus,
    // then make sure the left operand will be saved as negative and display minus
    if (!expressionHasLeftOperand) {
      if (receivedOperator === Operator.Subtract) {
        calculator.shouldChangeNextOperatorSign = true;

        updateDisplay();
        appendDisplay(OperatorCharacters.Subtract);

        return;
      }
    }

    // If there are both operands and the operator, calculate the value and display it
    if (
      expressionHasLeftOperand &&
      expressionHasOperator &&
      expressionHasRightOperand
    ) {
      if (new Command(calculator).execute()) {
        canAssignOperator &&
          new SetOperatorCommand(calculator, receivedOperator).execute();
        updateDisplay();
      }
    }
  });
}

function initAllImmediateOperations() {
  // These operations are immediately executed on the operand
  // once the corresponding button is clicked

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

function initImmediateOperation(
  selector: ImmediateOperations,
  Command: ImmediateCommandConstructor
) {
  const btn = document.querySelector(selector) as HTMLButtonElement;

  btn.addEventListener("click", (e) => {
    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = rightOperand !== null;

    const expressionHasOperator = !!new GetOperatorCommand(
      calculator
    ).execute();

    if (expressionHasLeftOperand && !expressionHasOperator) {
      // expression: "2", command is applied to "2"
      new Command(calculator, "left").execute();
      updateDisplay();
    }

    // expression: "2 + 4", command is applied to "4"
    if (
      expressionHasLeftOperand &&
      expressionHasOperator &&
      expressionHasRightOperand
    ) {
      new Command(calculator, "right").execute();
      updateDisplay();
    }
  });
}

function initMemoryOperations() {
  const memoryPlus = document.querySelector(".js-m-plus") as HTMLButtonElement;
  const memoryMinus = document.querySelector(
    ".js-m-minus"
  ) as HTMLButtonElement;
  const memoryClear = document.querySelector(".js-mc") as HTMLButtonElement;
  const memoryRecall = document.querySelector(".js-mr") as HTMLButtonElement;

  memoryPlus.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Add)
  );
  memoryPlus.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Subtract)
  );

  memoryClear.addEventListener(
    "click",
    handleMemoryUpdate.bind(null, MemoryUpdateOperation.Clear)
  );

  function handleMemoryUpdate(
    updateOperation: MemoryUpdateOperation,
    e: MouseEvent
  ) {
    // Used for handling adding to and subtracting from the memory
    const target = e.target as HTMLButtonElement;

    // Left -> save

    const leftOperand = new GetOperandCommand(calculator, "left").execute();
    const rightOperand = new GetOperandCommand(calculator, "right").execute();
    const operator = new GetOperatorCommand(calculator);

    const expressionHasLeftOperand = leftOperand !== null;
    const expressionHasRightOperand = leftOperand !== null;

    let updateValue;

    // Only left operand is entered, no operator after it. E.g. "5"
    if (expressionHasLeftOperand && !operator) {
      // Use left operand for updating memory
      updateValue = leftOperand;
    }

    // Full expression is entered
    if (expressionHasLeftOperand && operator && expressionHasRightOperand) {
      // Operate on both operands, save their result to memory
      // updateValue = new OperateCommand(calculator).execute();
    }

    if (!updateValue) {
      return;
    }
  }
}

function isOperatorAssignable(
  arg: string | undefined | null
): arg is Operator | null {
  if (arg === undefined) {
    return false;
  }

  if (
    arg === null ||
    Object.values(Operator).includes(arg as unknown as Operator)
  ) {
    return true;
  }

  return false;
}
