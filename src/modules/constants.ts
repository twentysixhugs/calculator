export enum Operator {
  Add = "Add",
  Subtract = "Subtract",
  Multiply = "Multiply",
  Divide = "Divide",
}

export enum OperatorCharacters {
  Add = "\u002B",
  Subtract = "\u2212",
  Multiply = "\u00d7",
  Divide = "\u002F",
}

export enum ImmediateOperations {
  // Each member has a corresponding HTML data-operation attribute
  TenPowerX = "[data-operation='10-power-x']",
  SquareRoot = "[data-operation='square-root']",
  CubicRoot = "[data-operation='cubicroot']",
  OneDividedByX = "[data-operation='1-divided-by-x']",
  Factorial = "[data-operation='factorial']",
  InvertSign = "[data-operation='invert-sign']",
  XPowerTwo = "[data-operation='x-power-2']",
  XPowerThree = "[data-operation='x-power-3']",
  Percentage = "[data-operation='percentage']",
}
