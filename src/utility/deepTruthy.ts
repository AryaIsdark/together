/**
 * A simple helper that will recursively walk an objects properties and report
 * the object as truthy if any of the properties values evaluate as truthy.
 *
 * Empty object and empty array is **not** considered truthy like normal js.
 *
 * @example
 * const foo = { a: '', b: null };
 * deepTruthy(foo) // false
 *
 * const bar = { a: '', b: {} };
 * deepTruthy(bar) // false (empty object is truthy, but since it has no properties we don't consider it truthy)
 *
 * const baz = { a: '', b: { c: '' } };
 * deepTruthy(baz) // false
 *
 * const qux = { a: '', b: { c: 'qaz' } };
 * deepTruthy(qux) // true
 * @param obj object to recursively check if it contains truthy values
 */
export const deepTruthy = (obj: object): boolean => {
  if (obj === null || obj === undefined) {
    return false;
  }

  const values = Object.values(obj);
  if (values.length === 0) {
    return false;
  }

  return values.some((value) => {
    if (typeof value === 'object') {
      return deepTruthy(value);
    }
    return !!value;
  });
};
