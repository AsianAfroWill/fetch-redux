import { Reducer } from "redux";

import { assert } from "./utils/debug";
import { Action, createAction } from "./utils/redux";

export enum FetchStatus {
  NotStarted,
  Started,
  Completed,
}

interface State<D> {
  status: FetchStatus;
  data: D | undefined;
}

export enum ActionType {
  Start = "start",
  Complete = "complete",
}

export class Actions {
  public static start(): Action<ActionType.Start> {
    return createAction(ActionType.Start);
  }

  public static complete<D>(data: D): Action<ActionType.Complete, { data: D }> {
    return createAction(ActionType.Complete, { data });
  }
}

type FetchReducer<D = any> = Reducer<State<D>, Action<ActionType, D>>;
export const reduce: FetchReducer = (state, action) => {
  if (!state) {
    return { status: FetchStatus.NotStarted, data: undefined };
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
      };

    case ActionType.Complete:
      assert(
        state.status === FetchStatus.Started,
        "can only complete fetch after started",
      );
      return {
        ...state,
        status: FetchStatus.Completed,
        data: action.payload.data,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
