import { Actions, FetchStatus, reduce } from "./FetchRedux";
import RestStatus from "./RestStatus";

describe("FetchRedux", () => {
  describe("reducer", () => {
    const initialState = {
      status: FetchStatus.NotStarted,
      data: undefined,
      error: undefined,
    };

    const someError: RestStatus = {
      code: 400,
      message: "Some error",
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

      it("throws on complete action", () => {
        expect(() => reduce(initialState, Actions.complete({}))).toThrow();
      });

      it("throws on error action", () => {
        expect(() => reduce(initialState, Actions.error(someError))).toThrow();
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
        data: undefined,
        error: undefined,
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

      it("reduces error action to error state", () => {
        expect(reduce(startedState, Actions.error(someError))).toEqual({
          status: FetchStatus.Error,
          data: startedState.data,
          error: someError,
        });
      });
    });

    describe("completed state", () => {
      const completedState = {
        status: FetchStatus.Completed,
        data: {},
        error: undefined,
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

      it("throws on error action", () => {
        expect(() =>
          reduce(completedState, Actions.error(someError)),
        ).toThrow();
      });
    });

    describe("error state", () => {
      const errorState = {
        status: FetchStatus.Error,
        data: {},
        error: {
          code: 403,
          message: "Forbidden",
        },
      };

      it("reduces start action to started state", () => {
        expect(reduce(errorState, Actions.start())).toEqual({
          status: FetchStatus.Started,
          data: errorState.data,
          error: undefined,
        });
      });

      it("throws on complete action", () => {
        expect(() => reduce(errorState, Actions.complete({}))).toThrow();
      });

      it("throws on error action", () => {
        expect(() => reduce(errorState, Actions.error(someError))).toThrow();
      });
    });
  });
});
