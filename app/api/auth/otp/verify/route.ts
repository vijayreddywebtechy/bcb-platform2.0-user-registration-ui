import { type NextRequest, NextResponse } from 'next/server';
import { validateOtp } from '@/lib/api/otp/otpClient';

/**
 * POST /api/auth/otp/verify
 *
 * Validates the OTP entered by the user against the BCB OTP service.
 * Requires an active session (bcb_access_token cookie).
 *
 * Request body:
 *  {
 *    otpValue:        string  — the 5-digit OTP entered by the user
 *    referenceNumber: string  — reference number returned from /otp/send
 *    idNumber:        string  — customer SA ID number
 *  }
 *
 * Response (200):
 *  { referenceNumber: string }
 *
 * Response (400 | 401 | 500):
 *  { httpCode: string, httpMessage: string, moreInformation: string | null }
 */
export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('bcb_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { httpCode: '401', httpMessage: 'Unauthorised', moreInformation: 'No active session' },
      { status: 401 }
    );
  }

  let body: { otpValue?: string; referenceNumber?: string; idNumber?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { httpCode: '400', httpMessage: 'Invalid request body', moreInformation: null },
      { status: 400 }
    );
  }

  const { otpValue, referenceNumber, idNumber } = body;

  if (!otpValue || !referenceNumber || !idNumber) {
    return NextResponse.json(
      {
        httpCode: '400',
        httpMessage: 'Missing required fields',
        moreInformation: 'otpValue, referenceNumber and idNumber are required',
      },
      { status: 400 }
    );
  }

  try {
    const result = await validateOtp({ otpValue, referenceNumber, idNumber });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'OTP validation failed';
    return NextResponse.json(
      { httpCode: '500', httpMessage: message, moreInformation: null },
      { status: 500 }
    );
  }
}
