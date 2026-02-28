/**
 * API Gateway Token Service
 *
 * Provides methods for requesting and managing an OAuth2 Client Credentials
 * token for the backend Gateway API calls. Includes sessionStorage persistence.
 */

import { STORAGE_KEYS } from "@/config";

export interface ApiGatewayTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

// In-Memory cache strategy combined with sessionStorage fallback
let cachedToken: string | null = null;
let tokenExpiryTime: number | null = null;

const TOKEN_EXPIRY_BUFFER_MS = 10000;

/**
 * Retrieves a Gateway Access token, reusing it if already active.
 *
 * @returns {Promise<string>} - The valid gateway `access_token`
 */
export async function getGatewayAccessToken(): Promise<string> {
    const now = Date.now();

    // 1. Check in-memory Cache
    if (cachedToken && tokenExpiryTime && now < (tokenExpiryTime - TOKEN_EXPIRY_BUFFER_MS)) {
        console.log("[ApiGatewayTokenService] Returning valid cached gateway token from memory.");
        return cachedToken;
    }

    // 2. Check Session Storage Fallback
    if (typeof window !== "undefined") {
        const storedTokenData = sessionStorage.getItem(STORAGE_KEYS.GATEWAY_ACCESS_TOKEN);
        if (storedTokenData) {
            try {
                const parsed = JSON.parse(storedTokenData);
                if (parsed.token && parsed.expiry && now < (parsed.expiry - TOKEN_EXPIRY_BUFFER_MS)) {
                    console.log("[ApiGatewayTokenService] Returning valid cached gateway token from sessionStorage.");
                    cachedToken = parsed.token;
                    tokenExpiryTime = parsed.expiry;
                    return cachedToken!;
                } else {
                    // Expired, clear it out
                    sessionStorage.removeItem(STORAGE_KEYS.GATEWAY_ACCESS_TOKEN);
                }
            } catch (e) {
                // Invalid JSON, clear it out
                sessionStorage.removeItem(STORAGE_KEYS.GATEWAY_ACCESS_TOKEN);
            }
        }
    }

    try {
        console.log("[ApiGatewayTokenService] Requesting new API gateway token via proxy.");

        const response = await fetch("/api/auth/gateway-token", {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("[ApiGatewayTokenService] Proxy error:", data);
            throw new Error(data.error || `Failed to retrieve token (Status: ${response.status})`);
        }

        const tokenData = data as ApiGatewayTokenResponse;

        if (!tokenData.access_token) {
            throw new Error("Invalid response schema: missing access_token");
        }

        // 3. Cache new token immediately
        cachedToken = tokenData.access_token;
        tokenExpiryTime = now + (tokenData.expires_in * 1000);

        if (typeof window !== "undefined") {
            sessionStorage.setItem(STORAGE_KEYS.GATEWAY_ACCESS_TOKEN, JSON.stringify({
                token: cachedToken,
                expiry: tokenExpiryTime
            }));
        }

        console.log("[ApiGatewayTokenService] Token successfully acquired and cached.");

        return cachedToken;

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[ApiGatewayTokenService] Exception:", message);
        throw new Error("Service unavailable or network error while fetching gateway token");
    }
}

/**
 * Force clears the cached gateway token state intentionally.
 */
export function invalidateGatewayToken() {
    console.log("[ApiGatewayTokenService] Force invalidating cached gateway token.");
    cachedToken = null;
    tokenExpiryTime = null;
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(STORAGE_KEYS.GATEWAY_ACCESS_TOKEN);
    }
}
