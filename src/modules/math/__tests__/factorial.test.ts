import { factorial } from "../factorial";

it("0! = 1", () => {
  expect(factorial(0)).toBe(1);
});

it("1! = 1", () => {
  expect(factorial(1)).toBe(1);
});

it("3! = 6", () => {
  expect(factorial(3)).toBe(6);
});

it("-3! = -6", () => {
  expect(factorial(-3)).toBe(-6);
});
