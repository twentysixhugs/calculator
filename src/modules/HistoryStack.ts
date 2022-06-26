import { IHistoryStack } from "./interfaces/HistoryStack.interface";

export class HistoryStack<T> implements IHistoryStack<T> {
  private items: T[] = [];

  constructor(private capacity = 0) {}

  push(item: T) {
    if (this.size() === this.capacity) {
      this.items.shift();
    }

    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.size() - 1];
  }

  size() {
    return this.items.length;
  }
}
