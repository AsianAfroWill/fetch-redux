import { Action as ReduxAction } from "redux";

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
