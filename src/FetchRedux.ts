import { Action, ActionCreator, Reducer } from "redux";

import { assert } from "./utils/debug";
import { createAction } from "./utils/redux";

export enum FetchStatus {
  NotStarted,
  Started,
}

interface State {
  status: FetchStatus;
}

export enum ActionType {
  Start = "start",
}

export class Actions {
  public static start(): Action<ActionType.Start> {
    return createAction(ActionType.Start);
  }
}

export const reducer: Reducer<State, Action<ActionType>> = (state, action) => {
  if (!state) {
    return { status: FetchStatus.NotStarted };
  }
  switch (action.type) {
    case ActionType.Start:
      assert(
        state.status !== FetchStatus.Started,
        "API already started, cannot start again",
      );
      return {
        status: FetchStatus.Started,
      };
      break;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
