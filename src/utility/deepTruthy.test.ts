import { deepTruthy } from 'utility/deepTruthy';

describe('deepTruthy', () => {
  describe('should return false when', () => {
    it('contains empty strings only', () => {
      const obj = {
        a: '',
        b: '',
      };
      expect(deepTruthy(obj)).toBeFalsy();
    });

    it('contains an empty nested object', () => {
      const obj = {
        a: {},
      };
      expect(deepTruthy(obj)).toBeFalsy();
    });

    it('contains an nested object with falsey value', () => {
      const obj = { a: { b: { c: '' } } };

      expect(deepTruthy(obj)).toBeFalsy();
    });

    it('contains empty array', () => {
      const obj = {
        a: [],
      };
      expect(deepTruthy(obj)).toBeFalsy();
    });

    it('is null', () => {
      const obj = null;
      expect(deepTruthy(obj as any)).toBeFalsy();
    });

    it('is undefined', () => {
      const obj = undefined;
      expect(deepTruthy(obj as any)).toBeFalsy();
    });
  });

  describe('should return true when', () => {
    it('contains a non-empty string', () => {
      const obj = {
        a: 'foo',
      };
      expect(deepTruthy(obj)).toBeTruthy();
    });

    it('contains a true boolean', () => {
      const obj = {
        a: true,
      };
      expect(deepTruthy(obj)).toBeTruthy();
    });

    it('contains a nested object with a non-empty string', () => {
      const obj = {
        a: {},
        b: {
          c: 'foo',
        },
      };

      expect(deepTruthy(obj)).toBeTruthy();
    });
  });
});
