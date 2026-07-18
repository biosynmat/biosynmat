import { doc, getDoc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebaseDb } from "@/lib/firebase/client";

const visitorCountRef = doc(firebaseDb, "site_metrics", "homepage_visits");

function readTotal(data: unknown) {
  if (!data || typeof data !== "object" || !("total" in data)) {
    return 0;
  }

  const total = (data as { total: unknown }).total;
  return typeof total === "number" && Number.isFinite(total) ? total : 0;
}

export async function GET() {
  try {
    const snapshot = await getDoc(visitorCountRef);
    return NextResponse.json(
      { total: snapshot.exists() ? readTotal(snapshot.data()) : 0 },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch visitor count.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await setDoc(
      visitorCountRef,
      {
        total: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );

    const snapshot = await getDoc(visitorCountRef);
    return NextResponse.json(
      { total: snapshot.exists() ? readTotal(snapshot.data()) : 1 },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update visitor count.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
