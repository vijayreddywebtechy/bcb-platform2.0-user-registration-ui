# BCB Platform 2.0 – API Execution Flow

This document sequences the API integrations logically based on their execution order in the platform. Every step below highlights the Next.js internal proxy API and the underlying Standard Bank API Gateway that it interacts with.

---

### 1. Health Check
* **Purpose**: Simple server vitality check to ensure the Next.js proxies are alive.
* **Internal Proxy Route**: `GET /api/health`

### 2. Ping Authorization
* **Purpose**: The beginning of the user session flow. Configures the Ping Federate login session.

### 3. Redirect URL & Access Token
* **Purpose**: Retrieves the login URI and then exchanges the resultant Ping Authorization Code for a Bearer Access Token.
* **Step A: Generate Auth URL**
  * **Internal Proxy Route**: `POST /api/auth/ping-url`
  * **Gateway Endpoint**: `GET https://enterprisestssit.standardbank.co.za/as/authorization.oauth2`
* **Step B: Token Exchange**
  * **Internal Proxy Route**: `POST /api/auth/ping-token`
  * **Gateway Endpoint**: `POST https://enterprisestssit.standardbank.co.za/as/token.oauth2`

### 4. UserInfo
* **Purpose**: Validates the access token retrieved in Step 3 and grabs the standard user profile (like standardbankId, sub, and auth_time).
* **Internal Proxy Route**: `POST /api/auth/ping-userinfo`
* **Gateway Endpoint**: `GET https://enterprisestssit.standardbank.co.za/idp/userinfo.openid`

### 5. Fetch Customer Profile
* **Purpose**: Uses the Ping Access Token and user information (like SUB ID) to fetch the initial customer classification details directly from the Customer proxy API.
* **Internal Proxy Route**: `GET /api/customers/[uuid]`
* **Gateway Endpoint**: `GET https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/external-partners/customers/{uuid}`

### 6. Mobile Auth (OTP Service Authenticator)
* **Purpose**: Establishes a server-to-server authenticated context using standard client credentials (IBM client ID & secret) to authorize subsequent Mobile OTP dispatches.
* **Internal Proxy Route**: `POST /api/otp-token`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/sysauth/oauth2/token`

### 7. Mobile OTP (Generate/Send)
* **Purpose**: Translates a JSON request into a secure SOAP XML envelope to dispatch a fresh SMS OTP token to a mobile device.
* **Data Context**: Requires the `{"mobile": {"code": "27", "number": "..."}}` payload parameter.
* **Internal Proxy Route**: `POST /api/send-otp`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/unsecured-lending/otp`

### 8. Validate OTP
* **Purpose**: Cross-references the generated OTP against the user's manual input to authorise an action (e.g., verifying a business account or approving a workflow).
* **Data Context**: Requires the `{"mobile": {...}, "otpValue": "123456", "otpQName": "..."}` payload parameters. Returns `0000` or `1001` on success.
* **Internal Proxy Route**: `POST /api/verify-otp`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/unsecured-lending/otp`

### 9. API Gateway Token Authenticator (Accounts Scope)
* **Purpose**: Retrieves a dedicated OAuth token mapping the `customer accounts prod retail write` scope using client credentials, IBM secrets, and mTLS certificates. Safely cached in sessionStorage.
* **Internal Proxy Route**: `POST /api/auth/gateway-token`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/sysauth/oauth2/token`

### 10. Customer Account List (BPID)
* **Purpose**: Fetches the structured list of accounts and their mapped relationships via a provided Business Partner ID (BPID) authorized by the Gateway Token. Used to populate the Business Profiles screen.
* **Internal Proxy Route**: `GET /api/customers/account-list/[bpid]/accounts`
* **Gateway Endpoint**: `GET https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/customer-account-list/customer/account/BPID/{bpid}`