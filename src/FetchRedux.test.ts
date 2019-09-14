import { Actions, ApiState, reducer } from "./FetchRedux";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: ApiState.NotStarted,
    };

    it("initializes", () => {
      expect(reducer(undefined, { type: "" as any })).toEqual(initialState);
    });

    describe("initial state", () => {
      it("reduces start action to started state", () => {
        expect(reducer(initialState, Actions.start())).toEqual({
          status: ApiState.Started,
        });
      });
    });

    describe("started state", () => {
      const startedState = {
        status: ApiState.Started,
      };

      it("throws on start action", () => {
        expect(() => reducer(startedState, Actions.start())).toThrow();
      });
    });
  });
});
