import { type NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/signout
 *
 * Clears all BCB session cookies and redirects to the sign-in page.
 * Optionally propagates a sign-out to Ping Federate (single logout).
 *
 * Response: 302 redirect to /signin
 */
export async function POST(request: NextRequest) {
  const signinUrl = new URL('/signin', request.nextUrl.origin);
  const response = NextResponse.redirect(signinUrl);

  const expiredCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };

  // Clear all server-side session cookies
  response.cookies.set('bcb_access_token', '', expiredCookieOptions);
  response.cookies.set('bcb_id_token', '', expiredCookieOptions);
  response.cookies.set('bcb_token_expires_at', '', expiredCookieOptions);
  response.cookies.set('bcb_oauth_state', '', expiredCookieOptions);
  response.cookies.set('bcb_code_verifier', '', expiredCookieOptions);

  return response;
}
