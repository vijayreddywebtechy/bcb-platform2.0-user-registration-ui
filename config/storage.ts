/**
 * Storage keys used for persistence across the application.
 * Centralized list to avoid magic strings and typos in local/session storage calls.
 */
export const STORAGE_KEYS = {
    CUSTOMER_PROFILE: "customer_profile",
    USER_INFO: "user_info",
} as const;
