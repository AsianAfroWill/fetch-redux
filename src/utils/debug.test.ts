import { assert } from "./debug";

describe("debug", () => {
  describe("assert", () => {
    it("noops if assertion is true", () => {
      expect(() => assert(true, "messages")).not.toThrow();
    });

    it("throws with no message if assertion fails", () => {
      expect(() => assert(false)).toThrowError();
    });

    it("throws error with provided message if assertion fails", () => {
      expect(() => assert(false, "ABC")).toThrowError("ABC");
    });
  });
});
