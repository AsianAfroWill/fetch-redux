import { Action } from "redux";

/**
 * Create an action with type.
 * @param actionType
 * @returns Identity action of type @param actionType.
 */
export const createAction = <T extends string>(actionType: T): Action<T> => ({
  type: actionType,
});
