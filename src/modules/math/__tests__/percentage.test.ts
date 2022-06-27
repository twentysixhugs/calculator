import { percentage } from "../percentage";

it("0% = 0", () => {
  expect(percentage(0)).toBe(0);
});

it("100% = 1", () => {
  expect(percentage(100)).toBe(1);
});

it("50% = 0.5", () => {
  expect(percentage(50)).toBe(0.5);
});

it("150% = 1.5", () => {
  expect(percentage(150)).toBe(1.5);
});

it("-150% = -1.5", () => {
  expect(percentage(-150)).toBe(-1.5);
});
