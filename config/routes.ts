/**
 * Centralized route constants.
 * Use these instead of hardcoding strings in Link or router.push calls.
 */
export const ROUTES = {
  // Public / Auth
  HOME: "/",
  SIGN_IN: "/signin",
  REGISTER: "/register",
  INVITE: "/invite",
  OTP: "/otp",
  TERMS: "/terms",
  SCAN_QR: "/scan-qr-code",

  // Onboarding / Registration flow
  IDENTITY_VERIFICATION: "/identity-verification",
  BUSINESS_PROFILES: "/business-profiles",
  BUSINESS_LINKING: "/business-linking",
  DOCUMENTS: "/documents",

  // Authenticated App
  DASHBOARD: "/dashboard",
  ACCOUNTS: "/accounts",
  MANAGE_PROFILE: "/manage-profile",
  QUERY_TRACKER: "/query-tracker",
  ROLES_AND_PERMISSIONS: "/roles-and-permissions",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
