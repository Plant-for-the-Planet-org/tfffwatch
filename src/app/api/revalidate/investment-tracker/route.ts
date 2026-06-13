import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache"; // ✅ App Router API

export async function GET(req: Request) {
  const url = new URL(req.url);
  const country = url.searchParams.get("country");
  const secret = url.searchParams.get("secret");

  // Endpoint must be protected: a configured secret is required, and the
  // caller must present a matching `?secret=`. Fails closed if unset.
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET)
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 }
    );

  if (!country)
    return NextResponse.json(
      { ok: false, error: "Missing country parameter" },
      { status: 400 }
    );

  const path = `/investment-tracker/${encodeURIComponent(country)}`;
  try {
    revalidatePath(path);
    return NextResponse.json({ ok: true, revalidated: path });
  } catch (err) {
    console.error("Revalidate failed:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
