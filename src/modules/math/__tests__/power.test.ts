import { power } from "../power";

it("2 ^ 3 = 8", () => {
  expect(power(2, 3)).toBe(8);
});

it("2 ^ 0 = 1", () => {
  expect(power(2, 0)).toBe(1);
});

it("0 ^ 0 = 1", () => {
  expect(power(0, 0)).toBe(1);
});

it("0 ^ 2 = 0", () => {
  expect(power(0, 2)).toBe(0);
});

it("-5 ^ 2 = 25", () => {
  expect(power(-5, 2)).toBe(25);
});

it("-5 ^ 3 = -25", () => {
  expect(power(-5, 3)).toBe(-125);
});

it("2 ^ 5 = 32", () => {
  expect(power(2, 5)).toBe(32);
});
