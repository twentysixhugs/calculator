export enum Operator {
  Add = "Add",
  Subtract = "Subtract",
  Multiply = "Multiply",
  Divide = "Divide",
  Yroot = "Yroot",
  Power = "Power",
}

export enum OperatorCharacters {
  Add = "\u002B",
  Subtract = "\u2212",
  SubtractJSConverted = "-",
  Multiply = "\u00d7",
  Divide = "\u002F",
  Yroot = " yroot ",
  Power = "^",
}

export enum DoubleOperandOperations {
  Add = "[data-operation='Add']",
  Subtract = "[data-operation='Subtract']",
  Multiply = "[data-operation='Multiply']",
  Divide = "[data-operation='Divide']",
  Yroot = "[data-operation='Yroot']",
  Power = "[data-operation='Power']",
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

export enum MemoryOperation {
  Add = ".js-m-plus",
  Subtract = ".js-m-minus",
  Clear = ".js-mc",
  Recall = ".js-mr",
}

export enum CalculationError {
  DivisionByZero = "Error: Division by zero",
  OutOfRange = "Error: Expression is out of range",
  RootOfNegativeNumber = "Error: Root of negative number",
}
