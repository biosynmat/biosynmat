"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import type { PublicationRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { UploadThingButton, extractUploadUrl } from "@/utils/uploadthing";

const coverToneOptions = [
  "from-cyan-100 to-cyan-50",
  "from-sky-100 to-sky-50",
  "from-emerald-100 to-emerald-50",
  "from-teal-100 to-teal-50",
  "from-amber-100 to-amber-50",
  "from-indigo-100 to-indigo-50",
];

const initialForm = {
  title: "",
  authors: "",
  year: new Date().getFullYear(),
  abstract: "",
  url: "",
};

function getRandomCoverTone() {
  const idx = Math.floor(Math.random() * coverToneOptions.length);
  return coverToneOptions[idx] ?? "from-slate-100 to-slate-50";
}

export default function AdminPublicationsPage() {
  const [items, setItems] = useState<PublicationRecord[]>([]);
  const [form, setForm] = useState(initialForm);
  const [uploadedCoverImageUrl, setUploadedCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadItems = async () => {
    setIsLoading(true);
    setError("");
    try {
      const q = query(collection(firebaseDb, "publications"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const records = snapshot.docs.map((record) => {
        const data = record.data();
        return {
          id: record.id,
          title: String(data.title ?? ""),
          authors: String(data.authors ?? ""),
          venue: String(data.venue ?? ""),
          year: Number(data.year ?? 0),
          abstract: String(data.abstract ?? ""),
          url: String(data.url ?? ""),
          coverTone: String(data.coverTone ?? "from-slate-100 to-slate-50"),
          coverImage: data.coverImage ? String(data.coverImage) : "",
        } satisfies PublicationRecord;
      });
      setItems(records);
    } catch (loadError) {
      setError((loadError as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      await addDoc(collection(firebaseDb, "publications"), {
        title: form.title.trim(),
        authors: form.authors.trim(),
        venue: "",
        year: Number(form.year),
        abstract: form.abstract.trim(),
        url: form.url.trim(),
        coverTone: getRandomCoverTone(),
        coverImage: uploadedCoverImageUrl,
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setUploadedCoverImageUrl("");
      await loadItems();
    } catch (createError) {
      setError((createError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "publications", id));
      await loadItems();
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <h2 className="text-xl font-semibold text-slate-900 sm:col-span-2">Add Publication</h2>

        <input required placeholder="Title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2" />
        <input required placeholder="Authors" value={form.authors} onChange={(event) => setForm((prev) => ({ ...prev, authors: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" />
        <input required type="number" placeholder="Year" value={form.year} onChange={(event) => setForm((prev) => ({ ...prev, year: Number(event.target.value) }))} className="rounded-lg border border-slate-300 px-3 py-2" />
        <input required placeholder="Publication URL" value={form.url} onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" />

        <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">Cover image upload (optional)</p>
          <UploadThingButton
            endpoint="publicationImage"
            onClientUploadComplete={(results) => {
              const url = extractUploadUrl(results);
              if (url) setUploadedCoverImageUrl(url);
            }}
            onUploadError={(uploadError) => setError(uploadError.message)}
          />
          {uploadedCoverImageUrl ? (
            <Image
              src={uploadedCoverImageUrl}
              alt="Uploaded publication cover preview"
              width={640}
              height={320}
              className="mt-3 h-32 w-full rounded-lg border border-slate-200 object-cover sm:w-80"
            />
          ) : null}
        </div>

        <textarea required placeholder="Abstract" value={form.abstract} onChange={(event) => setForm((prev) => ({ ...prev, abstract: event.target.value }))} rows={4} className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2" />

        <button type="submit" disabled={isSaving} className="teal-link sm:col-span-2 inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60">
          {isSaving ? "Saving..." : "Add Publication"}
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">Existing Publications</h2>
        {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading...</p> : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {item.coverImage ? (
                <Image src={item.coverImage} alt={item.title} width={640} height={320} className="mb-3 h-32 w-full rounded-lg border border-slate-200 object-cover" />
              ) : null}
              <p className="text-base font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-700">{item.authors}</p>
              <p className="text-sm text-slate-600">{item.venue ? `${item.venue} • ${item.year}` : String(item.year)}</p>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="mt-3 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
