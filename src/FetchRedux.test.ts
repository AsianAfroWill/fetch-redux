import { Actions, FetchStatus, reduce } from "./FetchRedux";
import RestStatus from "./RestStatus";

describe("FetchRedux", () => {
  const someUrl = "some-url";
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
        expect(reduce(initialState, Actions.start(someUrl))).toEqual({
          status: FetchStatus.Started,
        });
      });

      it("throws on complete action", () => {
        expect(() =>
          reduce(initialState, Actions.complete(someUrl, {})),
        ).toThrow();
      });

      it("throws on error action", () => {
        expect(() =>
          reduce(initialState, Actions.error(someUrl, someError)),
        ).toThrow();
      });
    });

    describe("started state", () => {
      const startedState = {
        status: FetchStatus.Started,
        data: undefined,
        error: undefined,
      };

      it("throws on start action", () => {
        expect(() => reduce(startedState, Actions.start(someUrl))).toThrow();
      });

      it("reduces complete action to completed state", () => {
        const data = {};
        expect(reduce(startedState, Actions.complete(someUrl, data))).toEqual({
          status: FetchStatus.Completed,
          data,
        });
      });

      it("reduces error action to error state", () => {
        expect(reduce(startedState, Actions.error(someUrl, someError))).toEqual(
          {
            status: FetchStatus.Error,
            data: startedState.data,
            error: someError,
          },
        );
      });
    });

    describe("completed state", () => {
      const completedState = {
        status: FetchStatus.Completed,
        data: {},
        error: undefined,
      };

      it("reduces start action to started state", () => {
        expect(reduce(completedState, Actions.start(someUrl))).toEqual({
          status: FetchStatus.Started,
          data: completedState.data,
        });
      });

      it("throws on complete action", () => {
        expect(() =>
          reduce(completedState, Actions.complete(someUrl, {})),
        ).toThrow();
      });

      it("throws on error action", () => {
        expect(() =>
          reduce(completedState, Actions.error(someUrl, someError)),
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
        expect(reduce(errorState, Actions.start(someUrl))).toEqual({
          status: FetchStatus.Started,
          data: errorState.data,
          error: undefined,
        });
      });

      it("throws on complete action", () => {
        expect(() =>
          reduce(errorState, Actions.complete(someUrl, {})),
        ).toThrow();
      });

      it("throws on error action", () => {
        expect(() =>
          reduce(errorState, Actions.error(someUrl, someError)),
        ).toThrow();
      });
    });
  });
});
