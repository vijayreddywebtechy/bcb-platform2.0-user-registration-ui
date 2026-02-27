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
* **Purpose**: Validates the access token retrieved in Step 3 and grabs the standard user profile (like name, email, and roles) mapped to this session.
* **Internal Proxy Route**: `POST /api/auth/ping-userinfo`
* **Gateway Endpoint**: `GET https://enterprisestssit.standardbank.co.za/idp/userinfo.openid`

### 5. Mobile Auth (OTP Service Authenticator)
* **Purpose**: Establishes a server-to-server authenticated context using standard client credentials (IBM client ID & secret) to authorize subsequent Mobile OTP dispatches.
* **Internal Proxy Route**: `POST /api/auth/mobile-otp`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/sysauth/oauth2/token`

### 6. Mobile OTP (Generate/Send)
* **Purpose**: Translates a JSON request into a secure SOAP XML envelope to dispatch a fresh SMS OTP token to a mobile device.
* **Data Context**: Requires the `{"functionId": "GEN"}` parameter.
* **Internal Proxy Route**: `POST /api/otp/unsecured-lending`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/unsecured-lending/otp`

### 7. Validate OTP
* **Purpose**: Cross-references the generated OTP against the user's manual input to authorise an action (e.g., verifying a business account or approving a workflow).
* **Data Context**: Requires the `{"functionId": "VAL"}` and the input `{"otp": "123456"}` parameter.
* **Internal Proxy Route**: `POST /api/otp/unsecured-lending`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/unsecured-lending/otp`

### 8. Customer Account List (BPID)
* **Purpose**: Fetches the structured list of accounts and their mapped relationships via a provided Business Partner ID (BPID) after an OTP workflow succeeds.
* **Internal Proxy Route**: `GET /api/customers/[bpid]/accounts`
* **Gateway Endpoint**: `GET https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/customer-account-list/customer/account/BPID/{bpid}`

### 9. Accounts Retail Token Authenticator (Balance Information Token)
* **Purpose**: Retrieves a dedicated OAuth token under the `accounts prod retail write` scope using Basic Authentication with the backend SSL certs and IBM secrets required for making subsequent accounts management writes.
* **Internal Proxy Route**: `POST /api/auth/mobile-accounts-token`
* **Gateway Endpoint**: `POST https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/sysauth/oauth2/token`
