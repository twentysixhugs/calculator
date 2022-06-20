import Calculator from "./Calculator";

export interface Command {
  execute(): void;
}

export class AddCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.add(this.arg);
  }
}

export class SubtractCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.subtract(this.arg);
  }
}

export class MultiplyCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.multiply(this.arg);
  }
}

export class DivideCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.divide(this.arg);
  }
}

export class ReciprocalCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.reciprocal();
  }
}

export class PercentageCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.percentage();
  }
}

export class RootCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.root(this.arg);
  }
}

export class PowerCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.power(this.arg);
  }
}

export class AddToMemoryCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.addCurrentValueToMemory();
  }
}

export class SubtractFromMemoryCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.subtractCurrentValueFromMemory();
  }
}

export class RecallFromMemoryCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.recallFromMemory();
  }
}

export class ClearMemoryCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.clearMemory();
  }
}

export class GetCurrentValueCommand implements Command {
  constructor(private receiver: Calculator) {
    this.receiver = receiver;
  }

  execute() {
    this.receiver.getCurrentValue();
  }
}

export class SetCurrentValueCommand implements Command {
  constructor(private receiver: Calculator, private arg: number) {
    this.receiver = receiver;
    this.arg = arg;
  }

  execute() {
    this.receiver.setCurrentValue(this.arg);
  }
}
