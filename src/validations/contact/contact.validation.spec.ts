import { contactValidation } from "./contact.validation";

describe("ContactValidation", () => {
  it("should validate firstname", () => {
    const input = "test";
    expect(contactValidation.firstName?.(input)).toBeTruthy();

    const input2 = "te";
    expect(contactValidation.firstName?.(input2)).toBe(
      "Should be at-least 3 - 15 characters"
    );

    const input3 = "james james james";
    expect(contactValidation.firstName?.(input3)).toBe(
      "Should be at-least 3 - 15 characters"
    );
  });

  it("should validate lastName", () => {
    const input = "test";
    expect(contactValidation.lastName?.(input)).toBeTruthy();

    const input2 = "te";
    expect(contactValidation.lastName?.(input2)).toBe(
      "Should be at-least 3 - 15 characters"
    );

    const input3 = "james james james";
    expect(contactValidation.lastName?.(input3)).toBe(
      "Should be at-least 3 - 15 characters"
    );
  });

  it("should validate job", () => {
    const input = "test";
    expect(contactValidation.job?.(input)).toBeTruthy();

    const input2 = "te";
    expect(contactValidation.job?.(input2)).toBe(
      "Should be at-least 3 - 25 characters"
    );

    const input3 = "software engineer software engineer software engineer";
    expect(contactValidation.job?.(input3)).toBe(
      "Should be at-least 3 - 25 characters"
    );
  });

  it("should validate description", () => {
    const input = "test";
    expect(contactValidation.description?.(input)).toBeTruthy();

    const input2 = "te";
    expect(contactValidation.description?.(input2)).toBe(
      "Should be at-least 3 - 40 characters"
    );

    const input3 = "software engineer software engineer software engineer";
    expect(contactValidation.description?.(input3)).toBe(
      "Should be at-least 3 - 40 characters"
    );
  });
});
