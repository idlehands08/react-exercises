import { render, screen } from "@testing-library/react";
import App, { generateRandomNumber, isUnique, isInteger } from "./App";

describe("Function should generate a random 4 digit number", () => {
  it("Function for generating random number", () => {
    expect(generateRandomNumber()).not.toBe(null);
  });
  it("Each digit should be unique", () => {
    expect(isUnique(generateRandomNumber())).toBe(true);
    expect(isUnique(1551)).toBe(false);
  });
});

describe("Function should check if value contains all integers", () => {
  it("Should only contain all positive integers", () => {
    expect(isInteger(generateRandomNumber())).toBe(true);
    expect(isInteger("x123")).toBe(false);
  });
});
