import { createAction } from "./redux";

describe("redux", () => {
  it("generates an identity action", () => {
    expect(createAction("someAction")).toEqual({ type: "someAction" });
  });
});
