import { createAction } from "./redux";

describe("redux", () => {
  it("generates an identity action", () => {
    expect(createAction("someAction")).toEqual({ type: "someAction" });
  });

  it("generates an action with payload", () => {
    const data = { some: "data" };
    expect(createAction("someType", data)).toEqual({
      type: "someType",
      payload: data,
    });
  });
});
