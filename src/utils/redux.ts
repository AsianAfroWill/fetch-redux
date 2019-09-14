import { Action } from "redux";

/**
 *
 * @param actionType
 * @returns Identity action of type @param actionType.
 */
export const action = <T extends string>(actionType: T): Action<T> => ({
  type: actionType,
});
