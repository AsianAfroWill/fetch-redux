import { Actions, FetchStatus, reduce } from "./FetchRedux";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: FetchStatus.NotStarted,
    };

    it("initializes", () => {
      expect(reduce(undefined, { type: "" as any })).toEqual(initialState);
    });

    describe("not started state", () => {
      it("reduces start action to started state", () => {
        expect(reduce(initialState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws if reducing complete action", () => {
        expect(() => reduce(initialState, Actions.complete())).toThrow();
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
      };

      it("throws on start action", () => {
        expect(() => reduce(startedState, Actions.start())).toThrow();
      });

      it("reduces complete action to completed state", () => {
        expect(reduce(startedState, Actions.complete())).toEqual({
          status: FetchStatus.Completed,
        });
      });
    });

    describe("completed state", () => {
      const completedState = {
        status: FetchStatus.Completed,
      };

      it("reduces start action to started state", () => {
        expect(reduce(completedState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws on complete action", () => {
        expect(() => reduce(completedState, Actions.complete())).toThrow();
      });
    });
  });
});
