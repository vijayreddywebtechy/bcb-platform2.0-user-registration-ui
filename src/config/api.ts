/**
 * Centralized API URLs and Configuration
 * Avoids static dataset spread across services and API routes.
 */

export const API_CONFIG = {
    // Base endpoints
    baseApiGatewayUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod",

    // Specific endpoints
    endpoints: {
        sysauthToken: "/sysauth/oauth2/token",
        customerByUuid: (uuid: string) => `/external-partners/customers/${uuid}`,
        customerAccountsByBpid: (bpid: string) => `/customer-account-list/customer/account/BPID/${bpid}`,
        unsecuredLendingOtp: "/unsecured-lending/otp",
    },

    // Ping Identity URLs
    ping: {
        authorizationUrl: process.env.NEXT_PUBLIC_PING_AUTHORIZATION_URL || "https://enterprisestssit.standardbank.co.za/as/authorization.oauth2",
        tokenUrl: process.env.PING_TOKEN_URL || "https://enterprisestssit.standardbank.co.za/as/token.oauth2",
        userInfoUrl: process.env.PING_USERINFO_URL || "https://enterprisestssit.standardbank.co.za/idp/userinfo.openid",
    },

    // Entitlements URLs
    entitlements: {
        baseUrl: process.env.NEXT_PUBLIC_ENTITLEMENTS_BASE_URL || "http://bizhub-entitlements.tc002148-dev.afs1-nprd.aws-za.sbgrp.cloud",
    }
} as const;

