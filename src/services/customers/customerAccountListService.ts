/**
 * Customer Account List Service
 *
 * Provides methods for retrieving the customer's account list.
 * This acts as a client-side service calling our Next.js API proxy to securely
 * append secrets and headers.
 */

export interface AccountListResponse {
    success: boolean;
    data?: Record<string, unknown>;
    error?: string;
}

/**
 * Retrieves a customer account list by BPID.
 *
 * @param bpid - The Business Partner ID, retrieved from customer profile.
 */
export async function getCustomerAccountList(
    bpid: string
): Promise<AccountListResponse> {
    try {
        if (!bpid) {
            return {
                success: false,
                error: "Validation Error: BPID is required",
            };
        }

        console.log(`[CustomerAccountListService] Fetching Gateway Token for BPID: ${bpid}`);

        let gatewayToken: string;
        try {
            const { getGatewayAccessToken } = await import("@/services/auth/apiGatewayTokenService");
            gatewayToken = await getGatewayAccessToken();
        } catch (tokenErr) {
            console.error(`[CustomerAccountListService] Gateway Token Error:`, tokenErr);
            return { success: false, error: "Authentication failed: Could not generate gateway token" };
        }

        console.log(`[CustomerAccountListService] Token Active. Fetching accounts for BPID: ${bpid}`);
        bpid = "0533419624";
        console.log(`[CustomerAccountListService] Fetching accounts for STATIC BPID: ${bpid}`);

        const response = await fetch(`/api/customers/account-list/${bpid}/accounts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${gatewayToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.status === 401) {
            return { success: false, error: "Unauthorized: Invalid or expired access token" };
        }
        if (response.status === 403) {
            return { success: false, error: "Forbidden: Access denied to requested resource" };
        }

        if (!response.ok) {
            console.error(`[CustomerAccountListService] Error fetching account list:`, data);
            return {
                success: false,
                error: data.error || `Failed to fetch account list (Status: ${response.status})`,
            };
        }

        // Additional validation to ensure data has the expected structure if needed
        if (!data || Object.keys(data).length === 0) {
            return {
                success: false,
                error: "Account list is empty or could not be processed",
            };
        }

        console.log(`[CustomerAccountListService] Account list fetched successfully.`);
        return {
            success: true,
            data,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[CustomerAccountListService] Exception:`, message);
        return {
            success: false,
            error: "Service unavailable or network error",
        };
    }
}
