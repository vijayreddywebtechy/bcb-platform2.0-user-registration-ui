/**
 * Account Services
 * Client-side methods mapped to our secure proxy APIs.
 */

/**
 * Fetch a customer account list by BPID.
 * 
 * @param bpid The Business Partner ID
 * @param accessToken The session bearer token to authenticate the proxy request
 */
export async function getCustomerAccounts(bpid: string, accessToken: string) {
    const response = await fetch(`/api/customers/${encodeURIComponent(bpid)}/accounts`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch customer accounts");
    }

    return data;
}
