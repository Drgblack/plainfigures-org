import { NextResponse } from 'next/server';
import { getSearchConsoleReportSnapshot } from '@/lib/seo/searchConsoleReport';

export const revalidate = 86400;

export function GET() {
  return NextResponse.json(getSearchConsoleReportSnapshot(), {
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
