import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { firebaseDb } from "@/lib/firebase/client";

const COLLECTION_NAME = "group_publications";

export async function GET() {
  try {
    const q = query(
      collection(firebaseDb, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
    }));
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch group publications.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const title = String(payload?.title ?? "").trim();
    const authors = String(payload?.authors ?? "").trim();
    const venue = String(payload?.venue ?? "").trim();
    const year = Number(payload?.year ?? 0);
    const abstract = String(payload?.abstract ?? "").trim();
    const url = String(payload?.url ?? "").trim();
    const coverTone = String(
      payload?.coverTone ?? "from-slate-100 to-slate-50",
    ).trim();
    const coverImage = payload?.coverImage
      ? String(payload.coverImage).trim()
      : "";

    if (!title || !authors || !year || !abstract || !url) {
      return NextResponse.json(
        { error: "title, authors, year, abstract, and url are required." },
        { status: 400 },
      );
    }

    const docRef = await addDoc(collection(firebaseDb, COLLECTION_NAME), {
      title,
      authors,
      venue,
      year,
      abstract,
      url,
      coverTone,
      coverImage,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create group publication.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
