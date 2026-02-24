import { type NextRequest, NextResponse } from 'next/server';
import { buildPingAuthorizationUrl } from '@/lib/api/auth/pingAuthClient';

/**
 * POST /api/auth/signin
 *
 * Initiates the Ping Federate Authorization Code + PKCE flow.
 *
 * Flow:
 *  1. Generate a fresh PKCE (code_verifier, code_challenge) pair server-side
 *  2. Generate a random state value for CSRF protection
 *  3. Store code_verifier and state in short-lived HTTP-only cookies
 *  4. Return the Ping authorization URL for the client to redirect to
 *
 * The client (SignInForm) redirects the browser to the returned URL.
 * Ping authenticates the user and calls back to GET /api/auth/callback.
 *
 * Request body (optional — username/password are not passed to Ping via this
 * route; Ping handles credential collection on its own login page):
 *  { username?: string }
 *
 * Response (200):
 *  { authorizationUrl: string }
 *
 * Response (500):
 *  { error: string }
 */
export async function POST(_request: NextRequest) {
  try {
    const { codeVerifier, state, authorizationUrl } = buildPingAuthorizationUrl();
    
    const response = NextResponse.json({ authorizationUrl }, { status: 200 });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 5 * 60, // 5 minutes — enough to complete the Ping auth flow
    };

    // Store server-side so /api/auth/callback can validate state and exchange code
    response.cookies.set('bcb_oauth_state', state, cookieOptions);
    response.cookies.set('bcb_code_verifier', codeVerifier, cookieOptions);

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to initiate sign-in';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
