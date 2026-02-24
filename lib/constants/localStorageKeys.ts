/**
 * Central registry of all localStorage keys used in the application.
 * Every localStorage read/write must use a key from this object — no raw strings.
 */
export const LocalStorageKeys = {
  // ── Auth / OIDC ────────────────────────────────────────────────────────────
  /** PKCE state parameter stored before Ping redirect; validated on callback */
  PING_OAUTH_STATE: 'bcb.ping.oauth_state',
  /** PKCE code_verifier stored before Ping redirect; used in token exchange */
  PING_CODE_VERIFIER: 'bcb.ping.code_verifier',
  /** Ping access token (use only when HTTP-only cookie is unavailable) */
  PING_ACCESS_TOKEN: 'bcb.ping.access_token',
  /** Ping id_token for user identity claims */
  PING_ID_TOKEN: 'bcb.ping.id_token',
  /** Timestamp (ms) when the access token expires */
  TOKEN_EXPIRES_AT: 'bcb.auth.token_expires_at',

  // ── OTP ────────────────────────────────────────────────────────────────────
  /** Masked mobile/email shown on OTP screen, e.g. "******4280" */
  OTP_MASKED_DESTINATION: 'bcb.otp.masked_destination',
  /** System reference number returned by OTP Basic Auth */
  OTP_REFERENCE_NUMBER: 'bcb.otp.reference_number',

  // ── Registration / Multi-step form ─────────────────────────────────────────
  /** Current active step index in the registration wizard */
  REGISTRATION_STEP: 'bcb.registration.current_step',
  /** Accumulated partial form data across registration steps */
  REGISTRATION_FORM_DATA: 'bcb.registration.form_data',
  /** Application number assigned at pre-application screen */
  APPLICATION_NUMBER: 'bcb.registration.application_number',
  /** Customer GUID returned by BCB after pre-application */
  CUSTOMER_GUID: 'bcb.registration.customer_guid',

  // ── User Profile ───────────────────────────────────────────────────────────
  /** Serialised user profile from Ping id_token claims */
  USER_PROFILE: 'bcb.user.profile',

  // ── UI Preferences ─────────────────────────────────────────────────────────
  /** User's preferred language code, e.g. "en" */
  PREFERRED_LANGUAGE: 'bcb.ui.preferred_language',
} as const;

export type LocalStorageKey = typeof LocalStorageKeys[keyof typeof LocalStorageKeys];
