import hasFeature, { FeatureFlag } from './hasFeature';

describe('src/utility/hasFeature', () => {
  afterEach(() => {
    delete process.env.REACT_APP_FEATURE_TEST_VALUE;
  });

  it('will return false if a feature is not set for the environment', () => {
    expect(hasFeature('SOME_CRAZY_UNDEFINED_VALUE' as FeatureFlag)).toBe(false);
  });

  it('will return whether or not a feature is enabled', () => {
    process.env.REACT_APP_FEATURE_TEST_VALUE = 'false';
    expect(hasFeature('TEST_VALUE' as FeatureFlag)).toBe(false);

    process.env.REACT_APP_FEATURE_TEST_VALUE = 'true';
    expect(hasFeature('TEST_VALUE' as FeatureFlag)).toBe(true);
  });
});
