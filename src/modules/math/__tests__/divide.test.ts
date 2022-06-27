import { divide } from "../divide";

it("4 / 2 = 2", () => {
  expect(divide(4, 2)).toBe(2);
});

it("5 / 2 = 2.5", () => {
  expect(divide(5, 2)).toBe(2.5);
});

it("5 / -2 = -2.5", () => {
  expect(divide(5, -2)).toBe(-2.5);
});

it("5 / 0 = Infinity", () => {
  // Division by zero is handled by commands. Function behavior should not be affected
  expect(divide(5, 0)).toBe(Infinity);
});

it("5 / 0 = -Infinity", () => {
  // Division by zero is handled by commands. Function behavior should not be affected
  expect(divide(-5, 0)).toBe(-Infinity);
});
