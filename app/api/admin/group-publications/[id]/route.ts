import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebaseDb } from "@/lib/firebase/client";

const COLLECTION_NAME = "group_publications";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const ref = doc(firebaseDb, COLLECTION_NAME, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "Group publication not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { item: { id: snapshot.id, ...snapshot.data() } },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch group publication.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const payload = await request.json();
    const ref = doc(firebaseDb, COLLECTION_NAME, id);

    await updateDoc(ref, payload);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update group publication.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const ref = doc(firebaseDb, COLLECTION_NAME, id);
    await deleteDoc(ref);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete group publication.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
