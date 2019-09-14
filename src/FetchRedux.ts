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
  public static start(): Action<ActionType.Start> {
    return createAction(ActionType.Start);
  }

  public static complete<D>(data: D): Action<ActionType.Complete, { data: D }> {
    return createAction(ActionType.Complete, { data });
  }

  public static error(
    error: RestStatus,
  ): Action<ActionType.Error, { error: RestStatus }> {
    return createAction(ActionType.Error, { error });
  }
}

type FetchReducer<D = any> = Reducer<State<D>, Action<ActionType, D>>;
export const reduce: FetchReducer = (state, action) => {
  if (!state) {
    return {
      status: FetchStatus.NotStarted,
      data: undefined,
      error: undefined,
    };
  }
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
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
