import { Reducer } from "redux";

import RestStatus from "./RestStatus";
import { assert } from "./utils/debug";
import { Action, createAction } from "./utils/redux";

export enum FetchStatus {
  NotStarted,
  Started,
  Completed,
  Error,
}

interface State<D> {
  status: FetchStatus;
  data: D | undefined;
  error: RestStatus | undefined;
}

export enum ActionType {
  Start = "start",
  Complete = "complete",
  Error = "error",
}

export class Actions {
  public static start(url: string): Action<ActionType.Start, { url: string }> {
    return createAction(ActionType.Start, { url });
  }

  public static complete<D>(
    url: string,
    data: D,
  ): Action<ActionType.Complete, { url: string; data: D }> {
    return createAction(ActionType.Complete, { url, data });
  }

  public static error(
    url: string,
    error: RestStatus,
  ): Action<ActionType.Error, { url: string; error: RestStatus }> {
    return createAction(ActionType.Error, { url, error });
  }
}

const initialState = {
  status: FetchStatus.NotStarted,
  data: undefined,
  error: undefined,
};

type FetchReducer<D = any> = Reducer<State<D>, Action<ActionType, D>>;
export const reduce: FetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Start:
      assert(
        state.status !== FetchStatus.Started,
        "fetch already started, cannot start again",
      );
      return {
        ...state,
        status: FetchStatus.Started,
        error: undefined,
      };

    case ActionType.Complete:
      assert(
        state.status === FetchStatus.Started,
        "can only complete while fetch in progress",
      );
      return {
        ...state,
        status: FetchStatus.Completed,
        data: action.payload.data,
      };

    case ActionType.Error:
      assert(
        state.status === FetchStatus.Started,
        "can only error while fetch in progress",
      );
      return {
        ...state,
        status: FetchStatus.Error,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
