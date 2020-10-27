/**
 * A utility to pluck a select set of properties from an object.
 * The function will try to populate a new object with the specified properties from the
 * specified object. Properties with falsy values are ignored.
 *
 *
 * @example
 * type T = { a: string };
 * const obj = { a: 'foo', b: 'bar' };
 * pluckObject<T>({ a: 'foo', b: 'bar' }, [ 'a' ]) // { a: 'foo' }
 * pluckObject<T>({ a: '', b: 'bar' }, [ 'a' ]) // { } as a is falsy
 *
 * @param obj object to pluck from
 * @param propertyNames properties to pluck
 */
export const pluckObject = <T extends {}>(
  obj: Partial<T>,
  propertyNames: (keyof T)[],
): Partial<T> => {
  const plucked: Partial<T> = {};

  propertyNames.forEach((key) => {
    if (!!obj[key]) {
      plucked[key] = obj[key];
    }
  });

  return plucked;
};
