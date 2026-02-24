import { type NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/api/auth/pingAuthClient';

/**
 * GET /api/auth/me
 *
 * Returns the authenticated user's live profile from the Ping Federate
 * UserInfo endpoint (GET /idp/userinfo.openid) using the stored access_token.
 *
 * NOTE: Do NOT send the auth code here — the code is single-use and is
 * consumed by /api/auth/callback during the token exchange. The access_token
 * is what the UserInfo endpoint requires.
 *
 * Response (200):
 *  {
 *    sub: string
 *    name?: string
 *    given_name?: string
 *    family_name?: string
 *    email?: string
 *    preferred_username?: string
 *    isAuthenticated: true
 *  }
 *
 * Response (401):
 *  { isAuthenticated: false, error: string }
 */
export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('bcb_access_token')?.value;
  const expiresAt = request.cookies.get('bcb_token_expires_at')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { isAuthenticated: false, error: 'No active session' },
      { status: 401 }
    );
  }

  if (expiresAt && Date.now() > Number(expiresAt)) {
    return NextResponse.json(
      { isAuthenticated: false, error: 'Session expired' },
      { status: 401 }
    );
  }

  try {
    const profile = await getUserInfo(accessToken);
    return NextResponse.json({ ...profile, isAuthenticated: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'UserInfo request failed';
    return NextResponse.json(
      { isAuthenticated: false, error: message },
      { status: 401 }
    );
  }
}
