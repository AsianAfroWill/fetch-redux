import { AnyAction, Dispatch } from "redux";

import {
  Actions as FetchActions,
  ActionType,
  FetchStatus,
  reduce as fetchReduce,
  State as FetchState,
} from "./FetchRedux";
import { Action } from "./utils/redux";

export class Actions {
  public static fetch = <T>(url: string) => (
    dispatch: Dispatch,
    getState: () => State,
  ) => {
    const fetchState = select(getState(), url);
    if (fetchState.status !== FetchStatus.Started) {
      dispatch(FetchActions.start(url));
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            dispatch(
              FetchActions.error(url, {
                code: response.status,
                message: response.statusText,
              }),
            );
            throw new Error(response.statusText);
          }
        })
        .then((json) => {
          dispatch(FetchActions.complete(url, json));
          return json;
        })
        .catch((reason) => {
          dispatch(FetchActions.error(url, { code: 0, message: reason }));
          throw reason;
        });
    }
  };
}

export interface State {
  [url: string]: FetchState<any>;
}

export const reduce = (state: State = {}, action: AnyAction) => {
  if (
    [ActionType.Start, ActionType.Complete, ActionType.Error].includes(
      action.type,
    )
  ) {
    const fetchAction = action as Action<ActionType, { url: string }>;
    const url = fetchAction.payload!.url;
    return {
      ...state,
      [url]: fetchReduce(state[url], fetchAction),
    };
  }
  return state;
};

export const select = (state: State, url: string): FetchState<any> => {
  const fetchState = state[url];
  return (
    fetchState || {
      status: FetchStatus.NotStarted,
      data: undefined,
      error: undefined,
    }
  );
};
