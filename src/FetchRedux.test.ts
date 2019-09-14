import { Actions, FetchStatus, reduce } from "./FetchRedux";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: FetchStatus.NotStarted,
      data: undefined,
    };

    it("initializes", () => {
      expect(reduce(undefined, {} as any)).toEqual(initialState);
    });

    describe("not started state", () => {
      it("reduces start action to started state", () => {
        expect(reduce(initialState, Actions.start())).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws if reducing complete action", () => {
        expect(() => reduce(initialState, Actions.complete({}))).toThrow();
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
        data: undefined,
      };

      it("throws on start action", () => {
        expect(() => reduce(startedState, Actions.start())).toThrow();
      });

      it("reduces complete action to completed state", () => {
        const data = {};
        expect(reduce(startedState, Actions.complete(data))).toEqual({
          status: FetchStatus.Completed,
          data,
        });
      });
    });

    describe("completed state", () => {
      const completedState = {
        status: FetchStatus.Completed,
        data: {},
      };

      it("reduces start action to started state", () => {
        expect(reduce(completedState, Actions.start())).toEqual({
          status: FetchStatus.Started,
          data: completedState.data,
        });
      });

      it("throws on complete action", () => {
        expect(() => reduce(completedState, Actions.complete({}))).toThrow();
      });
    });
  });
});
