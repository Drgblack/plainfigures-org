import { NextResponse } from 'next/server';
import { getProgrammaticReportingSnapshot } from '@/lib/programmatic-reporting';

export const revalidate = 86400;

export function GET() {
  return NextResponse.json(getProgrammaticReportingSnapshot());
}
