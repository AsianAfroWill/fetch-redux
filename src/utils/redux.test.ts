import { action } from "./redux";

describe("redux", () => {
  it("generates an identity action", () => {
    expect(action("someAction")).toEqual({ type: "someAction" });
  });
});
