import fetchMock from "fetch-mock";
import { AnyAction } from "redux";

import { Actions, reduce, select, State } from "./FetchManagerRedux";
import { FetchStatus } from "./FetchRedux";
import { createStore, ThunkStore } from "./utils/redux";

describe("FetchManagerRedux", () => {
  const someUrl = "some-url";
  const someResult = { some: "result" };

  let reduxStore: ThunkStore<State, AnyAction>;
  beforeEach(() => {
    reduxStore = createStore(reduce);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("gives NotStarted status before starting", () => {
    expect(select(reduxStore.getState(), someUrl)).toEqual({
      status: FetchStatus.NotStarted,
    });
  });

  it("manages successful fetch", (done) => {
    fetchMock.mock(someUrl, someResult);

    const fetchPromise = reduxStore.dispatch(Actions.fetch(someUrl));
    expect(select(reduxStore.getState(), someUrl)).toEqual({
      status: FetchStatus.Started,
      data: undefined,
      error: undefined,
    });

    fetchPromise
      .then((result) => {
        expect(select(reduxStore.getState(), someUrl)).toEqual({
          status: FetchStatus.Completed,
          data: someResult,
          error: undefined,
        });
        expect(result).toEqual(someResult);
      })
      .catch((reason) => fail(reason))
      .finally(done);
  });

  it("manages fetch with not ok status", (done) => {
    fetchMock.mock(someUrl, 500);

    const fetchPromise = reduxStore.dispatch(Actions.fetch(someUrl));
    expect(select(reduxStore.getState(), someUrl)).toEqual({
      status: FetchStatus.Started,
      data: undefined,
      error: undefined,
    });

    fetchPromise
      .then(
        (result) => {
          fail(`Unexpected promise resolution with result: ${result}`);
        },
        () => {
          expect(select(reduxStore.getState(), someUrl)).toEqual({
            status: FetchStatus.Error,
            data: undefined,
            error: {
              code: 500,
              message: "Internal Server Error",
            },
          });
        },
      )
      .catch((reason) => fail(reason))
      .finally(done);
  });

  it("manages failed fetch", (done) => {
    const rejectReason = "reasons";
    fetchMock.mock(someUrl, Promise.reject(rejectReason));

    const fetchPromise = reduxStore.dispatch(Actions.fetch(someUrl));
    expect(select(reduxStore.getState(), someUrl)).toEqual({
      status: FetchStatus.Started,
      data: undefined,
      error: undefined,
    });

    fetchPromise
      .then(
        (result) => {
          fail(`Unexpected promise resolution with result: ${result}`);
        },
        () => {
          expect(select(reduxStore.getState(), someUrl)).toEqual({
            status: FetchStatus.Error,
            data: undefined,
            error: {
              code: 0,
              message: rejectReason,
            },
          });
        },
      )
      .catch((reason) => fail(reason))
      .finally(done);
  });
});
