import {
  Action as ReduxAction,
  AnyAction,
  applyMiddleware,
  createStore as reduxCreateStore,
  Reducer,
  Store,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

export interface Action<T, P = undefined> extends ReduxAction<T> {
  payload: P | undefined;
}
/**
 * Create an action with type.
 * @param actionType
 * @returns Identity action of type @param actionType.
 */
export const createAction = <T extends string, P = any>(
  actionType: T,
  payload?: P,
): Action<T, P> => ({
  type: actionType,
  payload: payload || undefined,
});

export interface ThunkStore<S, A extends AnyAction> extends Store<S, A> {
  dispatch: ThunkDispatch<S, any, A>;
}

export const createStore = <S, A extends AnyAction>(
  reducer: Reducer<S, A>,
): ThunkStore<S, A> => reduxCreateStore(reducer, applyMiddleware(thunk));
