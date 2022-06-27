import { reciprocal } from "../reciprocal";

it("1 / 10 = 0.1", () => {
  expect(reciprocal(10)).toBe(0.1);
});

it("1 / 0 = Infinity", () => {
  expect(reciprocal(0)).toBe(Infinity);
});

it("1 / -2 = -0.5", () => {
  expect(reciprocal(-2)).toBe(-0.5);
});
