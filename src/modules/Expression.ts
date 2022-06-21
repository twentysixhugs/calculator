import { IExpression } from "./interfaces/Expression.interface";

export class Expression implements IExpression {
  _left = 0;
  _right = null;
  _operator = null;

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get operator() {
    return this._operator;
  }

  set left(value) {
    this._left = value;
  }

  set right(value) {
    this._right = value;
  }

  set operator(value) {
    this._operator = value;
  }
}
