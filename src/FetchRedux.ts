import { Action, ActionCreator, Reducer } from "redux";

import { assert } from "./utils/debug";
import { createAction } from "./utils/redux";

export enum FetchStatus {
  NotStarted,
  Started,
  Completed,
}

interface State {
  status: FetchStatus;
}

export enum ActionType {
  Start = "start",
  Complete = "complete",
}

export class Actions {
  public static start(): Action<ActionType.Start> {
    return createAction(ActionType.Start);
  }

  public static complete(): Action<ActionType.Complete> {
    return createAction(ActionType.Complete);
  }
}

export const reduce: Reducer<State, Action<ActionType>> = (state, action) => {
  if (!state) {
    return { status: FetchStatus.NotStarted };
  }
  switch (action.type) {
    case ActionType.Start:
      assert(
        state.status !== FetchStatus.Started,
        "fetch already started, cannot start again",
      );
      return {
        status: FetchStatus.Started,
      };

    case ActionType.Complete:
      assert(
        state.status === FetchStatus.Started,
        "can only complete fetch after started",
      );
      return {
        status: FetchStatus.Completed,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
