import { subtract } from "../subtract";

it("2 - 3 = -1", () => {
  expect(subtract(2, 3)).toBe(-1);
});

it("2 - - 3 = 5", () => {
  expect(subtract(2, -3)).toBe(5);
});

it("0 - 0 = 0", () => {
  expect(subtract(0, 0)).toBe(0);
});
