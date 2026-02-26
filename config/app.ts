/**
 * Application-level constants.
 * Centralizes app name, version, and other global config values.
 */
export const APP_CONFIG = {
  name: "Business Hub",
  shortName: "BCB Platform",
  version: "2.0.0",
  bankName: "Standard Bank",
  supportEmail: "support@standardbank.co.za",
  legalEntity:
    "Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15.",
} as const;

/**
 * Feature flags – toggle features without code changes.
 * In the future, these can be pulled from a config service or env variables.
 */
export const FEATURE_FLAGS = {
  enableQRLogin: true,
  enableInviteFlow: true,
} as const;
