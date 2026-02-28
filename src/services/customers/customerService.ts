/**
 * Customer Service
 *
 * Provides methods for interacting with the Standard Bank Customer APIs
 * via the Next.js internal API routes (to bypass CORS and secure secrets).
 */

export interface CustomerResponse {
    // Extend this based on actual API schema
    status?: string;
    details?: any;
    [key: string]: any;
}

/**
 * Retrieves a customer profile by UUID.
 *
 * Requires an active Ping Identity access token.
 *
 * @param uuid - The customer UUID (e.g., from Ping UserInfo `id` field)
 * @param accessToken - The Ping Identity access_token
 */
export async function getCustomerByUuid(
    uuid: string,
    accessToken: string
): Promise<CustomerResponse> {
    if (!uuid || !accessToken) {
        throw new Error("uuid and accessToken are required to fetch customer data");
    }

    console.log(`[CustomerService] Fetching customer data for UUID: ${uuid}`);
    uuid = "02002100-00a4-1eef-bcd0-1c9f8bb93848";

    const response = await fetch(`/api/customers/${uuid}`, {
        method: "GET",
        headers: {
            // We pass the access_token in a custom header so the server route
            // can use it as the Bearer token when calling the external API.
            "x-access-token": accessToken,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(`[CustomerService] Error fetching customer:`, data);
        throw new Error(
            data.error || `Failed to fetch customer (Status: ${response.status})`
        );
    }

    console.log(`[CustomerService] Customer data fetched successfully.`);
    return data as CustomerResponse;
}
