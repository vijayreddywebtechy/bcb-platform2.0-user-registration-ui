/**
 * Ping Federate OIDC / OAuth 2.0 — SERVER-SIDE ONLY.
 *
 * All PKCE generation and token operations happen here (Node.js runtime).
 * Nothing in this file may be imported from a 'use client' component.
 *
 * Environment variables:
 *  - NEXT_PUBLIC_PING_AUTHORIZATION_URL  — Ping AS authorization endpoint
 *  - NEXT_PUBLIC_PING_CLIENT_ID          — OAuth2 client ID
 *  - NEXT_PUBLIC_PING_REDIRECT_URI       — base URL of this app (e.g. https://localhost:3000)
 *  - NEXT_PUBLIC_ACCESS_TOKEN_URL        — Ping token endpoint
 *  - NEXT_PUBLIC_CODE_CHALLENGE_METHOD   — always "S256"
 *
 * NOTE: NEXT_PUBLIC_ prefix is required so Next.js bundles these for server
 * Route Handlers. Despite the prefix they must NEVER be read client-side after
 * this refactor — all calls go through /api/auth/signin.
 */

import { randomBytes, createHash } from 'crypto';

// ── PKCE helpers ──────────────────────────────────────────────────────────────

/** Generate a cryptographically-random PKCE code_verifier (RFC 7636 §4.1). */
export function generateCodeVerifier(): string {
  return randomBytes(32).toString('base64url');
}

/** Derive the code_challenge from a verifier using S256 (RFC 7636 §4.2). */
export function generateCodeChallenge(verifier: string): string {
  return createHash('sha256').update(verifier).digest('base64url');
}

/** Generate a random state value for CSRF protection. */
export function generateState(): string {
  return randomBytes(16).toString('hex');
}

// ── Authorization URL ─────────────────────────────────────────────────────────

export interface PingAuthParams {
  /** Store in HTTP-only cookie; needed for the token exchange in /callback */
  codeVerifier: string;
  /** Store in HTTP-only cookie; validated against Ping's returned state */
  state: string;
  /** Full Ping authorization URL — redirect the browser here */
  authorizationUrl: string;
}

/**
 * Build the Ping Federate authorization URL with freshly-generated PKCE values.
 * Called only from app/api/auth/signin/route.ts.
 *
 * The redirect_uri used here MUST match exactly what is registered in the
 * Ping Federate client. Set NEXT_PUBLIC_PING_REDIRECT_URI to that exact value
 * (e.g. "https://localhost:3000"). No path suffix is appended.
 */
export function buildPingAuthorizationUrl(): PingAuthParams {
  const authBaseUrl = process.env.NEXT_PUBLIC_PING_AUTHORIZATION_URL;
  // Postman collection confirms the correct client_id is NEXT_PUBLIC_CLIENT_ID
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  // Exact URI registered in the Ping Federate client — no path suffix
  const redirectUri = process.env.NEXT_PUBLIC_PING_REDIRECT_URI!;
  const codeChallengeMethod = process.env.NEXT_PUBLIC_CODE_CHALLENGE_METHOD ?? 'S256';

  if (!authBaseUrl || !clientId || !redirectUri) {
    throw new Error(
      'Missing Ping OAuth2 config. Verify NEXT_PUBLIC_PING_AUTHORIZATION_URL, ' +
      'NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_PING_REDIRECT_URI in .env.local.'
    );
  }

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();
  const nonce = generateState();

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid email profile',   // matches Postman collection scope order
    state,
    nonce,
    code_challenge: codeChallenge,
    code_challenge_method: codeChallengeMethod,
  });

  return {
    codeVerifier,
    state,
    authorizationUrl: `${authBaseUrl}?${params.toString()}`,
  };
}

// ── Token exchange ────────────────────────────────────────────────────────────

export interface PingTokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

/**
 * Exchange an authorization code for tokens.
 * Called only from app/api/auth/callback/route.ts.
 */
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<PingTokenResponse> {
  const tokenUrl = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL!;
  // Must match the client_id used in buildPingAuthorizationUrl()
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  // Must be identical to the redirect_uri used in buildPingAuthorizationUrl()
  const redirectUri = process.env.NEXT_PUBLIC_PING_REDIRECT_URI!;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed (${response.status}): ${error}`);
  }

  return response.json() as Promise<PingTokenResponse>;
}

// ── UserInfo endpoint ─────────────────────────────────────────────────────────

const USERINFO_URL = 'https://enterprisestssit.standardbank.co.za/idp/userinfo.openid';

/**
 * Fetch user profile from the Ping Federate UserInfo endpoint.
 *
 * Requires the access_token from the token exchange — NOT the auth code.
 * The auth code is single-use and is consumed by exchangeCodeForTokens().
 *
 * Called server-side from app/api/auth/callback/route.ts after token exchange,
 * and from app/api/auth/me/route.ts for subsequent profile lookups.
 */
export async function getUserInfo(accessToken: string): Promise<PingUserProfile> {
  const response = await fetch(USERINFO_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`UserInfo request failed (${response.status}): ${error}`);
  }

  return response.json() as Promise<PingUserProfile>;
}

// ── ID token parsing ──────────────────────────────────────────────────────────

export interface PingUserProfile {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  preferred_username?: string;
}

/**
 * Decode the payload of a Ping id_token JWT (no signature verification).
 * Use only for displaying user info — not for security decisions.
 * Signature is verified by Ping during the token exchange.
 */
export function decodeIdTokenPayload(idToken: string): PingUserProfile | null {
  try {
    const [, payloadB64] = idToken.split('.');
    const payload = Buffer.from(payloadB64, 'base64url').toString('utf8');
    return JSON.parse(payload) as PingUserProfile;
  } catch {
    return null;
  }
}
