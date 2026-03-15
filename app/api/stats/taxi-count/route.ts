import { NextResponse } from "next/server";

import { getRegisteredTaxisCount } from "@/lib/taxiCount";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getRegisteredTaxisCount();

  return NextResponse.json({ count });
}
