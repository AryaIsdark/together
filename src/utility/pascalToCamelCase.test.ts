import { pascalToCamelCase } from './pascalToCamelCase';

describe('src/utility/pascalToCamelCase', () => {
  const errorMessag = 'InvalidArgumentException';

  it('can convert a pascal case string to camel case string', () => {
    expect(pascalToCamelCase('TestStringOfManyTests')).toBe(
      'testStringOfManyTests',
    );
  });
  it('can convert a capital case string to lower case', () => {
    expect(pascalToCamelCase('Test')).toBe('test');
  });
  it('can handle empty strings', () => {
    expect(() => pascalToCamelCase('')).toThrowError(new Error(errorMessag));
  });
  it('can handle non-strings', () => {
    //@ts-ignore
    expect(() => pascalToCamelCase(1)).toThrowError(new Error(errorMessag));
    //@ts-ignore
    expect(() => pascalToCamelCase(1)).toThrowError(new Error(errorMessag));
    //@ts-ignore
    expect(() => pascalToCamelCase(1)).toThrowError(new Error(errorMessag));
  });
});
