import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const referer = req.headers.get('referer') || '';
  if (!referer.startsWith(`${process.env.NEXT_PUBLIC_BASE_URL}`)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return Response.json({ accessToken: token?.accessToken, refreshToken: token?.refreshToken });
}
