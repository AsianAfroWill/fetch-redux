export const assert = (assertion: boolean, message?: string) => {
  if (!assertion) {
    throw new Error(message);
  }
};
