import { NextResponse } from 'next/server';
import { getProgrammaticReportingSnapshot } from '@/lib/programmatic-reporting';

export const revalidate = 86400;

export function GET() {
  return NextResponse.json(getProgrammaticReportingSnapshot(), {
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
