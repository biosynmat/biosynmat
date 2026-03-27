import {
  collection,
  getDocs,
  orderBy,
  query,
  type QueryConstraint,
} from "firebase/firestore";
import type {
  GalleryRecord,
  NewsRecord,
  PublicationRecord,
  TeamMemberRecord,
} from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { sortByDisplayDateDesc } from "@/lib/utils";

function mapTeamMember(
  id: string,
  data: Record<string, unknown>,
): TeamMemberRecord {
  return {
    id,
    name: String(data.name ?? ""),
    role: String(data.role ?? ""),
    image: String(data.image ?? ""),
    linkedin: data.linkedin ? String(data.linkedin) : "",
    researchgate: data.researchgate ? String(data.researchgate) : "",
    orcid: data.orcid ? String(data.orcid) : "",
    webofscience: data.webofscience ? String(data.webofscience) : "",
    scopus: data.scopus ? String(data.scopus) : "",
  };
}

function mapPublication(
  id: string,
  data: Record<string, unknown>,
): PublicationRecord {
  return {
    id,
    title: String(data.title ?? ""),
    authors: String(data.authors ?? ""),
    venue: String(data.venue ?? ""),
    year: Number(data.year ?? 0),
    abstract: String(data.abstract ?? ""),
    url: String(data.url ?? ""),
    coverTone: String(data.coverTone ?? "from-slate-100 to-slate-50"),
    coverImage: data.coverImage ? String(data.coverImage) : "",
  };
}

function mapNews(id: string, data: Record<string, unknown>): NewsRecord {
  const images = Array.isArray(data.images)
    ? data.images.map((item) => String(item)).filter(Boolean)
    : [];
  const legacyImage = String(data.image ?? "");
  const normalizedImages =
    images.length > 0 ? images : legacyImage ? [legacyImage] : [];

  return {
    id,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    contentHtml: String(data.contentHtml ?? ""),
    images: normalizedImages,
    image: normalizedImages[0] ?? "",
  };
}

function mapGallery(id: string, data: Record<string, unknown>): GalleryRecord {
  const images = Array.isArray(data.images)
    ? data.images.map((item) => String(item)).filter(Boolean)
    : [];
  const legacyImage = String(data.image ?? "");
  const normalizedImages =
    images.length > 0 ? images : legacyImage ? [legacyImage] : [];

  return {
    id,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    images: normalizedImages,
    image: normalizedImages[0] ?? "",
  };
}

export async function readTeamMembers() {
  const q = query(
    collection(firebaseDb, "team_members"),
    orderBy("createdAt", "asc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => mapTeamMember(doc.id, doc.data()));
}

export async function readPublications() {
  const q = query(
    collection(firebaseDb, "publications"),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => mapPublication(doc.id, doc.data()));
}

export async function readGroupPublications() {
  const q = query(
    collection(firebaseDb, "group_publications"),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => mapPublication(doc.id, doc.data()));
}

export async function readNews(limitCount?: number) {
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
  const q = query(collection(firebaseDb, "news"), ...constraints);
  const snapshot = await getDocs(q);
  const records = snapshot.docs.map((doc) => mapNews(doc.id, doc.data()));
  const sorted = sortByDisplayDateDesc(records);
  if (limitCount && limitCount > 0) {
    return sorted.slice(0, limitCount);
  }
  return sorted;
}

export async function readGallery() {
  const q = query(
    collection(firebaseDb, "gallery_images"),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  const records = snapshot.docs.map((doc) => mapGallery(doc.id, doc.data()));
  return sortByDisplayDateDesc(records);
}
