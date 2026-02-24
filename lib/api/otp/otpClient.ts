/**
 * BCB OTP client — server-side only.
 *
 * Endpoint (both send & validate):
 *   POST /npextorg/extnonprod/unsecured-lending/otp
 *
 * Both operations use the same URL. The action is distinguished by the
 * OTPOperation field inside the SOAP envelope.
 *
 * Prerequisites:
 *   A system token obtained via OTP Basic Auth
 *   (POST /sysauth/oauth2/token with client_credentials).
 */

import { randomUUID } from 'crypto';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const IBM_CLIENT_ID = process.env.NEXT_PUBLIC_IBM_CLIENT_ID!;
const IBM_CLIENT_SECRET = process.env.NEXT_PUBLIC_IBM_CLIENT_SECRET!;
const ACCESS_TOKEN_URL = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL!;

// ── System token cache ────────────────────────────────────────────────────────

let cachedOtpToken: { value: string; expiresAt: number } | null = null;

async function getOtpSystemToken(): Promise<string> {
  if (cachedOtpToken && Date.now() < cachedOtpToken.expiresAt - 30_000) {
    return cachedOtpToken.value;
  }

  const response = await fetch(
    `${BASE_URL}/sysauth/oauth2/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-ibm-client-id': IBM_CLIENT_ID,
        'x-fapi-interaction-id': randomUUID(),
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'prod write customer',
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OTP system token fetch failed: ${response.status}`);
  }

  const data = await response.json();
  cachedOtpToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedOtpToken.value;
}

// ── Shared SOAP headers ───────────────────────────────────────────────────────

function buildOtpHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'x-fapi-interaction-id': randomUUID(),
    'Content-Type': 'text/xml; charset=utf-8',
    Accept: 'application/json',
    'X-IBM-Client-Id': IBM_CLIENT_ID,
    'X-IBM-Client-Secret': IBM_CLIENT_SECRET,
  };
}

// ── OTP types ────────────────────────────────────────────────────────────────

export interface SendOtpParams {
  /** Customer cell number to send OTP to */
  cellNumber: string;
  /** Customer ID number */
  idNumber: string;
  /** Reference / application number */
  referenceNumber: string;
}

export interface ValidateOtpParams {
  /** The OTP entered by the user */
  otpValue: string;
  /** Reference number returned from the send step */
  referenceNumber: string;
  /** Customer ID number */
  idNumber: string;
}

export interface OtpResponse {
  referenceNumber: string;
}

// ── Send OTP ─────────────────────────────────────────────────────────────────

export async function sendOtp(params: SendOtpParams): Promise<OtpResponse> {
  const token = await getOtpSystemToken();

  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:otp="http://standardbank.co.za/otp">
  <soapenv:Header/>
  <soapenv:Body>
    <otp:SendOTPRequest>
      <otp:CellNumber>${params.cellNumber}</otp:CellNumber>
      <otp:IDNumber>${params.idNumber}</otp:IDNumber>
      <otp:ReferenceNumber>${params.referenceNumber}</otp:ReferenceNumber>
    </otp:SendOTPRequest>
  </soapenv:Body>
</soapenv:Envelope>`;

  const response = await fetch(`${BASE_URL}/unsecured-lending/otp`, {
    method: 'POST',
    headers: buildOtpHeaders(token),
    body: soapBody,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Send OTP failed (${response.status}): ${err.httpMessage ?? response.statusText}`
    );
  }

  return response.json() as Promise<OtpResponse>;
}

// ── Validate OTP ─────────────────────────────────────────────────────────────

export async function validateOtp(params: ValidateOtpParams): Promise<OtpResponse> {
  const token = await getOtpSystemToken();

  const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:otp="http://standardbank.co.za/otp">
  <soapenv:Header/>
  <soapenv:Body>
    <otp:ValidateOTPRequest>
      <otp:OTPValue>${params.otpValue}</otp:OTPValue>
      <otp:ReferenceNumber>${params.referenceNumber}</otp:ReferenceNumber>
      <otp:IDNumber>${params.idNumber}</otp:IDNumber>
    </otp:ValidateOTPRequest>
  </soapenv:Body>
</soapenv:Envelope>`;

  const response = await fetch(`${BASE_URL}/unsecured-lending/otp`, {
    method: 'POST',
    headers: buildOtpHeaders(token),
    body: soapBody,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Validate OTP failed (${response.status}): ${err.httpMessage ?? response.statusText}`
    );
  }

  return response.json() as Promise<OtpResponse>;
}
