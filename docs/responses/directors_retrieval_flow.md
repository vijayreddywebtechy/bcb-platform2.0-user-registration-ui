# Directors Retrieval Flow: Integration Guide

## 1. Sequence Flow Diagram (Text-Based)

```text
[Client / Frontend Application]
      │
      │ 1) LocalStorage: fetch SELECTED_CUSTOMER_DETAILS
      ▼
[DirectorsRetrievalFlow (retrieveDirectorsFlow)]
      │
      │ 2) Extract list of Directors (relationshipType === "DIRECTOR")
      │
      ├─► For each Director (BPID):
      │       │
      │       ├─► 3) Call GetBPGUIDService (POST /api/customers/bpguid)
      │       │       │ 
      │       │       ├──► Uses stored Ping accessToken
      │       │       └──► Next.js server route securely adds client-id/client-secret from @.env.local
      │       │
      │       ├─► 4) Gateway responds with BP GUID (UUID)
      │       │
      │       ├─► 5) Call Customer API (GET /api/customers/[uuid])
      │       │       │ 
      │       │       ├──► Passed via getCustomerByUuid client service
      │       │       └──► Next.js server route securely adds certificates and API secrets
      │       │
      │       ├─► 6) Map Email + Contact Number + BPID +  Active status
      │       │       │
      │       │       └──► Ensure fallback values if elements are not present
      │       │
      │       └──► Append to Success or Failed list
      │
      ▼
[Return { success: DirectorProfile[], failed: { bpId, reason }[] }]
      │
      └──► Store or Render in the UI 
```

---

## 2. Sample Input & Output Mapping

### Step 1: Extracted Input
**From `SELECTED_CUSTOMER_DETAILS` in `localStorage`:**
```json
{
  "bpId": "0536358235",
  "customerName": "",
  "relationshipType": "DIRECTOR",
  "accountDetails": []
}
```

### Step 2: GetBPGUIDService Output mapped to loop
**Service parses response to extract UUID:**
```json
{
    "bpId": "0536358235",
    "bpGuid": "02002100-00a4-1eef-bcd0-1c9f8bb93848",
    "errorMsg": null,
    "httpStatus": "OK"
}
```
**Extracted UUID:** `"02002100-00a4-1eef-bcd0-1c9f8bb93848"`

### Step 3: Customer API Output
*A sample JSON representing a customer retrieved by `uuid`:*
```json
{
    "status": "ACTIVE",
    "personalDetails": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "contactMechanisms": [
        { "type": "EMAIL", "value": "john.doe@example.com" },
        { "type": "CELLPHONE", "value": "27831234567" }
    ]
}
```

### Final Mapped Output (Success List)
```json
{
  "success": [
    {
      "bpid": "0536358235",
      "uuid": "02002100-00a4-1eef-bcd0-1c9f8bb93848",
      "email": "john.doe@example.com",
      "contactNumber": "27831234567",
      "isActive": true,
      "additionalDetails": {
          "firstName": "John",
          "lastName": "Doe"
      }
    }
  ],
  "failed": []
}
```

---

## 3. Integration Guide

### How to Trigger the Flow

To integrate this flow into existing business operations (e.g., inside the `BusinessSelectApprovers.tsx` or `BusinessRoleDefinition.tsx`), perform the following call:

```tsx
import { retrieveDirectorsFlow } from "@/services/customers/directorsRetrievalService";

const initiateDirectorsFetch = async () => {
    try {
        const result = await retrieveDirectorsFlow();
        
        console.log("Successfully retrieved directors:", result.success);
        
        if (result.failed.length > 0) {
            console.warn("Some directors failed to retrieve:", result.failed);
            // Provide partial-completion UI messaging or retry logic here
        }
        
    } catch (error) {
        console.error("Critical error while retrieving the flow:", error);
    }
}
```

### Code Organization Benefits
- **Secure by Design**: Client logic does not embed `client-id` or `client-secrets`. It talks to `/api/customers/bpguid` and `/api/customers/[uuid]`.
- **Fault-Tolerant**: If a single director BPID lookup fails or is out-of-date, the loop uses `try-catch` to ensure remaining directors are still processed safely. The return provides an array of successes alongside an array of failures.
- **Data Encapsulation**: Response maps messy internal API bodies to a sanitized, strongly typed `DirectorProfile` payload suitable for use directly in a React list component.
