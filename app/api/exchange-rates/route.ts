import { NextResponse } from "next/server";
import {
  ensureRatesFresh,
  getSnapshot,
} from "@/lib/exchange-rates/server-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureRatesFresh();
    return NextResponse.json(getSnapshot());
  } catch (e) {
    console.error("[api/exchange-rates]", e);
    return NextResponse.json(
      {
        ok: false,
        base: "USD",
        rates: null,
        updatedAt: null,
        source: null,
        stale: false,
        error: "internal",
        regionalFx: null,
        arsBlue: null,
      },
      { status: 500 }
    );
  }
}
