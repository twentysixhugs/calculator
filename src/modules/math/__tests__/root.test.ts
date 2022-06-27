import { root } from "../root";

it("sqrt(4) = 2", () => {
  expect(root(4, 2)).toBe(2);
});

it("27 yroot 3 = 3", () => {
  expect(root(27, 3)).toBe(3);
});

it("2 yroot 5 ~= 1.148", () => {
  expect(root(2, 5)).toBeCloseTo(1.149, 3);
});
