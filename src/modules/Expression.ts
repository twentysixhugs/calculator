import { IExpression } from "./interfaces/Expression.interface";

export class Expression implements IExpression {
  public left = 0;
  public right = null;
  public operator = null;
}
