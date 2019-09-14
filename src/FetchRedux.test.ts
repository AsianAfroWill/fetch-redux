import { Actions, FetchStatus, reducer } from "./FetchRedux";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: FetchStatus.NotStarted,
    };

    it("initializes", () => {
      expect(reducer(undefined, { type: "" as any })).toEqual(initialState);
    });

    describe("initial state", () => {
      it("reduces start action to started state", () => {
        expect(reducer(initialState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
      };

      it("throws on start action", () => {
        expect(() => reducer(startedState, Actions.start())).toThrow();
      });
    });
  });
});
