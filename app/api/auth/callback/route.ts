import { type NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/api/auth/pingAuthClient';

/**
 * GET /api/auth/callback
 *
 * Ping Federate redirects here after the user authenticates.
 * Query params:
 *  - code  — the short-lived authorization code
 *  - state — the CSRF state value set before the redirect
 *
 * Flow:
 *  1. Validate required query params
 *  2. Read the saved state + code_verifier from the request cookie
 *  3. Validate state (CSRF protection)
 *  4. Exchange code for tokens with Ping token endpoint
 *  5. Store access_token in an HTTP-only session cookie
 *  6. Redirect to the OTP screen
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const errorParam = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Ping returned an error (user cancelled, session expired, etc.)
  if (errorParam) {
    const signinUrl = new URL('/signin', request.nextUrl.origin);
    signinUrl.searchParams.set('auth_error', errorDescription ?? errorParam);
    return NextResponse.redirect(signinUrl);
  }

  if (!code || !returnedState) {
    const signinUrl = new URL('/signin', request.nextUrl.origin);
    signinUrl.searchParams.set('auth_error', 'Missing authorization code or state');
    return NextResponse.redirect(signinUrl);
  }

  // Read state + code_verifier stored as short-lived cookies before the Ping redirect
  const savedState = request.cookies.get('bcb_oauth_state')?.value;
  const codeVerifier =
    request.cookies.get('bcb_code_verifier')?.value ??
    process.env.NEXT_PUBLIC_PING_CODE_VERIFIER;

  // State validation — prevent CSRF
  if (savedState && savedState !== returnedState) {
    const signinUrl = new URL('/signin', request.nextUrl.origin);
    signinUrl.searchParams.set('auth_error', 'State mismatch. Please try signing in again.');
    return NextResponse.redirect(signinUrl);
  }

  if (!codeVerifier) {
    const signinUrl = new URL('/signin', request.nextUrl.origin);
    signinUrl.searchParams.set('auth_error', 'PKCE verifier not found. Please try again.');
    return NextResponse.redirect(signinUrl);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, codeVerifier);

    const expiresAt = Date.now() + tokens.expires_in * 1000;
    const otpUrl = new URL('/otp', request.nextUrl.origin);

    const response = NextResponse.redirect(otpUrl);

    // Store access token in HTTP-only cookie — never accessible to client JS
    response.cookies.set('bcb_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    // Store id_token for user profile extraction (server-side only)
    if (tokens.id_token) {
      response.cookies.set('bcb_id_token', tokens.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: tokens.expires_in,
      });
    }

    // Store expiry for server-side session validation
    response.cookies.set('bcb_token_expires_at', String(expiresAt), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: tokens.expires_in,
    });

    // Clean up the short-lived PKCE cookies
    response.cookies.delete('bcb_oauth_state');
    response.cookies.delete('bcb_code_verifier');

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Authentication failed';
    const signinUrl = new URL('/signin', request.nextUrl.origin);
    signinUrl.searchParams.set('auth_error', message);
    return NextResponse.redirect(signinUrl);
  }
}
