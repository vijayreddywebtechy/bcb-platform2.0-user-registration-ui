/**
 * Storage keys used for persistence across the application.
 * Centralized list to avoid magic strings and typos in local/session storage calls.
 */
export const STORAGE_KEYS = {
    CUSTOMER_PROFILE: "customer_profile",
    USER_INFO: "user_info",
    PING_ACCESS_TOKEN: "ping_access_token",
    GATEWAY_ACCESS_TOKEN: "gateway_access_token",
    ACCOUNT_LIST: "account_list",
    SELECTED_COMPANY: "selectedCompany",
    USER_ROLES: "userRoles",
} as const;
