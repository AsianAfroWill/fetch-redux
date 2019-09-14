import { Actions, FetchStatus, reducer } from "./FetchRedux";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: FetchStatus.NotStarted,
    };

    it("initializes", () => {
      expect(reducer(undefined, { type: "" as any })).toEqual(initialState);
    });

    describe("not started state", () => {
      it("reduces start action to started state", () => {
        expect(reducer(initialState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws if reducing complete action", () => {
        expect(() => reducer(initialState, Actions.complete())).toThrow();
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
      };

      it("throws on start action", () => {
        expect(() => reducer(startedState, Actions.start())).toThrow();
      });

      it("reduces complete action to completed state", () => {
        expect(reducer(startedState, Actions.complete())).toEqual({
          status: FetchStatus.Completed,
        });
      });
    });

    describe("completed state", () => {
      const completedState = {
        status: FetchStatus.Completed,
      };

      it("reduces start action to started state", () => {
        expect(reducer(completedState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws on complete action", () => {
        expect(() => reducer(completedState, Actions.complete())).toThrow();
      });
    });
  });
});
