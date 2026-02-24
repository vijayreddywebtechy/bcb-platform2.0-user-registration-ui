import { type NextRequest, NextResponse } from 'next/server';
import { sendOtp } from '@/lib/api/otp/otpClient';

/**
 * POST /api/auth/otp/send
 *
 * Requests a one-time PIN to be sent to the customer's registered cell number.
 * Requires an active session (bcb_access_token cookie).
 *
 * Request body:
 *  {
 *    cellNumber:      string  — customer mobile number
 *    idNumber:        string  — customer SA ID number
 *    referenceNumber: string  — application / pre-application reference
 *  }
 *
 * Response (200):
 *  { referenceNumber: string }
 *
 * Response (400 | 500):
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

  let body: { cellNumber?: string; idNumber?: string; referenceNumber?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { httpCode: '400', httpMessage: 'Invalid request body', moreInformation: null },
      { status: 400 }
    );
  }

  const { cellNumber, idNumber, referenceNumber } = body;

  if (!cellNumber || !idNumber || !referenceNumber) {
    return NextResponse.json(
      {
        httpCode: '400',
        httpMessage: 'Missing required fields',
        moreInformation: 'cellNumber, idNumber and referenceNumber are required',
      },
      { status: 400 }
    );
  }

  try {
    const result = await sendOtp({ cellNumber, idNumber, referenceNumber });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'OTP send failed';
    return NextResponse.json(
      { httpCode: '500', httpMessage: message, moreInformation: null },
      { status: 500 }
    );
  }
}
