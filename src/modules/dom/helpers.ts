import { CalculationError, Operator } from "../constants";

export function isOperatorAssignable(
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

type CalculationErrorType = Error & {
  message: CalculationError;
};

export function isCalculationError(arg: unknown): arg is CalculationErrorType {
  if (
    arg &&
    typeof arg === "object" &&
    "name" in arg &&
    "message" in arg &&
    Object.values(CalculationError).includes(
      (arg as Error).message as unknown as CalculationError
    )
  ) {
    return true;
  }

  return false;
}
