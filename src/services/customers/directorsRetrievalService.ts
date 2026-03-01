import { getCustomerByUuid } from "./customerService";
import { STORAGE_KEYS } from "@/config/storage";

// Define the shape of our returned Director object
export interface DirectorProfile {
    bpid: string;
    uuid: string;
    email: string | null;
    contactNumber: string | null;
    isActive: boolean;
    additionalDetails?: any;
}

export interface BPGuidResult {
    customers: {
        bpId: string;
        bpGuid: string;
        errorMsg: string | null;
        httpStatus: string;
    }[];
}

/**
 * 1️⃣ GetBPGUIDService client call
 * Retrieves the UUID for a given BPID
 */
export async function getBPGUIDService(bpId: string, accessToken: string): Promise<string | null> {
    try {
        const response = await fetch('/api/customers/bpguid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body: JSON.stringify({ bpId })
        });

        if (!response.ok) {
            console.error(`[GetBPGUIDService] Failed for BPID ${bpId} with status ${response.status}`);
            return null;
        }

        const data: BPGuidResult = await response.json();

        if (data && data.customers && data.customers.length > 0) {
            const customer = data.customers[0];
            if (customer.httpStatus === "OK" && customer.bpGuid) {
                return customer.bpGuid;
            }
            console.error(`[GetBPGUIDService] Error from gateway: ${customer.errorMsg}`);
        }

        return null;
    } catch (error) {
        console.error(`[GetBPGUIDService] Exception calling GetBPGUID for BPID ${bpId}:`, error);
        return null;
    }
}

/**
 * Executes the entire Directors Retrieval Flow.
 * 
 * Flow:
 * 1. Extract Directors list from SELECTED_CUSTOMER_DETAILS.
 * 2. For each Director:
 *    - Call GetBPGUIDService
 *    - Call Customer API using the retrieved UUID
 *    - Map details to final list.
 */
export async function retrieveDirectorsFlow(): Promise<{ success: DirectorProfile[], failed: { bpId: string, reason: string }[] }> {
    const success: DirectorProfile[] = [];
    const failed: { bpId: string, reason: string }[] = [];

    try {
        // Step 1: Extract from storage
        const detailsStr = localStorage.getItem(STORAGE_KEYS.SELECTED_CUSTOMER_DETAILS);
        if (!detailsStr) {
            throw new Error("SELECTED_CUSTOMER_DETAILS not found in localStorage.");
        }

        let detailsObj;
        try {
            detailsObj = JSON.parse(detailsStr);
        } catch (e) {
            throw new Error("Failed to parse SELECTED_CUSTOMER_DETAILS json.");
        }

        const customerDetails = detailsObj.customerDetails || [];

        // Filter out those with "relationshipType" == "DIRECTOR"
        const directors = customerDetails.filter((d: any) =>
            d.relationshipType?.toUpperCase() === "DIRECTOR" && d.bpId
        );

        if (directors.length === 0) {
            console.warn("[DirectorsRetrievalFlow] No directors found in selected customer details.");
            return { success, failed };
        }

        // Fetch ping accessToken to pass along to proxy nodes
        let accessToken = sessionStorage.getItem(STORAGE_KEYS.PING_ACCESS_TOKEN) || localStorage.getItem(STORAGE_KEYS.PING_ACCESS_TOKEN) || "";

        if (!accessToken) {
            console.warn("[DirectorsRetrievalFlow] Access Token missing. Proceeding with empty string (mock might handle it).");
        }

        // Loop through each director
        for (const director of directors) {
            const bpId = director.bpId;
            console.log(`[DirectorsRetrievalFlow] Processing Director BPID: ${bpId}`);

            try {
                // Step 2 & 3: Call GetBPGUIDService to get UUID
                const uuid = await getBPGUIDService(bpId, accessToken);

                if (!uuid) {
                    failed.push({ bpId, reason: "GetBPGUID returned null or failed" });
                    continue;
                }

                // Step 4: Call Customer API using UUID
                const customerProfile = await getCustomerByUuid(uuid, accessToken);

                if (!customerProfile) {
                    failed.push({ bpId, reason: "Customer API returned empty profile" });
                    continue;
                }

                // Step 5: Map fields
                let email = "Not available";
                let contactNumber = "Not available";

                // Mapping structure based on standard JSON returns
                const contactMechanisms = customerProfile.contactMechanisms || [];
                const emailContact = contactMechanisms.find((c: any) => c.type === "EMAIL");
                if (emailContact && emailContact.value) {
                    email = emailContact.value;
                } else if (customerProfile.email) {
                    email = customerProfile.email;
                }

                const phoneContact = contactMechanisms.find((c: any) => c.type === "CELLPHONE" || c.type === "PHONE");
                if (phoneContact && phoneContact.value) {
                    contactNumber = phoneContact.value;
                } else if (customerProfile.contactNumber) {
                    contactNumber = customerProfile.contactNumber;
                }

                success.push({
                    bpid: bpId,
                    uuid: uuid,
                    email: email,
                    contactNumber: contactNumber,
                    isActive: customerProfile.status === "ACTIVE" || true, // Fallback true 
                    additionalDetails: customerProfile.personalDetails || customerProfile.details || null,
                });

            } catch (dirError) {
                console.error(`[DirectorsRetrievalFlow] Error processing director ${bpId}:`, dirError);
                failed.push({
                    bpId,
                    reason: dirError instanceof Error ? dirError.message : String(dirError)
                });
            }
        }

        // Final Output Returns structure
        return { success, failed };
    } catch (error) {
        console.error("[DirectorsRetrievalFlow] Critical workflow error:", error);
        throw error;
    }
}
