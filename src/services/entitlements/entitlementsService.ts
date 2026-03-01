import { API_CONFIG } from "@/config/api";
import { getGatewayAccessToken } from "@/services/auth/apiGatewayTokenService";
import mockRoles from "../../../docs/responses/getRoles.json";

/**
 * Fetches user roles from the Entitlements API
 */
export async function getRoles(): Promise<any> {
    try {
        // Retrieve token securely
        let token = "";
        try {
            token = await getGatewayAccessToken();
        } catch (err) {
            console.warn("[EntitlementsService] Could not retrieve access token, proceeding without it.");
        }

        const headers: HeadersInit = {
            "Accept": "/",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_CONFIG.entitlements.baseUrl}/api/rbac/roles`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("401 Unauthorized: Invalid or expired token");
            }
            if (response.status === 403) {
                throw new Error("403 Forbidden: Insufficient permissions");
            }
            throw new Error(`Entitlements API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Check if it's a TypeError (which happens during CORS / network failure like Failed to fetch)
        // or if it includes specific fetch error messages
        const errStr = String(error);
        if (error instanceof TypeError || errStr.includes("Failed to fetch") || errStr.includes("network")) {
            console.warn("[EntitlementsService] Network or strict-origin issue detected. Falling back to mock roles response.");
            return mockRoles;
        }

        console.error("[EntitlementsService] Error fetching roles:", error);
        throw error;
    }
}
