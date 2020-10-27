import { pluckObject } from './pluckObject';

describe('pluckObject', () => {
  interface TestType {
    a: string;
  }

  it('returns object containing specified fields', () => {
    const obj: any = { a: 'foo', b: 'bar' };
    expect(pluckObject<TestType>(obj, ['a'])).toStrictEqual({ a: 'foo' });
  });

  it('excludes falsy values', () => {
    const obj: any = { a: '', b: 'bar' };
    expect(pluckObject<TestType>(obj, ['a'])).toStrictEqual({});
  });
});
