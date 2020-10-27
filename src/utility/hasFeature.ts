export type FeatureFlag =
  | 'ADMIN_PANEL'
  | 'PAYMENT_V2'
  | 'FX_FILTER'
  | 'FEE_FILTER';

/**
 * Checks whether or not a feature is enabled for the current environment
 */
const hasFeature = (feature: FeatureFlag): boolean =>
  process.env[`REACT_APP_FEATURE_${feature}`] === 'true';

export default hasFeature;
