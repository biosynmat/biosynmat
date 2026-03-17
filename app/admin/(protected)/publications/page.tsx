"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import type { PublicationRecord } from "@/lib/admin-types";
import { firebaseDb } from "@/lib/firebase/client";
import { readPublications } from "@/lib/firebase/public-read";
import { queryKeys } from "@/lib/query-keys";
import { UploadThingButton, extractUploadUrl } from "@/lib/uploadthing";

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
  const [form, setForm] = useState(initialForm);
  const [uploadedCoverImageUrl, setUploadedCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCoverTone, setEditingCoverTone] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: queryKeys.publications,
    queryFn: readPublications,
  });

  const resetForm = () => {
    setForm(initialForm);
    setUploadedCoverImageUrl("");
    setEditingId(null);
    setEditingCoverTone(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        authors: form.authors.trim(),
        venue: "",
        year: Number(form.year),
        abstract: form.abstract.trim(),
        url: form.url.trim(),
        coverTone: editingCoverTone ?? getRandomCoverTone(),
        coverImage: uploadedCoverImageUrl,
      };

      if (editingId) {
        await updateDoc(doc(firebaseDb, "publications", editingId), payload);
      } else {
        await addDoc(collection(firebaseDb, "publications"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      await queryClient.invalidateQueries({ queryKey: queryKeys.publications });
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: PublicationRecord) => {
    setError("");
    setEditingId(item.id);
    setForm({
      title: item.title,
      authors: item.authors,
      year: item.year,
      abstract: item.abstract,
      url: item.url,
    });
    setEditingCoverTone(item.coverTone);
    setUploadedCoverImageUrl(item.coverImage ?? "");
  };

  const handleDelete = async (id: string) => {
    setError("");
    try {
      await deleteDoc(doc(firebaseDb, "publications", id));
      await queryClient.invalidateQueries({ queryKey: queryKeys.publications });
    } catch (deleteError) {
      setError((deleteError as Error).message);
    }
  };

  const errorMessage = error || (queryError instanceof Error ? queryError.message : "");

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <h2 className="text-xl font-semibold text-slate-900 sm:col-span-2">
          {editingId ? "Edit Publication" : "Add Publication"}
        </h2>

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
          {editingId && uploadedCoverImageUrl ? (
            <button
              type="button"
              onClick={() => setUploadedCoverImageUrl("")}
              className="mt-2 inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Remove photo
            </button>
          ) : null}
          {uploadedCoverImageUrl ? (
            <Image
              src={uploadedCoverImageUrl}
              alt="Uploaded publication cover preview"
              width={640}
              height={320}
              className="mt-3 h-32 w-full rounded-lg border border-slate-200 bg-white object-contain sm:w-80"
            />
          ) : null}
        </div>

        <textarea required placeholder="Abstract" value={form.abstract} onChange={(event) => setForm((prev) => ({ ...prev, abstract: event.target.value }))} rows={4} className="rounded-lg border border-slate-300 px-3 py-2 sm:col-span-2" />

        <button type="submit" disabled={isSaving} className="teal-link sm:col-span-2 inline-flex w-fit rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold hover:bg-teal-800 disabled:opacity-60">
          {isSaving ? "Saving..." : editingId ? "Update Publication" : "Add Publication"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={resetForm}
            className="sm:col-span-2 inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        ) : null}
      </form>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-xl font-semibold text-slate-900">Existing Publications</h2>
        {isLoading ? <LoadingIndicator label="Loading publications..." className="mt-2 py-4" /> : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              {item.coverImage ? (
                <Image src={item.coverImage} alt={item.title} width={640} height={320} className="mb-3 h-32 w-full rounded-lg border border-slate-200 bg-white object-contain" />
              ) : null}
              <p className="text-base font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-700">{item.authors}</p>
              <p className="text-sm text-slate-600">{item.venue ? `${item.venue} • ${item.year}` : String(item.year)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
