/**
 * Creates an object composed of keys generated from the results of accessing
 * each element of collection through `key`. The order of grouped values is
 * determined by the order they occur in collection. The corresponding value of
 * each key is an array of elements responsible for generating the key.
 * @example
 * const persons = [{id: 1, name: 'Jack'}, {id: 2, name: 'Jane'}, {id: 3, name: 'Jack'}]
 * const groupedByName = groupBy(persons, 'name')
 * console.log(groupedByName) // { Jack: [{id: 1, name: 'Jack'}, {id: 3, name: 'Jack'}], Jane: [{id: 2, name: 'Jane'}] }
 * @param array collection to do the grouping on
 * @param key a property key of an entry in the `array` collection to group under
 */
export function groupBy<T extends any, K extends keyof T>(
  array: T[],
  key: K,
): Record<T[K], T[]> {
  return array.reduce(
    (objectsByKeyValue: Record<T[K], T[]>, obj: T) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    },
    {} as Record<T[K], T[]>,
  );
}
