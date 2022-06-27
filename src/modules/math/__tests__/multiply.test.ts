import { multiply } from "../multiply";

it("2 * 3 = 6", () => {
  expect(multiply(2, 3)).toBe(6);
});

it("2 * 0 = 0", () => {
  expect(multiply(2, 0)).toBe(0);
});

it("0 * 0 = 0", () => {
  expect(multiply(0, 0)).toBe(0);
});

it("-2 * 2 = -4", () => {
  expect(multiply(-2, 2)).toBe(-4);
});
