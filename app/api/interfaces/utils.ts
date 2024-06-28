/**
 * Data formatter function
 * @returns
 */
export const dataFormatter = function (...args: any[]) {
  return args.reduce(pushObjectOrValue, []);
};

const pushObjectOrValue = (
  resultArray: any[],
  element: Record<string, any> | string | number | symbol
) =>
  typeof element === "object"
    ? [...resultArray, ...Object.values(element)]
    : [...resultArray, element];
