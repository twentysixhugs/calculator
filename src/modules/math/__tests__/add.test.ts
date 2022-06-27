import { add } from "../add";

it("2 + 3 = 5", () => {
  expect(add(2, 3)).toBe(5);
});

it("2 + - 3 = -1", () => {
  expect(add(2, -3)).toBe(-1);
});

it("0 + 0 = 0", () => {
  expect(add(0, 0)).toBe(0);
});
